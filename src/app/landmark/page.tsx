import React from 'react'
import LandmarkList from '@/components/Home/LandmarkList'
import { LandmarkCardProps } from '@/utils/types'
import { fetchLandmarks } from '@/actions/actions'

const LandmarkDetail = async () => {
  const landmarks: LandmarkCardProps[] = await fetchLandmarks({})

  return (
    <LandmarkList Landmarks={landmarks} />
  )
}

export default LandmarkDetail