import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link';

const EmptyList = ({ heading = 'No Items', message = "Please Try Again", btnText = 'Back' }: { heading?: string; message?: string, btnText?: string; }) => {
  return (
    <div>
      <h2 className='text-xl font-bold'>{heading}</h2>
      <p className='text-lg mb-4'>{message}</p>
      <Button className='capitalize' asChild>
        <Link href='/'>
          {btnText}
        </Link>
      </Button>
    </div>
  )
}

export default EmptyList