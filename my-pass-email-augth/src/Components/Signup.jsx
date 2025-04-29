import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../infoo/firebase.init';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router';

function Signup() {
    const [errorr, setError]= useState('')
    const [succese, setSuccese]= useState(false)
    const [showpass, setShowPass] = useState(false);

    const handleSignup =e=>{
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.eamil.value;
        const password = e.target.password.value;
        const turms = e.target.turms.checked;
        console.log(email, password,turms)


        setSuccese(false)
        setError('')

        if(!turms){
            setError('turmse fillup please')
            return;
        }

        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
        const hasDigit = /[0-9]/;
        const hasLowerCase = /[a-z]/;
        const hasUpperCase = /[A-Z]/;
        if(password.length <6){
            return setError('You must provide at least  6 cerecter')
        }
            else if(hasDigit.test(password)===false){
                return setError('You must provide at least one digit  ')
            }
            else if(hasLowerCase.test(password)===false){
                return setError('You must provide at least one lowercase letter')
            }
            else if (hasUpperCase.test(password)===false){
                return setError('You must provide at least one uppercase letter')
            }
        

        createUserWithEmailAndPassword(auth,email,password)
        .then((result)=>{
            console.log(result)

            
            //eamil verify
            sendEmailVerification(auth.currentUser)
            .then(()=>{
                
                setSuccese(true)
                alert('we sent you a verification email .please check your email')
            })
            //update user profjile
            const profile={
                displayName:name,
                photoURL:photo,
            }
            updateProfile(auth.currentUser, profile)
            .then(()=>{
                console.log('user profile updated')
            })
            .catch(errorr=>console.log(errorr))
          
        })
        .catch((error)=>{
            console.log(error)
            setError(error.message)
        })
    }

  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <h1 className="text-5xl font-bold text-center py-4">Signup now!</h1>
      <div className="card-body">
        <form onSubmit={handleSignup} >
          <label className="label">Name</label>
          <input type="text" className="input" placeholder="Name" name='name'/>
          <label className="label">Photo url</label>
          <input type="text" className="input" placeholder="phoro url" name='photo'/>

          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" name='eamil'/>
          <label className="label">Password</label>
         <div className='relative'>
         <input 
         type={showpass ? 'text': 'password'}
          className="input" placeholder="Password" name='password'/>
         <button className='btn absolute right-2 btn-xs top-2'
         onClick={()=>{setShowPass(!showpass)}}
         >{showpass ? <FaEye />: <FaEyeSlash />}</button>
         </div>
          <div><a className="link link-hover">Forgot password?</a></div>

          <label className="label">
            <input name='turms' type="checkbox"   className="checkbox" />
             fill turms
            </label>
            <br />

          <button className="btn btn-primary mt-4">signup</button>
         
         {
            succese ? <p className='text-blue-500'>Sign up successful</p>:' '
          }
         
        <p className='text-red-500'>{errorr}</p><br />
        <p>Already have an account <Link to='/login' className='text-blue-400 underline'>Login</Link></p>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}

export default Signup