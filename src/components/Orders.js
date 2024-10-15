import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Orders({ cartitems, grandtotal, clearCart, customer }) {
  const [orderConfirmed, setOrderConfirmed] = useState(false); // Track if the order is confirmed

  // Function to confirm the order and send data to backend
  const confirmOrder = async () => {
    const orderDetails = {
      customerEmail: customer.email || 'shreyashkulkarni03@gmail.com', // This should be dynamic
      items: cartitems.map(item => ({
        pid: item.pid,
        pname: item.pname,
        price: item.price,
        qtty: item.qtty,
        cid: customer.cid, // Assuming `customer` has `cid` property
        total: item.price * item.qtty
      })),
      grandTotal: grandtotal,
      orderDate: new Date().toISOString(),
    };

    const orderItems = cartitems.map(item => ({
      oid: 304, // Example order ID, should be dynamic from backend or state
      odate: new Date().toISOString(),
      oaddress: 'Tilakwadi', // Example address, should be dynamic
      cid: customer.cid,
      pid: item.pid,
      pname: item.pname,
      price: item.price,
      qtty: item.qtty,
      total: item.price * item.qtty
    }));

    axios.post("http://localhost:9000/api/insertorderitems", orderItems)
      .then(response => {
        alert("Order items inserted successfully!");
      })
      .catch(err => {
        console.log(err);
        alert("Failed to insert order items.");
      });

    try {
      const to = customer.email || 'shreyashkulkarni03@gmail.com';
      const subject = 'Order Confirmation';

      // Construct email body with HTML table of cart items
      let message1 = "<table border='1' style='border-collapse: collapse;'><thead><th>Item ID</th><th>Item Name</th><th>Item Price</th><th>Item Qtty</th><th>Amount</th></thead><tbody>";
      
      message1 += cartitems.map(item => (
        `<tr><td>${item.pid}</td><td>${item.pname}</td><td>${item.price}</td><td>${item.qtty}</td><td>${item.qtty * item.price}</td></tr>`
      )).join('');

      message1 += `</tbody></table><br/>Your order amount: ₹${grandtotal}`;

      const payload = {
        to: to,
        subject: subject,
        message: message1
      };

      // Send the email via the backend
      await axios.post("http://localhost:9000/api/sendemail", payload);
      alert("Email sent successfully!");

      // Send order details to the backend
      await axios.post('http://localhost:9000/api/placeOrder', orderDetails);
      setOrderConfirmed(true); // Update state to show confirmation
      alert('Order confirmed successfully!');
      clearCart(); // Clear cart after successful order placement
    } catch (error) {
      console.error('Error during order placement:', error);
      alert('Failed to place the order. Please try again.');
    }
  };

  return (
    <div className="container mt-2" style={{ width: '30%', minHeight: '400px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
      <h2 className="text-center" style={{ fontSize: '1.4rem', marginBottom: '20px', fontWeight: 'bold' }}>Order Summary</h2>

      <ul className="list-group" style={{ fontSize: '0.9rem' }}>
        {cartitems.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ padding: '10px', marginBottom: '8px', borderRadius: '6px', border: '1px solid #e0e0e0' }}>
            <span><strong>{item.pname}</strong> (x{item.qtty})</span>
            <span>₹{item.price * item.qtty}</span>
          </li>
        ))}
      </ul>

      {!orderConfirmed ? (
        <div className="text-center mt-3">
          <button className="btn btn-success" onClick={confirmOrder} style={{ fontSize: '1rem', padding: '8px 20px' }}>Confirm Order</button>
        </div>
      ) : (
        <div className="text-center mt-3">
          <h5 style={{ color: '#28a745', fontWeight: 'bold' }}>Your order has been placed successfully!</h5>
        </div>
      )}
      
      <h3 style={{ textAlign: 'center', fontSize: '1.2rem', marginTop: '20px' }}>Grand Total: ₹{grandtotal}</h3>
    </div>
  );
}

export default Orders;
