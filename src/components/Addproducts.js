import React, { useRef } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';


function Addproducts() {
    const pid=useRef("")
    const pname=useRef("")
    const price=useRef("")

const Add=()=>{
    
    let pid1=pid.current.value 
    let pname1=pname.current.value
    let price1=price.current.value
    
    const payload ={
        pid:pid1,
        pname:pname1,
        price:price1,
        
    }
    
    axios.post("http://localhost:9000/api/insertproducts",payload)
        .then(response=>{
            alert(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
}


  return (
    <div>
        <h1 style={{color:"red"}}>Add Products</h1>
        <input type='text' ref={pid} placeholder='Enter pid'></input>
        <input type='text' ref={pname} placeholder='Enter pname'></input>
        <input type='text' ref={price} placeholder='Enter price'></input>
        <button onClick={Add}>Insert product</button>
    </div>
  )
}

export default Addproducts