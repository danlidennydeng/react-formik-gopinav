import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues = {
  name: '',
  email: '',
  channel: '',
  comment: '',
  address: '',
  social: {
    facebook: '',
    twitter: ''
  },
  phoneNumbers: ['', ''],
  phNumbers: ['']
}

const savedValues = {
  name: 'Joe',
  email: 'whatever@yahoo.com',
  channel: 'youtube',
  comment: 'A quick fox has jumped over...',
  address: '11040 White Rock Rd',
  social: {
    facebook: '',
    twitter: ''
  },
  phoneNumbers: ['', ''],
  phNumbers: ['']
}

const onSubmit = (values, onSubmitProps) => {
  console.log('Form Data', values)
  console.log('submit props', onSubmitProps)
  onSubmitProps.setSubmitting(false) // set submmitting back to false if submitting persists
  onSubmitProps.resetForm() // reset the form after submitting
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required!'),
  email: Yup.string().required('Required!').email('Invalid email format!'),
  channel: Yup.string().required('Required!')
})

const validateComment = value => {
  let error
  if (!value) {
    error = 'Required.......'
  }
  return error
}

function YoutubeForm29 () {

  const [formValues, setFormValues] = useState(null)

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={true}
      validateOnBlur={true}
      //validateOnMount // diaable submit since beginning of page loading
      enableReinitialize
      >

      {formik => {

        console.log('Formik Props', formik)

        return (
          <Form>

        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field 
            type="text" 
            id="name" 
            name="name" 
        
          />

          <ErrorMessage name='name' component={TextError} />
        </div>  

        <div className="form-control">
          <label htmlFor='email'>E-mail</label>
          <Field type='email' id='email' name='email' />
          <ErrorMessage name='email'>
          {
            errorMsg => <div className='error'>{errorMsg}</div>
          }  
          </ErrorMessage>
        </div>

        <div className="form-control">  
          <label htmlFor='channel'>channel</label>
          <Field type='text' id='channel' name='channel' placeholder='Enter channel here' />
          <ErrorMessage name='channel' />
        </div>

        <div className="form-control">
          <label htmlFor='comment'>Comment</label>
          <Field as='textarea' id='comment' name='comment' validate={validateComment} />
          <ErrorMessage name='comment' component={TextError} />
        </div>
        
        <div className="form-control">
          <label htmlFor='address'>Address</label>
          <FastField name='address'>
            {
              (props) => {

                //console.log('Field Render')

                const { field, meta} = props

                // console.log('Render props', props)
                return (
                <div>
                  <input type='text' id='address' {...field} />
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
                )
              }
            }
          </FastField>  

        </div>

        <div className="form-control">
          <label htmlFor='facebook'>Facebook Profile</label>
          <Field type='text' id='facebook' name='social.facebook' />
        </div>

        <div className="form-control">
          <label htmlFor='twitter'>Twitter Profile</label>
          <Field type='text' id='twitter' name='social.twitter' />
        </div>

        <div className="form-control">
          <label htmlFor='primaryPh'>Primary Phone</label>
          <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
        </div>

        <div className="form-control">
          <label htmlFor='secondaryPh'>Secondary Phone</label>
          <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
        </div>

        <div className="form-control">
          <label htmlFor='secondaryPh'>List of Phone Numbers</label>
          <FieldArray name='phNumbers'>
            {
              (fieldArrayProps) => {
                // console.log('fieldArrayProps', fieldArrayProps)

                const {push, remove, form} = fieldArrayProps
                const {values} = form
                const {phNumbers} = values

               //console.log('Form errors', form.errors)

                return (
                  <div>
                    {phNumbers.map((phNumber, index) => (
                      <div key={index}>
                        <Field name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type='button' onClick={() => remove(index)}> - </button>
                          )}
                        
                        <button type='button' onClick={() => push('')}> + </button>
                      </div>
                    ))}    

                  </div>
                )
                  
              }
            }    
          </FieldArray>
        </div>

          <button type='reset'>重置</button>  
          <button type='button' onClick={() => setFormValues(savedValues)}>Load saved data</button>
          <button type='submit' disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
        
      </Form>  

        )
      }
      }  
      
    </Formik>
  )
}

export default YoutubeForm29