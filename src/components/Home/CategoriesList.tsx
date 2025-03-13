import React from 'react'
import { categories } from '@/utils/categories'
import Link from 'next/link'
const CategoriesList = ({ search, category }: { search?: string, category?: string }) => {
  return (
    <div>
      <div className='flex justify-center my-4 font-bold'>
        {
          categories.map((item) => {
            const isActive = item.label === category
            const searchTerm = search ? `&search=${search}` : ''
            return (
              <Link
                href={`/?category=${item.label}${searchTerm}`}
                key={item.label}>
                <article className={`flex hover:text-primary hover:scale-110 duration-200 flex-col gap-x-4 p-3 justify-center items-center ${isActive ? ' text-violet-500 ' : ''} `}>
                  <item.icon />
                  <p>
                    {item.label}
                  </p>
                </article>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default CategoriesList