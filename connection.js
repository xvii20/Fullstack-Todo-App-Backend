
const {Client} = require("pg")
const { connect } = require("http2")
require("dotenv").config()


const client = new Client({

  
  host:"containers-us-west-190.railway.app",
  user: "postgres",
  port: 7940,
  password: "BdewPSrJ1bodLjjrwybP",
  database: "railway",
  connectionString: "postgresql://postgres:BdewPSrJ1bodLjjrwybP@containers-us-west-190.railway.app:7940/railway"

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
}
else{console.log(err.message)}


client.end;
}) 

module.exports = client 

