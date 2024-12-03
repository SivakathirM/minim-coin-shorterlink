const bcrypt=require('bcryptjs')
const mysqlConnection = require("../../conig/sqlDb")
const jwt = require('jsonwebtoken');

async function userSignInController(req,res){
    try {
        const {email,password}=req.body
        
        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }

        await mysqlConnection.getConnection(async(err,connection)=>{
            if (err) throw err        
            
            const result= await connection.query("SELECT * FROM users WHERE email =?",[email],(err,rows)=>{
                if (!err) {
                    connection.release();
                    setResult(rows[0])
                }else{
                    res.status(200).json({
                        data:err,
                        error:false,
                        success:true,
                        message:"error in signin"
                    })
                }
                
            })
        })
        async function setResult(value) {
            let user;
            user=value
            try {
                if(!user){
                    throw new Error("User not defined Please create accout")
                    }
                    const checkPassword=await bcrypt.compare(password,user.password)
                    if(checkPassword){
                        const tokenData={
                            _id:user.id,
                            email:user.email,
                            phone:user.phone,
                            name:user.name,
                        }
                        const token=await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '7d'});
                        
                        const tokenOption={
                            httpOnly:true,
                            secure:true,
                            sameSite:'None'
                        }
                
                        res.cookie("token",token,tokenOption).status(200).json({
                            message:"Login Successfully",
                            data:token,
                            success:true,
                            error:false
                        })
                        }else{
                            throw new Error("Email or Password incorrect")
                        }
                    
        } catch (err) {
            res.json({
                message: err.message||err,
                error:true,
                success:false,
            })   
        }
    }
    
    } catch (err) {
        res.json({
            message: err.message||err,
            error:true,
            success:false,
        })   
    }
}

module.exports=userSignInController
