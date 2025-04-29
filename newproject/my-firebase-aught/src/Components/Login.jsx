import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/Firebase.init";

function Login() {
  const [user, setUser] = useState(null);

  const Provider = new GoogleAuthProvider();

  const githubProvider = new GithubAuthProvider();

  const handleLogin = () => {
    console.log(" login hear");

    signInWithPopup(auth, Provider)
      .then((result) => {
        console.log(result);
     
        setUser(result.user)
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const handleGithub=()=>{
    const augth = getAuth();

    signInWithPopup(augth,githubProvider)
    .then((result)=>{console.log(result)
      const logedinUser = result.user;

      if(!logedinUser.email && logedinUser?.providerData?.length){
        console.log('akhane email pawa jacchena ')
        if(logedinUser.providerData[0].email){
          logedinUser.email = logedinUser.providerData[0].email
           setUser(logedinUser)
        }
      }

        // setUser(result.user)
    })
    .catch((error)=>{console.log(error)})
  }

const signout=()=>{
    const augth = getAuth();
    signOut(augth).then((result=>{}))
    .catch((error)=>{})
    setUser(null)
}
  return (
    <div>
      <p>login</p>
      {/* <button onClick={handleLogin}> signup hear </button>
      <button onClick={signout}>signout hear</button> */}
        {
            user ?   <button onClick={signout}>sign out hear</button>:
           <>
            <button onClick={handleLogin}> signup hear </button>
            <button onClick={handleGithub}>sugn up github</button>
           </>
        }
      
      {user && (
        <div>
          <h2>{user.displayName}</h2>
          <h3>{user.email}</h3>
          <img src={user.photoURL} alt="img" />
        </div>
      )}
    </div>
  );
}

export default Login;
