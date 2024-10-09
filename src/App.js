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
import Header from './components/Header';

function App() {
  const [isLoggedIn, setLoginstatus] = useState(false); // Tracks login status
  const [cartitems, setcartitems] = useState([]); // Tracks items in the cart
  const [grandtotal, setgrandtotal] = useState(0); // Tracks the grand total of the cart
  const [counter, setcounter] = useState(0); // Tracks the item counter (quantity?)
  const [customer, setcustomer] = useState({}); // Holds customer details
  const [usertype, setusertype] = useState("customer"); // Tracks if the user is customer/admin

  return (
    <div className="App">
      {!isLoggedIn ? (
        // Show Login if user is not logged in
        <Login 
          setloginstatus={setLoginstatus} 
          setcustomer={setcustomer} 
          customer={customer}
          setusertype={setusertype} // Pass setusertype to allow setting user type on login
        />
      ) : (
        // Main app content after login
        <>
          {usertype === "customer" ? (
                          <div>
                          <Header customer={customer} cartitems={cartitems}></Header>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Products
                cart={cartitems}
                setcart={setcartitems}
                grandtotal={grandtotal}
                setgrandtotal={setgrandtotal}
                counter={counter}
                setcounter={setcounter}
              />
              <Cart
                cartitems={cartitems}
                setcartitems={setcartitems}
                grandtotal={grandtotal}
                setgrandtotal={setgrandtotal}
                counter={counter}
                setcounter={setcounter}
              />
              <Counter counter={counter} setcounter={setcounter} />
            </div></div>
          ) : (
            <div>
              <Addcustomer />
              <Addproducts />
              <Customer />
              <Sendmail />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
