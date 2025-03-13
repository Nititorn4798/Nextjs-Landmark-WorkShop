"use client"
import React from 'react'
import { LandmarkCardProps } from '@/utils/types'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import OtherInfo from './OtherInfo';

const Hero = ({ Landmarks }: { Landmarks: LandmarkCardProps[] }) => {
  return (
    <div>
      <Swiper
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
      >
        {
          Landmarks.map((Landmark) => {
            return (
              <SwiperSlide key={Landmark.image} className='group'>
                <div className='relative rounded-md overflow-hidden'>
                  <img className="w-full h-[600] object-cover brightness-75 group-hover:brightness-50 transform-all duration-300" src={Landmark.image} alt={Landmark.name} />
                  <div className='absolute bottom-0 left-0 z-50'>
                    <div className='col-span-4 mb-4 flex h-full flex-1 justify-end px-5 md:mb-4 md:justify-end md:px-10'>
                      <OtherInfo Landmark={Landmark} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div >
  )
}

export default Hero