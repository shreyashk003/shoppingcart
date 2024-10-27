import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/Vieworder.css'; // Custom CSS file for additional styles

function Vieworder() {
    const cid = useRef("");
    const [orderx, setorders] = useState([]);
    const [orderiddetails, setorderiddetails] = useState([]);
    const [customeriddetails, setcustomeriddetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const UpdateStatus = async (ord) => {
        const oid3 = ord.oid;
        const payload = { oid: oid3 };
        await axios.post("http://localhost:9000/api/updateOrderStatus", payload)
            .then(response => {
                alert(response.data);
                setorderiddetails(orderiddetails.map(ordx => ordx.oid === ord.oid ? { ...ordx, ordstatus: "Dispatched" } : ordx));
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
                setErrorMessage("Error fetching orders, please try again.");
            });
    };

    const showcustomer = async (ord) => {
        const cusid = ord.cid;
        const payload = { cid: cusid };
        await axios.post("http://localhost:9000/api/getcustomeriddetails", payload)
            .then(response => {
                setcustomeriddetails(response.data);
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
                setErrorMessage("Error fetching orders, please try again.");
            });
    };

    const showdetails = async (ord) => {
        const orderid1 = ord.oid;
        const payload = { oid: orderid1 };
        await axios.post("http://localhost:9000/api/getorderiddetails", payload)
            .then(response => {
                setorderiddetails(response.data);
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
                setErrorMessage("Error fetching orders, please try again.");
            });
    };

    const order = async () => {
        const cid1 = cid.current.value;
        const payload = { cid: cid1 };
        await axios.post("http://localhost:9000/api/getcidOrders", payload)
            .then(response => {
                setorders(response.data);
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
                setErrorMessage("Error fetching orders, please try again.");
            });
    };

    return (
        <div className="container mt-5 view-order-container">
            <div className="card shadow-lg p-4 rounded view-order-card">
                <h3 className="text-center mb-4">View Orders</h3>
                
                <div className="input-group mb-3">
                    <input
                        type="text"
                        ref={cid}
                        placeholder="Enter Customer ID (cid)"
                        className="form-control view-order-input"
                    />
                    <button onClick={order} className="btn btn-primary">Show Orders</button>
                </div>

                {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

                <ul className="list-group mt-3">
                    {customeriddetails.length > 0 ? (
                        customeriddetails.map((ord2, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center view-order-item">
                                <div><strong>CID:</strong> {ord2.cid}</div>
                                <div><strong>Name:</strong> {ord2.cname}</div>
                                <div><strong>Age:</strong> {ord2.cage}</div>
                                <div><strong>Username:</strong> {ord2.username}</div>
                            </li>
                        ))
                    ) : (
                        <p className="text-muted text-center mt-3">No orders to display</p>
                    )}
                </ul>

                <ul className="list-group mt-3">
                    {orderx.length > 0 ? (
                        orderx.map((ord, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center view-order-item">
                                <div><strong>Order ID:</strong> {ord.oid}</div>
                                <div><strong>Date:</strong> {ord.odate}</div>
                                <div><strong>Address:</strong> {ord.oadress}</div>
                                <div><strong>Amount:</strong> ${ord.orderamt}</div>
                                <div><strong>Status:</strong> {ord.ordstatus}</div>
                                <div className="order-buttons">
                                    <button onClick={() => showdetails(ord)} className="btn btn-info btn-sm">Details</button>
                                    <button onClick={() => showcustomer(ord)} className="btn btn-secondary btn-sm">Customer</button>
                                    <button onClick={() => UpdateStatus(ord)} className="btn btn-warning btn-sm">Update Status</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-muted text-center mt-3">No orders to display</p>
                    )}
                </ul>

                <ul className="list-group mt-3">
                    {orderiddetails.length > 0 ? (
                        orderiddetails.map((ord1, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center view-order-item">
                                <div><strong>PID:</strong> {ord1.pid}</div>
                                <div><strong>Product:</strong> {ord1.pname}</div>
                                <div><strong>Qty:</strong> {ord1.qtty}</div>
                                <div><strong>Price:</strong> ${ord1.price}</div>
                                <div><strong>Total:</strong> ${ord1.total}</div>
                            </li>
                        ))
                    ) : (
                        <p className="text-muted text-center mt-3">No order details to display</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Vieworder;
