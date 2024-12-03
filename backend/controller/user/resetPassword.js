const bcrypt=require('bcryptjs')
const mysqlConnection = require("../../conig/sqlDb")
const jwt = require('jsonwebtoken');

const resetPassword=async(req,res)=>{
    try {
        const {password,id,token} =req.body
                
        await mysqlConnection.getConnection(async(err,connection)=>{
            if (err) throw err        
            
            const result= await connection.query("SELECT * FROM users WHERE id =?",[id],(err,user)=>{
                if (!err) {
                    connection.release();
                    setResult(user[0])
                }else{
                    console.log(err);
                }
                
            })
        })
        async function setResult(user) {
            try {
                const salt = bcrypt.genSaltSync(10)
                const hashPassword=await bcrypt.hashSync(password,salt)
                jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
                    if (err) {
                        throw new Error("This link was expired ")
                    }
                  });
                  await mysqlConnection.getConnection(async(err,connection)=>{
                    if (err) throw err        
                    
                     await connection.query("update users set password=? where id=?",[hashPassword,id],(err,user)=>{
                        if (!err) {
                            connection.release();
                            res.status(200).json({
                                data:user[0],
                                error:false,
                                success:true,
                                message:"Password was Chance Succefully"
                            })
                        }else{
                            console.log(err);
                        }
                        
                    })
                })  
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
            message:err?.message || err,
            error:true,
            success:false
        })
        
    }
}

module.exports =resetPassword