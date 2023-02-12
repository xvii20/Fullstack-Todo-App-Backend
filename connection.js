
const {Client} = require("pg")
const { connect } = require("http2")
require("dotenv").config()


const client = new Client({
  
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  connectionString: "postgresql://postgres:BdewPSrJ1bodLjjrwybP@containers-us-west-190.railway.app:7940/railway",

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

