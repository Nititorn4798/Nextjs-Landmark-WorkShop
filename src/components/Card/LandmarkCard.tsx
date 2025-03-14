import React from 'react'
import Image from 'next/image';
import { LandmarkCardProps } from '@/utils/types';
import LandmarkRating from './LandmarkRating';
import FavoriteToggleButton from './FavoriteToggleButton';
import Link from 'next/link';

const LandmarkCard = ({ Landmark }: { Landmark: LandmarkCardProps }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, image, id, price, description, provinces, lat, lng, category } = Landmark
  return (
    <article className='group relative flex flex-col'>
      <Link href={`/landmark/${id}`} >
        <div className='relative h-[300px] rounded-md mb-2'>
          <Image
            src={image}
            sizes="(max-width:768px) 100vw, 50vwq"
            alt={name}
            fill
            className='object-cover rounded-md group-hover:scale-105 transition-transform duration-300'
          />
        </div>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-semibold capitalize mt-1'>{name.substring(0, 30)}</h3>
          <LandmarkRating />
        </div>
        <div className='text-sm mt-1 text-muted-foreground flex-grow overflow-y-auto h-[100px] max-h-[100px]'>
          {description.substring(0, 500)}
        </div>
        <div className='mt-1 text-sm flex items-center justify-between font-semibold'>
          <span>{price} THB</span>
          <p>{provinces}</p>
        </div>
      </Link>
      <div className='absolute top-5 right-5'>
        <FavoriteToggleButton LandmarkId={id} />
      </div>
    </article>
  )
}

export default LandmarkCard