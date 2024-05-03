const JWT = require('jsonwebtoken');
const secretKey = 'iamsecretKey';

const userAuthRole = (req, res, next) => {
const authToken  = req.headers['authorization'] ;
console.log("Here is the authToken", authToken)
if(!authToken){
    console.log("No token provided ! Access Denied")
    return res.status(401).json({message: "Access Denied"})
}

const decoded = JWT.verify(authToken, secretKey);
console.log("Decoded token", decoded)
if(!decoded){
return res.status(401).json({message: "Access Denied"})
}

const userRole = decoded.role;

req.user = decoded;

if(userRole==='admin'){
    next();

}else if(userRole==='user'){
if(req.method==='GET'){
    next();
}else{
    return res.status(401).json({message: "Access Denied"})
}
}else{
    return res.status(401).json({message: "Access Denied"})
}

}


module.exports = userAuthRole;