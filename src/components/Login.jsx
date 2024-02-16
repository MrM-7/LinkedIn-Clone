import { useState } from 'react'
import '../Css/login.css'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

import linkedinLogo from '../assets/linkedin-logo-png-2032.png';

const Login = () => {

    const [loginForm, setLoginForm] = useState(true)

  return (
    <div className='login'>
      <img src={linkedinLogo} alt="LinkedIn" />
      {
        loginForm ? (
          <LoginForm setLoginForm={setLoginForm} />
        ) : (
          <RegisterForm setLoginForm={setLoginForm} />
        )
      }
    </div>
  )
}

export default Login
