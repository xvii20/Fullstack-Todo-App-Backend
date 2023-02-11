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

app.get("/users", function (req,res){
   client.query(`Select * from users`, function (err, result){
   if (!err){
      console.log(result)
   res.send(result.rows)
   }
   else{res.send(err.message)}
   
})

   })

/*
const name = 'joe';
console.log(path.join('/', 'users', name, 'notes.txt')) // '/users/joe/notes.txt'
*/

let PORT = process.env.PORT || 5000;


app.listen(PORT, function() {console.log(`server is running on ${PORT}`)})


