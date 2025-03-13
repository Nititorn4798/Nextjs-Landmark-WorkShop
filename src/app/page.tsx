import React from 'react'

import LandmarkContainer from '@/components/Home/LandmarkContainer'
import { Suspense } from 'react'
import LoadingCard from '@/components/Card/LoadingCard'

const HomePage = async ({ searchParams }: { searchParams: { search?: string, category?: string } }) => {
  const { search, category } = await searchParams;
  return (
    <section>
      <Suspense fallback={<LoadingCard />}>
        <LandmarkContainer search={search} category={category} />
      </Suspense>
    </section>

  )
}

export default HomePage