import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Counter from './Counter';

function Header({cartitems,customer }) {
    const totalItemsInCart = cartitems.reduce((acc, item) => acc + item.qtty, 0);

  return (
    <header className="bg-primary text-white p-3 mb-4">
      <div className="container">
        <div style={{display:'flex',flexDirection:'row'}}>
          <div className='col-md-5' style={{display:'flex',flexDirection:'row'}} >
            <h1>KULKARNI'S SHOPPINGKART</h1>
          </div>
          <div className="col-md-7 text-end">
            <h5>Welcome, {customer.username}!</h5>
            <span className="badge bg-warning text-dark">Items in Cart: {Counter}</span>
          </div>
          <div style={{display:'flex', flexDirection:'column',marginLeft:'20px'}}>
        {totalItemsInCart}
        <i style={{fontSize:'30px'}} class="bi bi-cart-dash"></i> 
        </div>
        </div>
        
      </div>
    </header>
  );
}

export default Header;
