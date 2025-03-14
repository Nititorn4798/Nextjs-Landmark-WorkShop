"use server";

import {
  imageSchema,
  imageSchemaV2,
  landmarkSchema,
  profileSchema,
  validateWithZod,
  validateWithZodV2,
} from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to access this page");
  }

  if (!user.privateMetadata.hasProfile) redirect("profile/create");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};

// const profileSchema = z
//   .string()
//   .min(2, { message: "อักขระต้องการมากกว่า 2 อักขระ" });

export const createProfileAction = async (
  prevState: unknown,
  formdata: FormData
) => {
  try {
    const user = await getAuthUser();

    const rawData = Object.fromEntries(formdata);
    const validateField = validateWithZod(profileSchema, rawData);
    // console.log("Validated ", validateField);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validateField,
      },
    });

    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  redirect("/");
};

export const createLandmarkAction = async (
  prevState: unknown,
  formdata: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    if (!user) throw new Error("You must be logged in to access this page");

    const rawData = Object.fromEntries(formdata);
    const file = formdata.get("image") as File;
    const validateField = validateWithZod(landmarkSchema, rawData);
    const validatedFile = validateWithZod(imageSchema, { image: file });

    const fullPath = await uploadFile(validatedFile.image);

    await db.landmark.create({
      data: {
        ...validateField,
        image: fullPath,
        profileId: user.id,
      },
    });

    // return { message: "Create Landmark Successful" };
  } catch (error) {
    return renderError(error);
  }
  redirect("/");
};

export const fetchLandmarks = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const landmarks = await db.landmark.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return landmarks;
};

export const fetchLandmarksHero = async () => {
  const landmarks = await db.landmark.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return landmarks;
};

export const fetchFavoriteId = async ({
  LandmarkId,
}: {
  LandmarkId: string;
}) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      landmarkId: LandmarkId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  favoriteId: string | null;
  landmarkId: string;
  pathname: string;
}) => {
  const { favoriteId, landmarkId, pathname } = prevState;
  const user = await getAuthUser();
  try {
    if (favoriteId) {
      // delete
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      // create
      await db.favorite.create({
        data: {
          landmarkId: landmarkId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favoriteId
        ? "Successfully Removed from favorites"
        : "Successfully Added favorites",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      landmark: {
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
          provinces: true,
          lat: true,
          lng: true,
          category: true,
        },
      },
    },
  });
  return favorites.map((favorites) => favorites.landmark);
};

export const fetchLandmarkDetail = async ({ id }: { id: string }) => {
  return db.landmark.findFirst({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
};

// Add Landmark edit action https://youtu.be/AgXuYmbL6mQ?t=2185
export const editLandmarkAction = async (
  id: string,
  formdataDialog: FormData
): Promise<{ message: string; error?: string }> => {
  try {
    const user = await getAuthUser();
    if (!user) {
      return {
        message: "You must be logged in to access this page",
        error: "Authentication failed",
      };
    }

    const landmark = await db.landmark.findFirst({
      where: {
        AND: [{ profileId: user.id }, { id: id }],
      },
      select: { id: true, image: true },
    });

    if (!landmark) {
      return {
        message: "Landmark not found or you don't have permission to edit it.",
        error: "Permission denied",
      };
    }

    const rawData = Object.fromEntries(formdataDialog);
    const file = formdataDialog.get("image") as File;

    const validateField = validateWithZodV2(landmarkSchema, rawData);
    if (!validateField.success) {
      return {
        message: "Validation error",
        error: validateField.error?.message || "Unknown validation error",
      };
    }

    let imagePath = landmark.image;

    if (file.size > 0) {
      const validatedFile = validateWithZodV2(imageSchemaV2, { image: file });
      if (!validatedFile.success) {
        return {
          message: "Invalid image file",
          error:
            validatedFile.error?.message || "Unknown image validation error",
        };
      }
      if (validatedFile.data) {
        const fullPath = await uploadFile(validatedFile.data.image);
        imagePath = fullPath;
      }
    }

    await db.landmark.update({
      where: { id: id },
      data: {
        ...validateField.data,
        image: imagePath,
      },
    });

    redirect("/");
  } catch (error) {
    return { message: "An error occurred", error: error.message };
  }
};
