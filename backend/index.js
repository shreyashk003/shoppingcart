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
app.get('/api/getAllorders', async (req, res) => {
    console.log('i am here')
    try {
        const myCollection = myDB.collection("orders");
        const result = await myCollection.find({}).toArray();
        res.send(result);
    } catch (error) {
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
