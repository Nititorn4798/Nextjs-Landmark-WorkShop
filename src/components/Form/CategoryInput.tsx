import React from 'react'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories } from '@/utils/categories'

const CategoryInput = ({ defaultValue }: { defaultValue?: string }) => {
  const name = 'category'
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        {name}
      </Label>
      <Select name={name} required defaultValue={defaultValue || categories[0].label}>
        <SelectTrigger className="">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {
            categories.map((item, index) => {
              return (
                <SelectItem key={index} value={item.label}>
                  <span className='capitalize flex items-center gap-1'>
                    <item.icon />
                    {item.label}
                  </span>
                </SelectItem>
              )
            })
          }
        </SelectContent>
      </Select>

    </div>
  )
}

export default CategoryInput