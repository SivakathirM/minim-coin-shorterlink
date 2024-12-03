const mysqlConnection = require("../../conig/sqlDb")

const walletTransper=async(req,res)=>{
    try {
        const userEmail = req.userEmail
        const userPhone=req.userPhone
        const {phone,coin} =req.body

        if(phone === userPhone){
            throw new Error("Same number not accept")
        }

        const coinNum=Number(coin)
        
        await mysqlConnection.getConnection(async(err,connection)=>{
            if (err) throw err        
            
            await connection.query("SELECT * FROM users WHERE phone = ?",[phone],(err,data)=>{
                
                if (data[0] && !err) {
                    connection.release();
                    let coins = data[0].coin + coinNum
                    mysqlConnection.getConnection(async(err,connection)=>{
                        if (err) throw err
                        await connection.query("update users set coin=? where phone=?",[coins,phone],(err,rows)=>{
                            connection.release();
                            if (!err) {
                            } else {
                                res.status(400).json({
                                    message:err.message || err,
                                    error:true,
                                    success:false
                                })
                            }  
                          })
                    })

                    mysqlConnection.getConnection(async(err,connection)=>{
                        if (err) throw err

                        await connection.query("update users set coin=coin-? where email=?",[coinNum,userEmail],(err,rows)=>{
                            connection.release();
                            if (!err) {
                                res.status(200).json({
                                    data:rows, 
                                    error:false,
                                    success:true,
                                    message:"Coin transfer successfully " + coin
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
                }else{
                    res.json({
                        message: "User not Found!",
                        error:true,
                        success:false,
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

module.exports =walletTransper