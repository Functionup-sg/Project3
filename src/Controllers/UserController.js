const UserModel=require('../Models/UserModel.js')
const validator=require("validator")



function validateName($name) {
    var nameReg = /^[A-Za-z ]*$/;
    if (!nameReg.test($name)) {
        return false;
    } else {
        return true;
    }
}


function validateMobile($mobile) {
    var mobileReg = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    if (!mobileReg.test($mobile)) {
        return false;
    } else {
        return true;
    }
}


const CreateUser= async (req,res)=>{
    try {
         let data=req.body
  if(Object.keys(data).length==0) return res.status(400).send("Input Should not be Empty")
if(!data.title) return res.status(400).send("title is mandatory")
if(!data.phone) return res.status(400).send("phone is mandatory")
if(!validateMobile(data.phone))  return res.status(400).send("phone is not valid")
if(!data.name) return res.status(400).send("name is mandatory")
if(!validateName(data.name)) return res.status(400).send("name is not valid")
if(!data.email) return res.status(400).send("email is mandatory")
if(!validator.isEmail(data.email)) return res.status(400).send("email is not valid")
if(!data.password) return res.status(400).send("password is mandatory")
if(validator.isStrongPassword(data.password))  return res.status(400).send("password is not valid")

let UniqueDetails=await UserModel.findOne({email:data.email,phone:data.phone})
if(UniqueDetails) return res.status(400).send("Email & Phone must be Unique")

let savedUser = await UserModel.create(data);
return res.status(201).send({ status: true, data: savedUser });

        
    } catch (error) {
        return res.status(500).send(error.message)
        
    }



}

// title: 
//   name: {string, mandatory},
//   phone: {string, mandatory, unique},
//   email: {string, mandatory, valid email, unique}, 
//   password










module.exports.CreateUser=CreateUser