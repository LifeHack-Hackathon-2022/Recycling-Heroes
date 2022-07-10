import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import FormSubmitButton from '../components/FormSubmitButton'
import TextFormInput from '../components/TextFormInput'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  })  
  
  const { firstName, lastName, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        password
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
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
                <FormSubmitButton onSubmit={onSubmit} />
            </section>
    </>
  )
}

export default Register