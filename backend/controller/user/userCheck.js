const mysqlConnection = require("../../conig/sqlDb")

const userCheck=async(req,res)=>{
    try {
        const {email,phone} =req.body
        
        await mysqlConnection.getConnection(async(err,connection)=>{
            if (err) throw err        
            
            await connection.query("SELECT * FROM users WHERE email =?",[email],(err,user)=>{
                if (!err) {
                    connection.release();
                    if (user[0]) {
                        res.status(200).json({message:"Already user exists",user:true})
                    } else if(user){
                        mysqlConnection.getConnection(async(err,connection)=>{
                            if (err) throw err        
                            
                            await connection.query("SELECT * FROM users WHERE phone =?",[phone],(err,user)=>{
                                if (!err) {
                                    connection.release();
                                    if (user[0]) {
                                        res.status(200).json({message:"Already phone exists",user:true})
                                    } else if(user){
                                        res.status(200).json({success:true,message:"user not found it"})
                                    }
                                }else{
                                    res.status(400).json({
                                        message:err.message || err,
                                        error:true,
                                        success:false
                                    })
                                }
                            })
                        })
                    }
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

module.exports =userCheck