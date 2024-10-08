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
    <div>
      <h2 style={{ textAlign: 'center' }}><b>Products</b></h2>
      <ul style={{ listStyle: 'none' }}>
        {allProducts.map(product => (
          <li key={product.pid} className='list-group-item'>
            
            <span style={{ display: 'inline-block', width: '110px' }}>{product.pid}</span>
            <span style={{ display: 'inline-block', width: '110px' }}>{product.pname}</span>
            <span style={{ display: 'inline-block', width: '110px' }}>{product.price}</span>
            <span style={{ display: 'inline-block', width: '110px' }}>{product.qtty}</span>
            
            <span style={{display:'inline-block', width:'140px'}}>
  <img src={ product.imageUrl} width='115px' height='100px' alt='product' />
</span>


            <button className='btn btn-warning m-2' onClick={() => addToCart(product)}>Add To Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
