import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function Cart({cartitems,setcartitems,grandtotal,setgrandtotal,counter,setcounter}) {
  const [message,setMessage]=useState("")
  const increment=(item)=>{
      cartitems.map(it=>it.pid==item.pid?it.qtty++:"nothing")
      setcartitems([...cartitems])
      setgrandtotal(grandtotal+item.price)
    }
    const confirmorder=()=>{
      const to ='shreyashkulkarni03@gmail.com.com'
      const subject ='order confirmation'
      var message1="<table border='1' border-collapse='collapse'><thead><th>Item ID</th><th>Item Name</th><th>Item Price</th><th>Item Qtty</th>"+
      "<th>Amount</th></thead><tbody>"+
      cartitems.map(item=>"<tr><td>"+item.pid+"</td><td>"+item.pname+"</td><td>"+item.price+"</td><td>"+
        item.qtty+"</td><td>"+item.qtty*item.price+"</td></tr>")
      setMessage(message1)  
      var newmessage=message.replace(/,/g, '')  
      newmessage=newmessage+"</tbody></table> \n your order amount ="+grandtotal+""
      const payload={
        to:to,
        subject:subject,
        message:newmessage
      }
      axios.post("http://localhost:9015/api/sendemail",payload)
        .then(response=>{
            alert(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    const decrement=(item)=>{
      if(item.qtty>0){
      cartitems.map(it=>it.pid==item.pid?it.qtty--:"nothing")
      setcartitems([...cartitems])
      setgrandtotal(grandtotal-item.price)}
    }
    const deleteitem=(item)=>{
      const rempro=cartitems.filter(it=>it.pid!==item.pid)
      setcartitems([...rempro])
      setcounter(counter-1)
      if(item.qtty!==0)
        setgrandtotal(grandtotal-item.price)
    }
    useEffect(()=>{},[cartitems])
  return (
    <div>
        <h1 style={{fontFamily:'cursive', textAlign:'center'}}><b>Cart</b></h1><ul style={{listStyle:'none'}} className='list-group'>
        {cartitems.map(item=><li className='list-group-item m-1'>
          <span style={{display:'inline-block',width:'110px'}}>{item.pid}</span>
          <span style={{display:'inline-block',width:'110px'}}>{item.pname}</span>
          <span style={{display:'inline-block',width:'100px'}}>{item.price}*{item.qtty}={item.price*item.qtty}</span>
          <button className='btn btn-success m-1' onClick={()=>increment(item)}>+</button>
          <span style={{display:'inline-block',width:'100px'}}><button className='btn btn-warning m-1' onClick={()=>decrement(item)}>-</button></span>
          <button className='btn btn-danger m-1' onClick={()=>deleteitem(item)}>Delete</button>
          </li>)}
          </ul>
          <br></br>
          <h3 style={{textAlign:'center'}}>Grand total = {grandtotal}</h3>
          <button onClick={confirmorder} className='btn btn-primary '>Confirm order</button>
    </div>
  )
}

export default Cart
