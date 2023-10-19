'use client'

import { auth } from '../firebase';
import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import Loading from '../components/Loading';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
import { AiFillFacebook, AiFillApple, AiOutlineGoogle } from "react-icons/ai";

function LoginPage() {

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

  useEffect(() => {
    const check: any = localStorage.getItem("accessToken");
    if (check) {
      navigate("/")
    } else {
      navigate("/login")
    }
  }, [])

  const handleLoginIn: MouseEventHandler = async (e) => {
    e.preventDefault();
    const inputedEmail = emailRef.current?.value || '';
    const inputedPassword = passwordRef.current?.value || '';

    try {
      if (!emailError && !passwordError) {
        setLoading(true);
        await signInWithEmailAndPassword(auth, inputedEmail, inputedPassword)
          .then((authUser) => {
            navigate("/");
            // console.log("authuser login", authUser);
            setLoading(false);
          })
          .catch((error) => {
            alert(error.message);
            setLoading(false);
          })
      }
    } catch (error) {
      console.log("error", error)
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
                <h4 className='font-bold px mt-5'>Login</h4>
              </div>
              <form method="#" action="#" className="space-y-3">
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
                  className="font-medium w-full rounded-lg bg-slate-900 py-1.5 px-4 text-white h-[38px] active:scale-[0.97] transition-all duration-150 uk-scrollspy-inview"
                  onClick={handleLoginIn}
                >
                  <span>Sign in</span>
                </button>
                <div className="flex gap-3 justify-center text-2xl py-5 text-slate-500 ">
                  <AiOutlineGoogle />
                  <AiFillFacebook />
                  <AiFillApple />
                </div>
                <div className="space-x-2 text-sm text-center text-slate-400 dark:text-white/70">
                  <span> No account? </span>
                  <span>—</span>
                  <Link to="/register" className="text-gray-600 hover:text-gray-500">Join now</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default LoginPage