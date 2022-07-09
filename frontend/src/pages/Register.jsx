import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import FormSubmitButton from '../components/FormSubmitButton'
import TextFormInput from '../components/TextFormInput'

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  })  

  const { firstName, lastName, email, password, password2 } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
  }

  return (
    <>
        <section className='heading'>
            <h1>
                <FaUser/> Register
            </h1>
            <p>Please create an account</p>
            </section>

            <section className="form">
                <TextFormInput type='text' inputName='firstName' value={firstName} onChange={onChange}/>
                <TextFormInput type='text' inputName='lastName' value={lastName} onChange={onChange}/>
                <TextFormInput type='email' inputName='email' value={email} onChange={onChange}/>
                <TextFormInput type='password' inputName='password' value={password} onChange={onChange}/>
                <TextFormInput type='password' inputName='password2' value={password2} placeholder='Confirm password' onChange={onChange}/>
                <FormSubmitButton />
            </section>
    </>
  )
}

export default Register