import React from 'react'
import { LandmarkCardProps } from '@/utils/types'

const OtherInfo = ({ Landmark }: { Landmark: LandmarkCardProps }) => {
  return (
    <div className='text-white'>
      <p>{Landmark.provinces}</p>
      <p className='text-4xl font-semibold md:my-3 md:text-6xl md:leading-[80px]'>{Landmark.name}</p>
      <p className='text-lg'>{Landmark.description.substring(0, 300) + "..."}</p>
    </div>
  )
}

export default OtherInfo