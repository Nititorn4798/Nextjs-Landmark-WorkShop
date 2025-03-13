import React from 'react'

import { fetchLandmarks, fetchLandmarksHero } from '@/actions/actions'
import LandmarkList from './LandmarkList'
import { LandmarkCardProps } from '@/utils/types'
import Hero from '../Hero/Hero'
import CategoriesList from './CategoriesList'
import EmptyList from './EmptyList'

const LandmarkContainer = async ({ search, category }: { search?: string, category?: string }) => {
  const landmarks: LandmarkCardProps[] = await fetchLandmarks({ search, category })
  const landmarksHero: LandmarkCardProps[] = await fetchLandmarksHero()

  // console.log(landmarks)

  return (
    <div>
      <Hero Landmarks={landmarksHero} />
      <CategoriesList search={search} category={category} />
      {
        landmarks.length === 0 ? <EmptyList heading='No Results' btnText='Clear Filters' /> : <LandmarkList Landmarks={landmarks} />
      }

    </div>
  )
}

export default LandmarkContainer