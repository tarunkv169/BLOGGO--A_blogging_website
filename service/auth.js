const jwt = require("jsonwebtoken");
const secret_key = "$uperMan@123"

function createTokenForUser(Loginuser)
{
    const Loginuser_payload = {
       _id: Loginuser._id,
       fullname: Loginuser.fullname,
       email: Loginuser.email,
       profileImage: Loginuser.profileImage,
       role: Loginuser.role
    }

    const token = jwt.sign(Loginuser_payload,secret_key);

    return token;
}


function validateToken(token)
{
    if(!token){return null}

    const LoginUser_payload = jwt.verify(token,secret_key);

    return LoginUser_payload;
}


module.exports = {
    createTokenForUser,
    validateToken
}