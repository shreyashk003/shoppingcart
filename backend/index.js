const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const myDB = require('./DBConnect'); // Assuming myDB is the DB connection
const app = express();
const port = 9000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP server
    port: 465, // Secure port for SMTP
    secure: true, // True for 465, false for other ports
    auth: {
        user: 'shreyashkulkarni03@gmail.com', // Your email
        pass: 'dmyw ymho ludy dksl' // Your app password (note: use an app-specific password)
    }
});

// Function to send email
function sendmail(to, sub, msg, callback) {
    transporter.sendMail({
        from: 'shreyashkulkarni03@gmail.com', // Sender address
        to: to, // Recipient address
        subject: sub, // Subject line
        html: msg // Email body in HTML format
    }, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
            callback(err, null);
        } else {
            console.log('Email sent:', info.response);
            callback(null, info.response);
        }
    });
}

// Route to send email
app.post('/api/sendemail', async (req, res) => {
    const { to, subject, message } = req.body; // Use lowercase `to`, `subject`, `message` as per frontend

    console.log('Sending email to:', to, subject, message);

    sendmail(to, subject, message, (err, response) => {
        if (err) {
            return res.status(500).send({ message: 'Error sending email', error: err });
        }
        res.send({ message: 'Email sent successfully', response });
    });
});

// Route to fetch all products
app.get('/api/getAllProducts', async (req, res) => {
    try {
        const myCollection = myDB.collection("products");
        const result = await myCollection.find({}).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
});


// Route to fetch all customers
app.get('/api/getAllcustomer', async (req, res) => {
    try {
        const myCollection = myDB.collection("customer");
        const result = await myCollection.find({}).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
});
// Route to fetch all orders for a specific customer
app.post('/api/getcidOrders', async (req, res) => {
    const cid1 = parseInt(req.body.cid); // Retrieve 'cid' from query parameters
    console.log('Fetching orders for customer ID:'+ cid1);
    
        const myCollection = myDB.collection("orders");
        const result = await myCollection.find({cid:cid1}).toArray(); // Find orders for specific customer ID
        console.log(result)
        res.send(result); // Send back the orders for that customer
    
});

app.post('/api/updateOrderStatus', async (req, res) => {
    const oid = parseInt(req.body.oid); // Retrieve 'cid' from query parameters
    console.log('Fetching orders for customer ID:'+ oid);
    
        const myCollection = myDB.collection("orders");
        const result = await myCollection.updateOne({oid:oid},{$set:{ordstatus:"Dispatched"}}); // Find orders for specific customer ID
        console.log(result)
        res.send("Order Status Updated"); // Send back the orders for that customer
    
});


app.post('/api/getorderiddetails', async (req, res) => {
    const orderid1=parseInt(req.body.oid)
    console.log("order deatils of customer"+orderid1)
        const myCollection = myDB.collection("orderitems");
        const result = await myCollection.find({oid:orderid1}).toArray();
        console.log(result)
        res.send(result);
    
});

app.post('/api/getcustomeriddetails', async (req, res) => {
    const cusid=parseInt(req.body.cid)
    console.log("order deatils of customer"+cusid)
        const myCollection = myDB.collection("customer");
        const result = await myCollection.find({cid:cusid}).toArray();
        console.log(result)
        res.send(result);
    
});





app.get('/api/getorderidcount', async (req, res) => {
    console.log('I am here');
    try {
        const myCollection = myDB.collection("orderCounters");

     // Increment the 'count' field by 1
     const result1=await myCollection.find({}).toArray()
        // Log and send the updated document
        console.log(result1);
        res.send(result1);  // result.value contains the updated document
        let ordcnt=result1[0].orderidcount

        // Find the document and increment the count
        const result = await myCollection.updateOne({},{$set:{orderidcount:ordcnt+1}}  // Return the updated document, create it if not found
        );

        
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "An error occurred", error });
    }
});






app.post('/api/getusername', async (req, res) => {
    const username=req.body.username
    try {
        const myCollection = myDB.collection("customer");
        const result = await myCollection.find({username:username}).toArray();
        console.log(result)
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
});


// Route to insert customer
app.post('/api/insertcustomer', async (req, res) => {
    const customer = req.body;
    try {
        const myCollection = myDB.collection("customer");
        await myCollection.insertOne(customer);
        res.send("One customer inserted");
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
});

// Route to insert product
app.post('/api/insertproducts', async (req, res) => {
    const products = req.body;
    try {
        const myCollection = myDB.collection("products");
        await myCollection.insertOne(products);
        res.send("One product inserted");
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
});
app.post('/api/insertorderitems', async (req, res) => {
    console.log("hello")
    const orderitems = req.body;
    try {
        const myCollection = myDB.collection("orderitems");
        await myCollection.insertMany(orderitems);
        res.send("orderitems inserted");
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
});

app.post('/api/placeOrder', async (req, res) => {
    const order = req.body;
    try {
      const myCollection = myDB.collection("orders");
      await myCollection.insertOne(order);
      res.send("Order placed successfully");
    } catch (error) {
      res.status(500).send({ message: "Error placing the order", error });
    }
  });

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
