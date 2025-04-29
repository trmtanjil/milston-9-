import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router'
import { auth } from '../infoo/firebase.init';

function Login() {
    const [errorm , setErrorm] =useState('')
    const [succese, setSuccese] = useState(false);
    const emailref=useRef()

    const handlesubmit=e=>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        

        setSuccese(false)
        setErrorm('')
        signInWithEmailAndPassword(auth,email,password)
        .then((result)=>{
            console.log(result)

            if(!result.user.emailVerified){
                alert('Please verify your email address')
            }
            else{
                setSuccese(true)

            }
        })
        .catch((error)=>{
            console.log(error)
            setErrorm(error.message)
        })
    }
    const handleforgetemail=()=>{
        const email = emailref.current.value;

        setErrorm('')

        //password reset eamil
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert(' a password reset email is sent check your email.')
        })
        .catch((error)=>{
            setErrorm(error.message)
        })
    }

  return (
     
     

      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
        <div className="card-body">
        <h1 className="text-5xl font-bold">Login now!</h1>
          <form onSubmit={handlesubmit} className="fieldset">
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" name='email' ref={emailref} />
            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" name='password'/>
            <div 
            onClick={handleforgetemail}
            ><a className="link link-hover">Forgot password?</a></div>
            <button className="btn btn-neutral mt-4">Login</button>
          </form>
        {
          errorm &&    <p className='text-red-500'>{errorm}</p>
        }
        {
            succese && <p className='text-blue-400'>login succese </p>
        }
          <p>Don't have an account? Click here. <Link to='/signup' className='text-blue-400 underline'>signup</Link></p>
        </div>
  </div>
  )
}

export default Login