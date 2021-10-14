import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'

function FormikContainer() {

  const dropdownOptions = [
    { key: 'Select an option', value: '' },
    { key: 'option 1', value: 'option1' },
    { key: 'option 2', value: 'option2' },
    { key: 'option 3', value: 'option3' }
  ]

  const radioOptions = [
    
    { key: 'option 1', value: 'rOption1' },
    { key: 'option 2', value: 'roption2' },
    { key: 'option 3', value: 'roption3' }
  ]

  const initialValues = {
    email: '',
    description: '',
    selectOption: '',
    radioOption: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Requird!'),
    description: Yup.string().required('Requird!'),
    selectOption: Yup.string().required('Requird!'),
    radioOption: Yup.string().required('Requird!')
  })
  
  const onSubmit = values => console.log('Form Data', values)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      >
      {formik => (
        <Form>
          <FormikControl control='input' type='email' label='Email' name='email' />

          <FormikControl control='textarea' label='Description' name='description' />

          <FormikControl control='select' label='Select a topic' name='selectOption' options={dropdownOptions} />

          <FormikControl control='radio' label='Radio Topic' name='radioOption' options={radioOptions} />

          <button type='submit'>Submit</button>
        </Form>
      )}

    </Formik>
  )
}

export default FormikContainer