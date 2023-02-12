let client = require("./connection.js")
let express = require("express")
require("dotenv").config()

const path = require('path')


let app = express()


 app.use(express.urlencoded({ extended: true }));
app.use(express.json()) 

const cors = require('cors');

app.use(cors({
   origin: '*'
})); 



app.get("/", (req,res) =>{

res.send("qzu")

})

// Sending data to the Database...
app.post("/users", function(req,res){

console.log(req.body) // returns the second parameter from the axios.post request from the app.js file basically the objectword variable.

client.query(`insert into users (username,password) values('${req.body.username}','${req.body.password}')`
, function(err,result){

if (!err){

   res.send("insert successful")

}
else{console.log("insert failed")}

})

})

// Requesting Data From the Database...
app.get("/usersx", async (req,res) => {

try{const alldata = await client.query(`SELECT * FROM USERS`)
console.log(alldata.rows)
res.json(alldata.rows)
console.log(res.json(alldata.rows))
}
catch(err){console.log(err)}



 /*  client.query(`Select * from users`, function (err, result){
   if (!err){
      console.log(result.rows)
   res.send(result.rows)
   }
   else{res.send(err.message)}
   
}) */

   })


let PORT = process.env.PORT || 5000;


app.listen(PORT, function() {console.log(`server is running on ${PORT} hehe`)})
