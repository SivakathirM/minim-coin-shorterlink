const mysqlConnection = require("../../conig/sqlDb")
const jwt = require('jsonwebtoken');
const nodemailer=require("nodemailer")
require('dotenv').config()

const requestPasswordReset=async(req,res)=>{
    const {email} =req.body
    try {
        
        await mysqlConnection.getConnection(async(err,connection)=>{
            if (err) throw err        
            
            await connection.query("SELECT * FROM users WHERE email =?",[email],async(err,data)=>{
                
                console.log(data[0]);
                if (data[0]) {
                    connection.release();
                    const user=data[0]
                    const tokenData={
                        id:user.id,
                        email:user.email,
                    }
                    const token=await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h'});``
                    const resetURL=`${process.env.FRONTEND_URL}/reset-password?id=${user.id}&token=${token}`
                    const transporter = nodemailer.createTransport({
                        service:'gmail',
                        auth:{
                            user:process.env.EMAIL,
                            pass:process.env.PASSWORD
                        }
                    });
                    const option={
                        from:'MininCoin@gmail.com',
                        to:email,
                        subject:'\b[MinimCoin] Your password was reset\b',
                        text:`You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetURL}\n\n(This link expiresIn 1h) If you did not request this, please ignore this email and your password will remain unchanged.\n`
                    }
                    transporter.sendMail(option,function (error,info) {
                        if(error){
                            console.log(error,'error');
                        }else{
                            console.log('mail send',info);
                        }
                    })
                    res.status(200).json({
                        data:data[0],
                        error:false,
                        success:true,
                        message:"userFound"
                    })
                }else if(data){
                    res.status(200).json({
                        data:data[0],
                        error:false,
                        success:true,
                        message:"User not Exist"
                    })
                }else{
                    res.status(400).json({
                        message:err.message || err,
                        error:true,
                        success:false
                    })
                }
            })
        })
    } catch (err) {
        res.json({
            message:err?.message || err,
            error:true,
            success:false
        })
        
    }
}

module.exports =requestPasswordReset