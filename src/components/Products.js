import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Products({ cart, setcart, setgrandtotal, grandtotal }) {
  const [allProducts, setAllProducts] = useState([]);

  const addToCart = (item) => {
    setcart([...cart, item]);
    setgrandtotal(grandtotal + item.price);
  };

  useEffect(() => {
    axios.get("http://localhost:9000/api/getAllProducts")
      .then(response => {
        setAllProducts(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [allProducts]);

  return (
    <div style={{ width: '30%', padding: '10px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '1.4rem', marginBottom: '20px' }}><b>Products</b></h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {allProducts.map(product => (
          <li key={product.pid} className='list-group-item' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderRadius: '8px', marginBottom: '10px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ flex: 1 }}>
              <p><strong>{product.pname}</strong></p>
              <p>₹{product.price}</p>
              <p>Qty: {product.qtty}</p>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <img src={product.imageUrl} alt="product" width='100px' height='100px' style={{ objectFit: 'cover', borderRadius: '8px' }} />
            </div>
            <button className='btn btn-warning' onClick={() => addToCart(product)} style={{ fontSize: '0.9rem', padding: '5px 10px' }}>Add To Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
