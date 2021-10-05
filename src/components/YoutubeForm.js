import React from 'react'
import { useFormik } from 'formik'

const initialValues = {
  name: '',
  email: '',
  channel: ''
}

const onSubmit = values => {
  console.log('Form Data', values)
}

const validate = values => {
      
  let errors = {}

  if (!values.name) {
    errors.name = 'Required'
  } 
  
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email format'
  }    

  if (!values.channel) {
    errors.channel = 'Required'
  }  

  return errors
  
}

function YoutubeForm () {

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate    
  })

  console.log('Form Error', formik.errors)

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>

        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            onChange={formik.handleChange} 
            value={formik.values.name} 
          />

          {formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
        </div>  

        <div className="form-control">
          <label htmlFor='email'>E-mail</label>
          <input type='email' id='email' name='email' onChange={formik.handleChange} value={formik.values.email} />
          {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
        </div>

        <div className="form-control">  
          <label htmlFor='channel'>channel</label>
          <input type='text' id='channel' name='channel' onChange={formik.handleChange} value={formik.values.channel} />
          {formik.errors.channel ? <div className="error">{formik.errors.channel}</div> : null}
        </div>
        
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default YoutubeForm