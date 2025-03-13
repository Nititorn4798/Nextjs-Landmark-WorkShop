"use client"
import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { TwitterShareButton, LineShareButton, FacebookShareButton, FacebookIcon, TwitterIcon, LineIcon } from 'react-share'

const ShareButton = ({ landmarkId, name }: { landmarkId: string, name: string }) => {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL
  const shareLink = `${url}/landmark/${landmarkId}`
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'}>
          <Share2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent side='top' align='end' className='flex w-full gap-x-2 items-center'>
        <FacebookShareButton url={shareLink} name={name}>
          <FacebookIcon className='rounded-md' size={'36px'} />
        </FacebookShareButton>
        <TwitterShareButton url={shareLink} name={name}>
          <TwitterIcon className='rounded-md' size={'36px'} />
        </TwitterShareButton>
        <LineShareButton url={shareLink} name={name}>
          <LineIcon className='rounded-md' size={'36px'} />
        </LineShareButton>
      </PopoverContent>
    </Popover>
  )
}

export default ShareButton