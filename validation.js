const Joi = require('joi')


const  registerValidation = (data)=>{
    const schema= Joi.object({
        name:Joi.string().required().max(50).min(3),
        email:Joi.string().min(5).max(255).required().email(),
        phone:Joi.string().required(),
        password:Joi.string().min(5).max(255).required(),
        isAdmin:Joi.boolean()
    });
    return schema.validate(data)
}


const  loginValidation = (data)=>{
    const schema= Joi.object({
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    });
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation