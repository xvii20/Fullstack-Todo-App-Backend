let client = require("./connection.js")
let express = require("express")
require("dotenv").config()

const path = require('path')


let app = express()


 app.use(express.urlencoded({ extended: true }));
app.use(express.json()) 

const cors = require('cors');
const { nextTick } = require("process")
app.use(cors({
   origin: '*'
})); 

app.use("/", (req,res) =>{

res.send("wqqqq")

})

app.post("/users", function(req,res){

console.log(req.body) // returns the data from the app.js file 

client.query(`insert into users (username,password) values('${req.body.username}','${req.body.password}')`
, function(err,result){

if (!err){

   res.send("insert successful")

}
else{console.log("insert failed")}

})

})

app.get("/users", async (req,res) => {

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

/*
const name = 'joe';
console.log(path.join('/', 'users', name, 'notes.txt')) // '/users/joe/notes.txt'
*/

let PORT = process.env.PORT || 5000;


app.listen(PORT, function() {console.log(`server is running on ${PORT} hehe`)})







