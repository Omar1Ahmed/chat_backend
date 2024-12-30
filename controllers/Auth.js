const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.register = async (req, res) => {
    const { email, password ,first_name, last_name,fb_token} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    try{

        const user =await User.createUser(email, hashedPassword,first_name,last_name,fb_token);

        const token = createToken(user.id, user.firstName,fb_token);

        console.log(token);
        res.status(201).json({code: 201, message: 'User registered successfully', userData: user, token : token});

    }catch(error){

        res.status(201).json({code: 201, message: 'failed to register user' ,error: error.message});
    }
};

exports.login = async (req, res) => {
    const { email, password,fb_token } = req.body;
    const user = await User.findByEmail(email);
    
    if(user == null){
    
    res.status(201).json({code: 201, message: "Failed logging in", error:"No recorded account for "+email}) 
    }else if (user && await bcrypt.compare(password, user.password)) {
        
        await User.updateFBToken(fb_token);
        
        const token = createToken(user.id, user.first_name,fb_token);
       
        res.json({ code: 201, message: "Successfully logged in",token:token });
    } else {
        res.status(201).json({ code: 201, message: "Failed logging in", error:"Invalid Password"});
    }
};


const createToken = (id, name,fb_token) =>{
    
    const payload = {
        id: id, 
        firstName: name,
        fb_token: fb_token
   }
   const token = jwt.sign(payload, process.env.JWT_SECRET);
   
   return token;
}