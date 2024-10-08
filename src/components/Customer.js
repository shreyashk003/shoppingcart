import axios from 'axios'
import React, { useState } from 'react'

function Customer() {
  const [allcustomer,setAllCustomers]=useState([])

  axios.get("http://localhost:9000/api/getAllcustomer")
  .then(response=>{
    setAllCustomers(response.data)
  })
  .catch(err=>{
    console.log(err)
  })
  return (
    <div>Customer
      {allcustomer.map(customer=><li>
        <span style={{display:'inline-block',width:'110px'}}>{customer.cid}</span>
        <span style={{display:'inline-block',width:'110px'}}>{customer.cname}</span>
        <span style={{display:'inline-block',width:'110px'}}>{customer.cage}</span></li>)}

    </div>
  )
}

export default Customer