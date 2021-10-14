import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'

function FormikContainer() {

  const dropdownOptions = [
    { key: 'Select an option', value: '' },
    { key: 'Reading', value: 'option1' },
    { key: 'Walking', value: 'option2' },
    { key: 'running', value: 'option3' }
  ]

  const radioOptions = [
    
    { key: 'Tv', value: 'rOption1' },
    { key: 'Phone', value: 'roption2' },
    { key: 'tablet', value: 'roption3' }
  ]

  const checkboxOptions = [
    
    { key: 'Chinese', value: 'cOption1' },
    { key: 'Korean', value: 'coption2' },
    { key: 'Japanese', value: 'coption3' }
  ]

  const initialValues = {
    email: '',
    description: '',
    selectOption: '',
    radioOption: '',
    checkboxOption: [],
    birthDate: null
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Requird!'),
    description: Yup.string().required('Requird!'),
    selectOption: Yup.string().required('Requird!'),
    radioOption: Yup.string().required('Requird!'),
    checkboxOption: Yup.array().required('Requird!'),
    birthDate: Yup.date().required('Required...').nullable()
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

          <FormikControl control='checkbox' label='Checkbox Topic' name='checkboxOption' options={checkboxOptions} />

          <FormikControl control='date' label='Pick a date' name='birthDate' />

          <button type='submit'>Submit</button>
        </Form>
      )}

    </Formik>
  )
}

export default FormikContainer