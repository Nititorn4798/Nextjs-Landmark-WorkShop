import React from 'react'
import LandmarkCard from '../Card/LandmarkCard'
import { LandmarkCardProps } from '@/utils/types'
import LoadingCard from '../Card/LoadingCard'

const LandmarkList = ({ Landmarks }: { Landmarks: LandmarkCardProps[] }) => {
  return (
    <section className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4'>
      {
        Landmarks.map((Landmark) => {
          return <LandmarkCard key={Landmark.id} Landmark={Landmark} />
        })
      }
    </section>
  )
}

export default LandmarkList