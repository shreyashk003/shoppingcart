const mongodb=require('mongodb')

const uri="mongodb://localhost:27017/shoppingcart";

var db=""
const myconnection=new mongodb.MongoClient(uri);
try{
    myconnection.connect()
    db=myconnection.db("shoppingcart")

    console.log("connected to Mongodb")

}catch(err){
    console.log(err)
}

module.exports=db