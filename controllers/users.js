const User = require('../models/User')
const bcrypt = require("bcryptjs");
const {registerValidation,loginValidation} = require('../validation')

//for registering user
const register = async (req,res) =>{
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const {name ,email, password, phone, isAdmin} = req.body;
    const emailAlreadyExists = await User.findOne({email})
    if(emailAlreadyExists) return res.status(400).send(`user with email ${email} already exist`)        
    const hashedPassword = await bcrypt.hash(password,12)
    const user = await User.create({...req.body , password: hashedPassword})
    try{
        const saveUser = await user.save()
    
        res.send(saveUser)
    }catch(err){
        res.status(400).send(err)
    }

}

 //login user
const login =  async (req,res)=>{
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
const {email,password} = req.body;
let user = await User.findOne({email})
if(!user){
    console.log(email, password)
    return res.json({status:404,msg:'user doesnt exist'})
}  
const validPassword = await bcrypt.compare(req.body.password, user.password)
if(!validPassword)return res.json({status:401, msg:'Invalid email or password.'})
res.json({status:200, msg:'You are logged in',isAdmin:user.isAdmin,id:user._id})
}

//get all users
const getUsers = async(req,res)=>{
    User.find({},function(err,users){
        
        const user = users.map((u)=>u)
        res.send(user)
    }) 
}

//get user by id
const getSingleUser = async (req,res) =>{
    try{

        const user = await User.findById(req.params.id )
        if (!user) {
            res.send(`No user with id `);
        }else{

            res.send(user);
        }
    }catch(error){
        res.send({msg:'errr'})
    } 
}


//edit user data
const editUsers = async(req,res)=>{ 
    const {name,email,phone} = req.body;
    try{
        const user = await User.findByIdAndUpdate(req.params.id,{name,email,phone})
        if (!user) {
            res.send(`No user with id `);
        }else{
            await user.save()
            res.send(user);
        }
    }catch(err){
        res.send({msg:'err'})
    }
   
}

//delete user 
const deleteUser = async (req,res)=>{
    try{
       const delUser = await User.findByIdAndDelete(req.params.id)
        res.send(delUser)
    }catch(error) {
        console.log(error)
    }
    console.log(req.params.id)
}

module.exports ={
    register,login,getUsers,getSingleUser,editUsers,deleteUser
}