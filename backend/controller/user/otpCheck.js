const mysqlConnection = require("../../conig/sqlDb")
const moment = require("moment")

const otpCheck=async(req,res)=>{
    try {
        const {email,otp} =req.body
        
        await mysqlConnection.getConnection(async(err,connection)=>{
            if (err) throw err        
            
            await connection.query("SELECT * FROM otp WHERE userEmail =?",[email],(err,data)=>{
                
                if (!err) {
                    connection.release();
                    const length=data.length - 1
                    
                    if (data[length].otp === otp) {
                        res.status(200).json({
                            data:data[0],
                            error:false,
                            success:true,
                            message:"otpMatch"
                        })
                    } else {
                        res.status(200).json({
                            data:data[0],
                            error:false,
                            success:true,
                            message:"otpNotMatch"
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

module.exports =otpCheck