import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  name: '',
  email: '',
  channel: '',
  comment: '',
  address: ''
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
      >
        
      <Form>

        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field 
            type="text" 
            id="name" 
            name="name" 
        
          />

          <ErrorMessage name='name' />
        </div>  

        <div className="form-control">
          <label htmlFor='email'>E-mail</label>
          <Field type='email' id='email' name='email' />
          <ErrorMessage name='email' />
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
          <Field name='address'>
            {
              (props) => {
                const { field, form, meta} = props

                console.log('Render props', props)
                return (
                <div>
                  <input type='text' id='address' {...field} />
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
                )
              }
            }
          </Field>  

        </div>
          <button type='submit'>Submit</button>
        
      </Form>
    </Formik>
  )
}

export default YoutubeForm