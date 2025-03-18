import { fetchLandmarkDetail } from "@/actions/actions";
import FavoriteToggleButton from "@/components/Card/FavoriteToggleButton";
import Breadcrumbs from "@/components/Landmark/Breadcrumbs";
import { redirect } from "next/navigation";
import React from "react";
import ImageContainer from "@/components/Landmark/ImageContainer";
import Description from "@/components/Landmark/Description";
import MapLandmark from "@/components/Map/MapLandmark";
import ShareButton from "@/components/Landmark/ShareButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAuthUser } from "@/actions/actions";

const LandmarkDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const landmark = await fetchLandmarkDetail({ id });
  if (!landmark) redirect("/");
  const user = await getAuthUser();

  return (
    <section>
      <div className="flex justify-between">
        <Breadcrumbs name={landmark.name} />
        {landmark.profileId == user.id ? (
          <Link href={`/landmark/${id}/edit`}>
            <Button variant="outline">Edit Landmark</Button>
          </Link>
        ) : (
          <Button variant="ghost">View Landmark</Button>
        )}
      </div>

      <header>
        <header className="flex justify-between mt-4 items-center">
          <h1 className="text-4xl font-bold">{landmark.name}</h1>
          <div className="flex items-center gap-x-4">
            <ShareButton landmarkId={landmark.id} name={landmark.name} />
            <FavoriteToggleButton LandmarkId={landmark.id} />
          </div>
        </header>
      </header>
      <ImageContainer mainImage={landmark.image} name={landmark.name} />
      <section>
        <div>
          <Description description={landmark.description} />
          <MapLandmark location={{ lat: landmark.lat, lng: landmark.lng }} />
        </div>
      </section>
    </section>
  );
};

export default LandmarkDetail;
