import React from 'react'
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

const onSubmit = values => {
  console.log('Form Data', values)
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required!'),
  email: Yup.string().required('Required!').email('Invalid email format!'),
  channel: Yup.string().required('Required!')
})

function YoutubeForm () {

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={true}
      validateOnBlur={false}
      >
        
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
          <Field as='textarea' id='comment' name='comment' />
        </div>
        
        <div className="form-control">
          <label htmlFor='address'>Address</label>
          <FastField name='address'>
            {
              (props) => {

                console.log('Field Render')

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

                console.log('Form errors', form.errors)

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

          <button type='submit'>Submit</button>
        
      </Form>
    </Formik>
  )
}

export default YoutubeForm