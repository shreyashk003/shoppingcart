import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


function Login({ setloginstatus, setcustomer, customer, setusertype }) {
  const username = useRef("");
  const password = useRef("");

  const authenticate = async () => {
    const username1 = username.current.value;
    const password1 = password.current.value;

    if (!username1 || !password1) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const payload = { username: username1 };

      // Fetch the user data based on username
      const response = await axios.post("http://localhost:9000/api/getusername", payload)
      .then(response=>{

      
      // Check if the user data exists in response
      if (response.data && response.data.length > 0) {
        setcustomer(response.data[0]);
        const user = response.data[0];
        // Validate username and password against the fetched data
        if (username1 === user.username && password1 === user.password && user.usertype=="customer") {
          setloginstatus(true);
          setusertype("customer")
          alert("Welcome user!!!");
        }
         else if (username1 === "admin" && password1 === user.password) {
          setloginstatus(true);
          setusertype("admin");
        } 
        else 
          alert("Invalid username or password.");
        
      } 
      else 
        alert("User not found.");
      
    })
    .catch (error=> {
      console.error("Error fetching user data: ", error);
      alert("An error occurred during login. Please try again.");
    })
    }
    catch(error){
      console.log(error)
    }

    
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">SHOPPINGKART Login</h2>
        <input ref={username} type="text" placeholder="Enter username" className="form-control mb-3 login-input" />
        <input ref={password} type="password" placeholder="Enter password" className="form-control mb-3 login-input" />
        <button onClick={authenticate} className="btn btn-primary login-button">Login</button>
      </div>
    </div>
  );
}

export default Login;
