import React from 'react'
import FormInput from '@/components/Form/FormInput'
import { SubmitButton } from '@/components/Form/Buttons'
import FormContainer from '@/components/Form/FormContainer'
import { createLandmarkAction } from '@/actions/actions'

import CategoryInput from '@/components/Form/CategoryInput'
import TextAreaInput from '@/components/Form/TextAreaInput'
import ProvinceInput from '@/components/Form/ProvinceInput'

const CreateProfile = async () => {

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>Create Landmark</h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={createLandmarkAction}>
          <div className='grid md:grid-cols-2 gap-4 mt-4'>
            <FormInput name="name" label='Landmark Name' type="text" placeholder='Landmark Name' />

            {/* Category */}
            <CategoryInput />
          </div>
          <TextAreaInput name="description" />
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="price"
              label="Price"
              type="number"
              placeholder="Price"
            />
            <ProvinceInput />
          </div>
          <div className='grid md:grid-cols-2 gap-4 mt-4'>
            <SubmitButton text="Create Landmark" size="sm" />
          </div>
        </FormContainer>
      </div>
    </section>
  )
}

export default CreateProfile