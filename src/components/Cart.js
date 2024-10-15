import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Cart({ cartitems, setcartitems, grandtotal, setgrandtotal, counter, setcounter }) {
  const [message, setMessage] = useState("");

  // Increment item quantity
  const increment = (item) => {
    cartitems.map(it => it.pid === item.pid ? it.qtty++ : "nothing");
    setcartitems([...cartitems]);
    setgrandtotal(grandtotal + item.price);
    setcounter(counter + 1); // Increment cart counter
  };

  // Decrement item quantity
  const decrement = (item) => {
    if (item.qtty > 1) {
      cartitems.map(it => it.pid === item.pid ? it.qtty-- : "nothing");
      setcartitems([...cartitems]);
      setgrandtotal(grandtotal - item.price);
      setcounter(counter - 1); // Decrease cart counter
    }
  };

  // Delete item from cart
  const deleteitem = (item) => {
    const rempro = cartitems.filter(it => it.pid !== item.pid);
    setcartitems([...rempro]);
    setcounter(counter - item.qtty); // Decrease counter by item's quantity
    if (item.qtty !== 0)
      setgrandtotal(grandtotal - (item.price * item.qtty));
  };

  // Confirm order and send email
  const confirmorder = async () => {
    const to = 'shreyashkulkarni03@gmail.com';
    const subject = 'Order Confirmation';

    // Construct email body with HTML table of cart items
    let message1 = "<table border='1' style='border-collapse: collapse;'><thead><th>Item ID</th><th>Item Name</th><th>Item Price</th><th>Item Qtty</th><th>Amount</th></thead><tbody>";
    
    cartitems.map(item => {
      message1 += `<tr><td>${item.pid}</td><td>${item.pname}</td><td>${item.price}</td><td>${item.qtty}</td><td>${item.qtty * item.price}</td></tr>`;
    });

    message1 += `</tbody></table><br/>Your order amount: ${grandtotal}`;

    // Set the email message
    setMessage(message1);
    
    // Payload for sending the email
    const payload = {
      to: to,
      subject: subject,
      message: message1
    };

    // Send the email via the backend
    axios.post("http://localhost:9000/api/sendemail", payload)
      .then(response => {
        alert("Email sent"); // Alert the user with a success message
      })
      .catch(error => {
        console.log("Error while sending email: ", error);
        alert("Failed to send email. Please try again."); // Handle failure case
      });
  };

  // Calculate total items in the cart
  const totalItemsInCart = cartitems.reduce((acc, item) => acc + item.qtty, 0);

  useEffect(() => {}, [cartitems]);

  return (
    <div style={{ width: '30%', padding: '10px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '1.4rem', marginBottom: '20px' }}><b>Your Cart</b></h2>
      
      <ul className='list-group'>
        {cartitems.map(item => (
          <li key={item.pid} className='list-group-item d-flex justify-content-between align-items-center' style={{ padding: '15px', borderRadius: '8px', marginBottom: '10px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ flex: 2 }}>
              <p><strong>{item.pname}</strong></p>
              <p>₹{item.price} x {item.qtty} = ₹{item.price * item.qtty}</p>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <img src={item.imageUrl} width='100px' height='100px' alt='product' style={{ objectFit: 'cover', borderRadius: '8px' }} />
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <button className='btn btn-success m-1' onClick={() => increment(item)}>+</button>
              <button className='btn btn-warning m-1' onClick={() => decrement(item)}>-</button>
              <button className='btn btn-danger m-1' onClick={() => deleteitem(item)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="text-center mt-3">
        <h4>Grand Total: ₹{grandtotal}</h4>
        <button className="btn btn-primary mt-3" onClick={confirmorder}>Confirm Order</button>
      </div>
    </div>
  );
}

export default Cart;
