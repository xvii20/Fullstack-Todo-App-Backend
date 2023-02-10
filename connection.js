const {Client} = require("pg")
const { connect } = require("http2")
const client = new Client({
host:"localhost",
user:"kkupop3",
port:5432,
/* sometimes u might have to include a password but for me no need */
database:"kkupop3",
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