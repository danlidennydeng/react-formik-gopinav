import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  name: '',
  email: '',
  channel: ''
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

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
    // validate    
  })

  console.log('Visited Field', formik.touched)

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>

        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            {...formik.getFieldProps('name')}
          />

          {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
        </div>  

        <div className="form-control">
          <label htmlFor='email'>E-mail</label>
          <input type='email' id='email' name='email' {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
        </div>

        <div className="form-control">  
          <label htmlFor='channel'>channel</label>
          <input type='text' id='channel' name='channel' {...formik.getFieldProps('channel')} />
          {formik.touched.channel && formik.errors.channel ? <div className="error">{formik.errors.channel}</div> : null}
        </div>
        
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default YoutubeForm