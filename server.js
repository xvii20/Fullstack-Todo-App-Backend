let client = require("./connection.js")
let express = require("express")
require("dotenv").config()
const cors = require('cors');
const path = require('path');
const bcrypt = require("bcrypt");
const jwtgenerator = require("./jwtgenerator")
const {v4: uuidv4} = require("uuid")



let app = express()

/* app.use(cors({
   origin: '*',
   credentials: true,
}));  */

app.use(cors());

 app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // allows you to access req.body from the client side because it parses JSON



app.get("/", (req,res) =>{

res.send("qzu")

})


/*
// Sending data to the Database...
app.post("/users", async function (req,res){

   const saltRound = 10;

 // this code generates a random salt
 const salt = await bcrypt.genSalt(saltRound);
   const bcryptpassword =  await bcrypt.hash(req.body.password, salt) 

console.log(req.body) // returns the second parameter from the axios.post request from the app.js file basically the objectword variable.

try{
let postingdata = await client.query(`insert into users (username,password) values('${req.body.username}','${bcryptpassword}')`)

// res.json(postingdata.rows[0])
console.log("sucesss for posting")


const token = jwtgenerator(postingdata.rows.id)
 console.log(token) 
res.json({token})   

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

}) */
let x = ""
console.log(x == false) // returns true

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
   console.log("login successful!!!")
const token = jwtgenerator(response.rows[0].id)
console.log(response.rows[0].id)  // returns 56
console.log(token)
res.json({token})
}

else {console.log("login failed!!!")
res.status(401).json("login failed!!!!!")}

}
catch(err){
console.log(err)
console.log("failed")
}


})

let zu = "helllo world"
console.log(zu.split(""))

// Requesting Data From the Database...and then sending it back to the frontend, because axios did a get request to this endpoint
app.get("/usersx", async (req,res) => {

try{const alldata = await client.query(`SELECT * FROM USERS`)
console.log(alldata.rows)
 res.json(alldata.rows)
console.log(req.headers)
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
  
// cross-origin:true
  //  res.header("Access-Control-Allow-Origin", "true");

  // this is needed to bypass cors error  res.header
 // res.header("Access-Control-Allow-Origin", "*");
  const headers = {
   'Content-Type': 'application/json',
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Methods': '*',
   'Access-Control-Allow-Headers': '*'
}

   
let done = await client.query(`UPDATE users SET username = '${req.body.username}', password = '${req.body.password}' WHERE id=${req.params.id}`) 
console.log("successfully updated your entry")
XMLHttpRequest.abort()  // cancels all pending https requests if it has already been snt
})


// loginwith google account
app.post("/signupwithaccount", async (req,res) => {

// try to implement this,  if this value exist in data base,  use app.get and fetch the users game info from another table
// if (req.body.guid)
// else execute this code below
try{  // console.log(req.body) // returns { guid: 'qn412HmjeKaUcXKeJ4nNbLSlvOf1' }
  /*
   let response = await client.query(`SELECT * FROM guids WHERE guid = '${req.body.guid}'`) // this should always return 1 entry so we can use response.rows[0] to get the right data

   // TODO After eating: experiment without this code below  because remember we have a unique constraint  the try it out with facebook see if the uid is same with google. also remember res.json is used to send data to the frontend. u need to use this so the frontend can display the data on the screen
   if (response.rows[0].guid == req.body.guid){console.log("user already exists in database")
   console.log(req.body.guid)
}  */
   
   // console.log(response.rows[0].guid) // returns qn412HmjeKaUcXKeJ4nNbLSlvOf1
  //  console.log(req.body.guid) // returns qn412HmjeKaUcXKeJ4nNbLSlvOf1
// username is email
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
console.log(req.body)

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
