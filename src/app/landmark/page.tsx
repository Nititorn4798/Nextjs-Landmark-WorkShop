import React from "react";
import LandmarkList from "@/components/Home/LandmarkList";
import { LandmarkCardProps } from "@/utils/types";
import { fetchLandmarks, getAuthUser } from "@/actions/actions";

const LandmarkDetail = async () => {
  const user = await getAuthUser();
  const profileId = user.id;
  const landmarks: LandmarkCardProps[] = await fetchLandmarks({ profileId });

  return <LandmarkList Landmarks={landmarks} />;
};

export default LandmarkDetail;
