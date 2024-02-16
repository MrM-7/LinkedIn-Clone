/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import { login } from "../features/userSlice";
import { useState } from "react";



const RegisterForm = ({ setLoginForm }) => {
    const dispatch = useDispatch();

    const [error, setError] = useState(false)

    const schema = yup.object().shape({
        fullName: yup.string().trim().min(2).required(),
        profilePic: yup.string(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
        confirmPassword: yup.string().oneOf([yup.ref("password", undefined)], 'Passwords must match').required()
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const registerUser = async (data) => {

        setError(false)

        try {
            
            await schema.validate(data, { abortEarly: false });

            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(userCredential.user, {
                displayName: data.fullName,
                photoURL: data.profilePic
            });

            dispatch(login({
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                displayName: data.fullName,
                photoURL: data.profilePic
            }));
        } catch (error) {
            setError(true)
            setTimeout(() => setError(false), 3000)
        }
    };

    return (
        <div className="form-class">
            <form onSubmit={handleSubmit(registerUser)}>

                {
                    error ? <p className="login-error">Registration failed.</p> : ""
                }
                <input
                    type="text"
                    placeholder="Full name"
                    {...register('fullName')}
                />
                <span className='error'>{errors?.fullName?.message}</span>

                <input
                    type="text"
                    placeholder="Profile pic URL (optional)"
                    {...register('profilePic')}
                />
                <span className='error'>{errors?.profilePic?.message}</span>

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

                <input
                    type="password"
                    placeholder="Confirm password"
                    {...register('confirmPassword')}
                />
                <span className='error'>{errors?.confirmPassword?.message}</span>

                <button type="submit">Sign up</button>
            </form>

            <p className="login-para">Already a user? {" "}
                <span className='login__register' onClick={() => setLoginForm(true)}>Sign in Now</span></p>
        </div>
    );
}

export default RegisterForm;
