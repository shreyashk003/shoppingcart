import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


function Vieworder() {
    const [orderx,setorders]=useState([])

    useEffect(()=>{
        axios.get("http://localhost:9000/api/getAllorders")
        .then(response=>{
            setorders(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])
    

  return (
    
    <div>Vieworder
        {orderx.map(ord=><li>{ord.oid}-{ord.odate}</li>)}
    </div>
  )
}

export default Vieworder