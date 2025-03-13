import { Heart } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { auth } from '@clerk/nextjs/server'
import { SignInCardButton } from '../Form/Buttons'
import { fetchFavoriteId } from '@/actions/actions'
import FavoriteToggleForm from './FavoriteToggleForm'


const FavoriteToggleButton = async ({ LandmarkId }: { LandmarkId: string }) => {
  const { userId } = await auth()

  if (!userId) return <SignInCardButton />
  const favoriteId = await fetchFavoriteId({ LandmarkId })
  // console.log(favoriteId)
  return (
    <FavoriteToggleForm favoriteId={favoriteId} landmarkId={LandmarkId} />
  )
}

export default FavoriteToggleButton