'use client'

import { MouseEventHandler, useRef, useState } from 'react'
import Loading from '../components/Loading';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { registerUser } from '../redux/auth/authAction';
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleNameChange = () => {
        const nameValue = nameRef.current?.value || '';
        if (nameValue.trim() === '') {
            setNameError('Name is required');
        } else {
            setNameError('');
        }
    };

    const handleEmailChange = () => {
        const emailValue = emailRef.current?.value || '';
        if (emailValue.trim() === '') {
            setEmailError('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
            setEmailError('Email is not valid');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = () => {
        const passwordValue = passwordRef.current?.value || '';;
        if (passwordValue.trim() === '') {
            setPasswordError('Password is required');
        } else if (passwordValue.length < 6) {
            setPasswordError('Password must be at least 6 characters');
        } else {
            setPasswordError('');
        }
    };

    const handleRegister: MouseEventHandler = async (e) => {
        e.preventDefault();
        const inputedName = nameRef.current?.value || '';
        const inputedEmail = emailRef.current?.value || '';
        const inputedPassword = passwordRef.current?.value || '';

        try {
            if (!nameError && !emailError && !passwordError) {
                setLoading(true);
                await dispatch(registerUser({ inputedName, inputedEmail, inputedPassword }));
                navigate("/login");
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }

    }

    return (
        <div>
            {loading ?
                <Loading />
                :
                <div className="flex flex-col h-screen justify-center items-center">
                    <div className="max-w-sm mx-auto md:px-10 p-4 w-full">
                        <div>
                            <div className="flex justify-center mb-5 flex-col">
                                <h1 className="text-4xl m-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-purple-500">Friend Fusion</h1>
                                <h4 className="font-bold px mt-5 px">Register</h4>
                            </div>
                            <form method="#" action="#" className="space-y-3">
                                <input
                                    ref={nameRef}
                                    className="w-full mb-0 py-2 px-4 bg-slate-200 rounded-lg text-sm placeholder-slate-950"
                                    type="text"
                                    placeholder="Name"
                                    onInput={handleNameChange} />
                                {nameError && <div className="text-red-500 text-sm">{nameError}</div>}
                                <input
                                    ref={emailRef}
                                    className="w-full mb-0 py-2 px-4 bg-slate-200 rounded-lg text-sm placeholder-slate-950"
                                    type="email"
                                    placeholder="Email"
                                    onInput={handleEmailChange} />
                                {emailError && <div className="text-red-500 text-sm">{emailError}</div>}
                                <input
                                    ref={passwordRef}
                                    className="w-full mb-2 py-2 px-4 bg-slate-200 rounded-lg text-sm placeholder-slate-950"
                                    type="password"
                                    placeholder="Password"
                                    onInput={handlePasswordChange} />
                                {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
                                <a href="#" className="hidden">
                                    <div className="text-sm text-right text-gray-400 py-4"> Forget password </div>
                                </a>
                                <button
                                    type="submit"
                                    className="font-medium w-full rounded-lg bg-slate-900 py-1.5 px-4 text-white h-[38px] active:scale-[0.97] transition-all duration-150"
                                    onClick={handleRegister}
                                >
                                    <span>Register</span>
                                </button>
                                <div className="space-x-2 text-sm text-center text-slate-400 dark:text-white/70">
                                    <span> I have account? </span>
                                    <span>—</span>
                                    <Link to="/login" className="text-gray-600 hover:text-gray-500">Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RegisterPage