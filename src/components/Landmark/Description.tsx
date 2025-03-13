import React from 'react'

const Description = ({ description }: { description: string }) => {
  return (
    <article>
      <p className='text-muted-foreground font-light leading-loose'>
        {description}
      </p>
    </article>
  )
}

export default Description