import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './components/Products';
import Customer from './components/Customer';
import Addcustomer from './components/Addcustomer';
import Login from './components/Login';
import { useState } from 'react';
import Cart from './components/Cart';
import Addproducts from './components/Addproducts';
import Sendmail from './components/Sendmail';
import Counter from './components/Counter';
function App() {
  const [isLoggedIn, setLoginstatus] = useState(false);
  const [cartitems, setcartitems] = useState([]);
  const [grandtotal,setgrandtotal]=useState(0)
  const [counter,setcounter]=useState(0)
  const [usertype,setusertype]=useState("customer")


  return (
    <div className="App">
      {!isLoggedIn==(false) ? 
        <Login setloginstatus={setLoginstatus}setusertype={setusertype} />
       : 
       usertype=="customer"?
       <div style={{display:'flex','flexDirection':'row'}}>
      <Products cart={cartitems} setcart={setcartitems} grandtotal={grandtotal} setgrandtotal={setgrandtotal} counter={counter} setcounter={setcounter} />
      <Cart cartitems={cartitems} setcartitems={setcartitems} grandtotal={grandtotal} setgrandtotal={setgrandtotal} counter={counter} setcounter={setcounter} />
      <Counter counter={counter} setcounter={setcounter} /></div>
      :<div>
      <Addcustomer></Addcustomer>
      <Addproducts></Addproducts>
      <Customer></Customer>
      <Sendmail></Sendmail></div>
  }</div>
      
    
  );
}

export default App;
