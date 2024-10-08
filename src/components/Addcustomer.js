import axios from 'axios';
import React, { useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


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
    <div>Addcustomer
        <input ref={id} type="text" placeholder='Enter customerID'></input>
        <input ref={name} type='text' placeholder='Enter name'></input>
        <input ref={age} type='text' placeholder='Enter age'></input>
        <button onClick={Add}>Addcustomer</button>
    </div>
  )
}

export default Addcustomer