/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from "react-redux"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../config/firebase"
import { login } from "../features/userSlice"

import '../Css/loginForm.css'
import { useState } from "react"


const LoginForm = ({setLoginForm}) => {


    const [error, setError] = useState(false)

    const dispatch = useDispatch()

    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required()
    })

    const { register, handleSubmit, formState:{errors} } = useForm({
      resolver: yupResolver(schema)
    })


    const loginToApp = (data) => {

        setError(false)
      
        signInWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            dispatch(login({
              email: userCredential.user.email,
              uid: userCredential.user.uid,
              displayName: userCredential.user.displayName,
              photoURL: userCredential.user.photoURL
            }));
          })
          .catch(() => {
            setError(true);
    
            setTimeout(() => {
              setError(false);
            }, 3000);
          });
      };


  return (
    <div className="form-class">
      <form onSubmit={handleSubmit(loginToApp)} >
                {
                    error ? <p className="login-error">Invalid email or password.</p> : ""
                }
              <input
                type="email"
                placeholder="Email"
                {...register('email')}
              />
              <span className='error'>{errors?.email?.message}</span>

              <input
                type="password"
                placeholder="Password"
                {...register('password')}
              />
              <span className='error'>{errors?.password?.message}</span>

              <button type="submit">Sign in</button>
            </form>

            <p className="login-para">Not a member? {" "}
            <span className='login__register' onClick={() => setLoginForm(false)}>Register Now</span>
            </p>
    </div>
  )
}

export default LoginForm
