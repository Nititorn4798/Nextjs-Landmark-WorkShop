import React from 'react'
import FormInput from '@/components/Form/FormInput'
import { SubmitButton } from '@/components/Form/Buttons'
import FormContainer from '@/components/Form/FormContainer'
import { createProfileAction } from '@/actions/actions'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const CreateProfile = async () => {
  const user = await currentUser();
  if (user?.privateMetadata.hasProfile) redirect('/')

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>new User</h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={createProfileAction}>
          <div className='grid md:grid-cols-2 gap-4 mt-4'>
            <FormInput name="firstname" label='First Name' type="text" placeholder='First Name' />
            <FormInput name="lastname" label='Last Name' type="text" placeholder='Last Name' />
            <FormInput name="username" label='Username' type="text" placeholder='User Name' />
          </div>
          <SubmitButton text="Create Profile" size="sm" />
        </FormContainer>
      </div>
    </section>
  )
}

export default CreateProfile