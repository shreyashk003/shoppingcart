import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({setloginstatus,setusertype}) {
  const username=useRef("")
  const password=useRef("")

  const authenticate=()=>{
      let username1=username.current.value
      let password1=password.current.value

      if(username1==="abc" && password1==="abc"){
          setloginstatus(true)
          alert("Welcome user!!!")
      }
      else if(username1==="admin" && password1==="admin"){
          setloginstatus(true)
          setusertype("admin")
          }
      else
          alert("invalid user!!!")
  }

  return (
    <div>
      <h2>Login</h2>
      <input ref={username} type='text' placeholder='Enter username' />
      <input ref={password} type='password' placeholder='Enter password' />
      <button onClick={authenticate}>Login</button>
    </div>
  );
}

export default Login;
