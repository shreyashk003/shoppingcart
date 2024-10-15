import React from 'react'
import { Route, Routes , Link } from 'react-router-dom'
import Addcustomer from './Addcustomer'
import Addproducts from './Addproducts'
import Vieworder from './Vieworder'


function Admin() {
  return (
    <div>Admin
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