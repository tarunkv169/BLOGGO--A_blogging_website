const {validateToken} = require("../service/auth")

function checkAuthentication(cookiename)
{
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookiename];

        if(!tokenCookieValue){return next()};
    
        try {
            const LoginUser_payload = validateToken(tokenCookieValue);
            req.user = LoginUser_payload;
            res.locals.user = req.user;
        } catch (error) {
           
        }
    
        return next();  
    }
}

module.exports = {
    checkAuthentication
}