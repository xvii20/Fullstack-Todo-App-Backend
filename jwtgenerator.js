const jwt = require("jsonwebtoken");
require("dotenv").config();


// this function generates a jwt token. simply put a a payload, and then you need to return jwt.sign(payload, process.env.jwtsecret, and set an expire date for token)
// here token will expire after 1hr
function jwtgenerator(id){
   // console.log(process.env.jwtsecret)
const payload = {
user: id

}

return jwt.sign(payload, process.env.jwtsecret, {expiresIn: "1hr" })
}

module.exports = jwtgenerator