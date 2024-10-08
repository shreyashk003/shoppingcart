import './App.css';
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
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [cartitems, setcartitems] = useState([]);
  const [grandtotal,setGrandtotal]=useState(0)
  const [counter,setcounter]=useState(0)

  return (
    <div className="App">
      {!isLoggedIn ? 
        <Login setloginstatus={setLoggedIn} />
       : 
       <div style={{display:'flex','flexDirection':'row'}}>
      <Products cart={cartitems} setcart={setcartitems} grandtotal={grandtotal} setGrandtotal={setGrandtotal} counter={counter} setcounter={setcounter} />
      <Cart cartitems={cartitems} setcartitems={setcartitems} grandtotal={grandtotal} setgrandtotal={setGrandtotal} counter={counter} setcounter={setcounter} />
      <Counter counter={counter} setcounter={setcounter} /></div>
      
  }</div>
      
    
  );
}

export default App;
