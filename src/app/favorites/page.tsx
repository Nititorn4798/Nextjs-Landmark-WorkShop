import { fetchFavorites } from '@/actions/actions'
import EmptyList from '@/components/Home/EmptyList'
import LandmarkList from '@/components/Home/LandmarkList'
import React from 'react'

const Favorites = async () => {
  const favorites = await fetchFavorites()
  if (favorites.length === 0) {
    return <EmptyList heading='No Favorites Places' message='Try to add some places' />
  }
  return <LandmarkList Landmarks={favorites} />
}

export default Favorites