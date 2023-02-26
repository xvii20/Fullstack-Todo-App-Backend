let client = require("./connection.js")
let express = require("express")
require("dotenv").config()
const cors = require('cors');
const path = require('path');
const bcrypt = require("bcrypt");
const jwtgenerator = require("./jwtgenerator")
const {v4: uuidv4} = require("uuid")



let app = express()

app.use(cors());

 app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // allows you to access req.body from the client side because it parses JSON



// Login code  IF YOU WANT TO CHECK FOR a USER in the database based on user input (aka the request body), you need to do a post request
app.post("/login", async (req,res) => {
// AND password ='${req.body.password}'
try{
let response = await client.query(`SELECT * from users WHERE email = '${req.body.email}'`)
// console.log(req.body)
console.log(response.rows) // returns the rows where username = whatever the user typed...
// console.log(response.rows[0].password) // returns the password IN THE DATABASE!! of the user
if (response.rows == false){console.log("response rows is false, basically user does not exist") // basically what this code does is, if response.rows is a falsy value (null,undefined,"",0,false) then it will execute the code. right now response.rows is a empty string, so its false

return res.status(401).send("sorry this user does not exist") // you can also do return res.status(401).json("sorry this user does not exist") if you want to send it as json data
}
// basically bcrypt.compare compares the user inputted password in the login field (req.body.password) with the hashed password in the database (response.rows[0].password)


let validpassword = await bcrypt.compare(req.body.password,response.rows[0].password)
console.log(validpassword) // returns a boolean true or false depending on whether the user logged in with the right password


// this if the validpassword is true, then use the JSON webtoken generator in this if statement so that way when login is successful, users will have a jwttoken
if (validpassword){
   console.log("login successful")
const token = jwtgenerator(response.rows[0].id)
console.log(response.rows[0].id)  // returns 56
console.log(token)
res.json({token})
}

else {
res.status(401).json("login failed")}

}
catch(err){
console.log(err)
console.log("failed")
}


})



// loginwith google account
app.post("/signupwithaccount", async (req,res) => {

try{  

   let postingdata = await client.query(`insert into guids (email,password) values('${req.body.email}','${req.body.password}')`)
console.log(postingdata) 
res.json(postingdata)
// '${req.body.title}','${req.body.date}','${req.body.description}')
}
catch(error){ console.log(error)}

})

// create a new todo, and then posting this todo data to the database, it works
app.post("/todos", async (req,res) => {

let uuid = uuidv4()  // this allows to generate a random uuid. we can name this variable anything you want it does not have to be named uuid
// console.log(req.body)

try{

  let response = await client.query(`INSERT INTO todos(title,tododate,description,progress,email) VALUES('${req.body.title}','${req.body.tododate}','${req.body.description}','${req.body.progress}','${req.body.email}')`)
res.json(response)
}
catch(error){console.log(error)
} 

})

// fetch all todos from database where the guid matches the req.params.uid, it works
app.get("/todos/:email", async function (req,res){

let response = await client.query(`Select * from todos WHERE email = '${req.params.email}'`)
console.log(response.rows)
res.json(response.rows)  // to allow the frontend to be able to access the response, such as console.log, mapping etc
}) 


// Edit a Specific Todo
app.put("/todos/:id", async function(req,res){
   console.log(req.params.id)
   console.log(req.body)

  let response = await client.query(`UPDATE todos SET title= '${req.body.title}', tododate='${req.body.tododate}', description='${req.body.description}', progress='${req.body.progress}' WHERE ID = '${req.params.id}'`)
res.json(response)
})


// Delete a Specific Todo
app.delete(`/todos/:id`, async function(req,res){
try{
let {id} = req.params
let response = await client.query(`DELETE FROM todos WHERE id = '${id}'`)
res.json(response)

}
catch(error){console.log(error)}
})

// Delete all Todos
app.delete("/todos/users/:email", async (req,res) =>{

let response = await client.query(`DELETE FROM todos where email ='${req.params.email}'`)
res.json(response)
})

let PORT = process.env.PORT || 5000;

//x
app.listen(PORT, function() {console.log(`server is running on ${PORT}`)})
