import {useState, useEffect} from 'react'
import {FaSignInAlt, FaRecycle} from 'react-icons/fa'
import FormSubmitButton from '../components/FormSubmitButton'
import TextFormInput from '../components/TextFormInput'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })  

  const { email, password } = formData

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
                <FaSignInAlt/> Login
            </h1>
            <p>
                <FaRecycle /> Start recycling today! <FaRecycle /> 
            </p>
            </section>

            <section className="form">
                <TextFormInput type='email' inputName='email' value={email} onChange={onChange}/>
                <TextFormInput type='password' inputName='password' value={password} onChange={onChange}/>
                <FormSubmitButton />
            </section>
    </>
  )
}

export default Login