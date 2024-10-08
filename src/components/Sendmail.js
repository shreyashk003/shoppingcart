import axios from 'axios'
import React, { useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


function Sendmail() {
const To=useRef("")
const Subject=useRef("")
const message=useRef("")

const Send=()=>{
   let To1=To.current.value;
   let Sub1=Subject.current.value;
   let mes1=message.current.value;
   alert(To1,Sub1,mes1)

   const payload={
    To:To1,
    Subject:Sub1,
    message:mes1
   }

   axios.post("http://localhost:9000/api/sendemail",payload)
    .then(response=>{
        alert("Messege sent")
    })
    .catch(err=>{
    console.log(err)}
)}

  return (
    <div>Sendmail
        <input ref={To} type='text' placeholder='To'></input>
        <input ref={Subject} type='text' placeholder='Enter Subject'></input>
        <input ref={message} type='Text' placeholder='Enter your messege'></input>
        <button onClick={Send}>Send</button>
    </div>
  )
}

export default Sendmail