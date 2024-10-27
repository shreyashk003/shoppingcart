import React from 'react'
import { Route, Routes , Link } from 'react-router-dom'
import Addcustomer from './Addcustomer'
import Addproducts from './Addproducts'
import Vieworder from './Vieworder'
import '../../src/Vieworder.css';

function Admin() {
  return (
    <div><h1 style={{
      fontFamily:'sans-serif',
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
      Admin
  </h1>
        <nav>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'row',gap:'20px'}}>
            <li><Link to="/addcustomer">Addcustomer</Link></li>
            <li><Link to="/addproducts">Addproducts</Link></li>
            <li><Link to="/vieworder">vieworder</Link></li>
            </ul>
        </nav>
<Routes>
    <Route path="/addcustomer" element={<Addcustomer/>}></Route>
    <Route path="/addproducts" element={<Addproducts/>}></Route>
    <Route path="/vieworder" element={<Vieworder/>}></Route>
</Routes>

    </div>
  )
}

export default Admin