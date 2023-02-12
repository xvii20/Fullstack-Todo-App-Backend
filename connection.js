
const {Client} = require("pg")
const { connect } = require("http2")
require("dotenv").config()


const client = new Client({

  
  //host:"containers-us-west-190.railway.app",
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
connectionString: process.env.CONNECTION_URL

 /*host:"localhost",
user: "kkupop3",
port: 5432,
// password: "3MuLIP7MZcRHM75LkQMY",
database: "kkupop3" */
})

client.connect();


client.query('select * from users',(err,res) => {
if (!err){
  console.log(res.rows)
  console.log(process.env.PGPASSWORD)
}
else{console.log(err.message)}


client.end;
}) 

module.exports = client 

