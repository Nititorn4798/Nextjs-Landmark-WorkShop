import { editLandmarkAction, fetchLandmarkDetail } from "@/actions/actions";
import { SubmitButton } from "@/components/Form/Buttons";
import CategoryInput from "@/components/Form/CategoryInput";
import FormContainer from "@/components/Form/FormContainer";
import FormInput from "@/components/Form/FormInput";
import ImageInput from "@/components/Form/ImageInput";
import ProvinceInput from "@/components/Form/ProvinceInput";
import TextAreaInput from "@/components/Form/TextAreaInput";
import ImageContainer from "@/components/Landmark/ImageContainer";
import MapLandmark from "@/components/Map/MapLandmark";
import { redirect } from "next/navigation";
import React from "react";

const editLandmark = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const landmark = await fetchLandmarkDetail({ id });
  if (!landmark) redirect("/");
  // const user = await getAuthUser();

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Edit Landmark</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={editLandmarkAction}>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="name"
              label="Landmark Name"
              type="text"
              placeholder="Landmark Name"
              defaultValue={landmark.name}
            />

            {/* Category */}
            <CategoryInput defaultValue={landmark.category} />
          </div>
          <TextAreaInput
            name="description"
            defaultValue={landmark.description}
          />
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="price"
              label="Price"
              type="number"
              placeholder="Price"
              defaultValue={landmark.price.toPrecision()}
            />
            <ProvinceInput defaultValue={landmark.provinces} />
          </div>

          <ImageContainer
            mainImage={landmark.image}
            name={landmark.name}
            sizes="50vw"
          />

          <div className="mt-4">
            <ImageInput
              label="Upload new image / Use current image"
              isRequired={false}
            />
          </div>

          <MapLandmark location={{ lat: landmark.lat, lng: landmark.lng }} />

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <SubmitButton text="Edit Landmark" size="sm" />
          </div>
          <input type="hidden" name="landmarkId" value={landmark.id} readOnly />
          <input
            type="hidden"
            name="imageOld"
            value={landmark.image}
            readOnly
          />
        </FormContainer>
      </div>
    </section>
  );
};

export default editLandmark;
