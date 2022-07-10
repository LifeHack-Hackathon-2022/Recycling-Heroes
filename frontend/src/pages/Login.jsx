import {useState, useEffect} from 'react'
import {FaSignInAlt, FaRecycle} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import FormSubmitButton from '../components/FormSubmitButton'
import TextFormInput from '../components/TextFormInput'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })  

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/login')
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

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
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
                <FormSubmitButton onSubmit={onSubmit}/>
            </section>
    </>
  )
}

export default Login