import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Logo = () => {
  return (
    <Button size='sm' asChild><Link className='text-2xl' href={'/'}>My Landmark</Link></Button>
  )
}

export default Logo