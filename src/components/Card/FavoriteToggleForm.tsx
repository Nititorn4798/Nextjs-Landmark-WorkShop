"use client"
import React from 'react'
import { toggleFavoriteAction } from '@/actions/actions'
import FormContainer from '../Form/FormContainer'
import { usePathname } from 'next/navigation';
import { CardSubmitButton } from '../Form/Buttons';

const FavoriteToggleForm = ({ favoriteId, landmarkId }: { favoriteId: string | null; landmarkId: string; }) => {
  const pathname = usePathname()
  // console.log('f id', favoriteId, landmarkId)
  const toggleAction = toggleFavoriteAction.bind(null, { favoriteId, landmarkId, pathname })
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  )
}

export default FavoriteToggleForm