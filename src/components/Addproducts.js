import React, { useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/Addproducts.css'; // Custom CSS file

function Addproducts() {
    const pid = useRef("");
    const pname = useRef("");
    const price = useRef("");

    const Add = () => {
        const payload = {
            pid: pid.current.value,
            pname: pname.current.value,
            price: price.current.value,
        };

        axios.post("http://localhost:9000/api/insertproducts", payload)
            .then(response => {
                alert(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="container d-flex flex-column align-items-center mt-6">
            <h1 className="add-product-title">Add Products</h1>
            
            <div className="input-group mb-3 add-product-input">
                <input
                    type="text"
                    ref={pid}
                    placeholder="Enter Product ID"
                    className="form-control"
                />
            </div>
            <div className="input-group mb-3 add-product-input">
                <input
                    type="text"
                    ref={pname}
                    placeholder="Enter Product Name"
                    className="form-control"
                />
            </div>
            <div className="input-group mb-3 add-product-input">
                <input
                    type="text"
                    ref={price}
                    placeholder="Enter Price"
                    className="form-control"
                />
            </div>
            <button onClick={Add} className="btn btn-Danger add-product-btn">Insert Product</button>
        </div>
    );
}

export default Addproducts;
