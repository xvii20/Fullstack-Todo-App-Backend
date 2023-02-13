let client = require("./connection.js")
let express = require("express")
require("dotenv").config()
const cors = require('cors');
const path = require('path')


let app = express()
/*
app.use(cors({
   origin: '*',
   credentials: true,
})); */
 app.use(cors());


 app.use(express.urlencoded({ extended: true }));
app.use(express.json()) 


app.get("/", (req,res) =>{

res.send("qzu")

})

// Sending data to the Database...
app.post("/users", async function (req,res){

console.log(req.body) // returns the second parameter from the axios.post request from the app.js file basically the objectword variable.

try{
let postingdata = await client.query(`insert into users (username,password) values('${req.body.username}','${req.body.password}')`)

res.json(postingdata)
console.log("sucesss for posting")
}

catch(err){ console.log(err.message)

}

/*
client.query(`insert into users (username,password) values('${req.body.username}','${req.body.password}')`
, function(err,result){

if (!err){

   res.send("insert successful")

}
else{console.log("insert failed")}

})
*/
})

// Requesting Data From the Database...and then sending it back to the frontend, because axios did a get request to this endpoint
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


// tomorrow make a delete response
app.delete("/usersx/:id",async function(req,res) {

try{
let deleteuser = await client.query(`DELETE FROM users where id =${req.params.id}`)
res.json("your account has been deleted")
}

catch(err){
   console.log(err.message)
}

})



//tomorrow make a put response
app.put("/usersx/:id", async (req,res) => {
  

  //  res.header("Access-Control-Allow-Origin", "true");

  // this is needed to bypass cors error  res.header
 // res.header("Access-Control-Allow-Origin", "*");
  const headers = {
   'Content-Type': 'application/json',
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Methods': '*',
   'Access-Control-Allow-Headers': '*'
}
   console.log(req.body)
   console.log(req.body.username)
   
let done = await client.query(`UPDATE users SET username = '${req.body.username}', password = '${req.body.password}' WHERE id=${req.params.id}`) 
console.log("successfully updated your entry")
})




let PORT = process.env.PORT || 5000;

//x
app.listen(PORT, function() {console.log(`server is running on ${PORT}`)})
