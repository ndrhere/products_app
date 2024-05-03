const User = require('../Schema/UserSchema');
const bcrypt = require('bcryptjs')
const secretKey = 'iamsecretKey'
const JWT = require('jsonwebtoken')



exports.register = async (req, res) => {
const {name, email, password, role} = req.body;
let user = await User.findOne({email: email});
if(user){
    return res.json({message: "Email address already exists"})
}
const salt = bcrypt.genSaltSync(10);
const hashPassword = bcrypt.hashSync(password, salt);

user = await User.create({
name: name,
email: email,
password: hashPassword,
role: role
})

const payload = {
    userId: user._id,
    role: user.role
}

const authToken = JWT.sign(payload, secretKey)
res.json({authToken})

}




exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.json({message: 'Invalid credentials'})
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
        return res.json({message: "Inavlid credentials"})
        }
        
        const payload = {
            userId: user._id,
            role: user.role
        }
        
        const authToken = JWT.sign(payload, secretKey);
        res.status(201).json({authToken})
    }catch(error){
        res.json({message: "Internal Error occurred"})
    }

}
