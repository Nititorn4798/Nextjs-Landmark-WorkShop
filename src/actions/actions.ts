"use server";

import { profileSchema, validateWithZod } from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { redirect } from "next/navigation";

// const getAuthUser = async () => {
//   const user = await currentUser();
//   if (!user) {
//     throw new Error("You must be logged in to access this page");
//   }

//   if (!user.privateMetadata.hasProfile) redirect("profile/create");
//   return user;
// };

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
    // const user = await getAuthUser();
    const user = await currentUser();
    if (!user) throw new Error("You must be logged in to access this page");

    const rawData = Object.fromEntries(formdata);
    const validateField = validateWithZod(profileSchema, rawData);
    console.log("Validated ", validateField);

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

    // const firstname = formdata.get("firstname") as string;
    // const validated = profileSchema.safeParse(firstname);

    // return { message: "Create Profile Success!!!" };
  } catch (error) {
    console.log(error);
    return renderError(error);
  }
  redirect("/");
};

export const createLandmarkAction = async (
  prevState: unknown,
  formdata: FormData
): Promise<{ message: string }> => {
  try {
    // const user = await getAuthUser();
    const user = await currentUser();
    if (!user) throw new Error("You must be logged in to access this page");

    const rawData = Object.fromEntries(formdata);
    // const validateField = validateWithZod(profileSchema, rawData);
    console.log("non Validated ", rawData);

    return { message: "Create Landmark Success!!!" };
  } catch (error) {
    console.log(error);
    return renderError(error);
  }
};
