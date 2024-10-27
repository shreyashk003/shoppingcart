import axios from 'axios';
import React, { useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/Vieworder.css';

function Addcustomer() {
  

  const id = useRef("");
  const name = useRef("");
  const age = useRef("");

  const Add = () => {
    const ID = id.current.value;
    const Name = name.current.value;
    const Age = age.current.value;
    
    const payload={
      cid:ID,
      cname:Name,
      cage:Age
    }

    axios.post("http://localhost:9000/api/insertcustomer",payload)
    .then(response=>{
      alert(response.data)
    })
    .catch(err=>{
      alert(err)
    })
  }

  return (
    <div>
              <h1 style={{
      textAlign:'center',
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#007bff',
      padding: '20px',
      border: '2px solid #007bff',
      borderRadius: '10px',
      backgroundColor: '#ffffff',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
  }}>
      Add Customer
  </h1>
        <input ref={id} type="text" placeholder='Enter customerID'></input>
        <input ref={name} type='text' placeholder='Enter name'></input>
        <input ref={age} type='text' placeholder='Enter age'></input>
        <button onClick={Add}>Addcustomer</button>
    </div>
  )
}

export default Addcustomer