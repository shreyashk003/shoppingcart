const express = require('express');
const cors = require('cors');
const nodemailer=require('nodemailer');
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

function sendmail(to, sub, msg) {
    transporter.sendMail({
        from: 'shreyashkulkarni03@gmail.com', // Sender address
        to: to, // Recipient address
        subject: sub, // Subject line
        html: msg // Email body in HTML format
    }, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}
exports.someAction = function (request, reply) {
    var postParams = request.payload
}




// Define a route for fetching all products
app.get('/api/getAllProducts', async (req, res) => {
    try {
        const myCollection = myDB.collection("products");
        const result = await myCollection.find({}).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
});

app.get('/api/getAllcustomer', async (req, res) => {
    try {
        const myCollection = myDB.collection("customer");
        const result = await myCollection.find({}).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
});

app.post('/api/insertcustomer', async(req,res)=>{
    const customer=req.body
    try {
        const myCollection = myDB.collection("customer");
        const result = await myCollection.insertOne(customer);
        res.send("One customer inserted");
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
} )

app.post('/api/insertproducts', async(req,res)=>{
    const products=req.body
    console.log("i am here")
    try {
        const myCollection = myDB.collection("products");
        const result = await myCollection.insertOne(products);
        res.send("One product inserted");
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
} )

app.post('/api/sendemail', (req,res)=>{
    const To=req.body.To
    const Subject=req.body.Subject
    const message=req.body.message
    console.log(To,Subject,message)
    sendmail(To, Subject, message);

} )


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
