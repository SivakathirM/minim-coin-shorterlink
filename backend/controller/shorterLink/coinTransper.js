const mysqlConnection = require("../../conig/sqlDb")

const coinTransper=async(req,res)=>{
    try {
        const {userEmail,userCoin,adminCoin,adminEmail,random} =req.body
        if(userEmail !==adminEmail){
            await mysqlConnection.getConnection(async(err,connection)=>{
                if (err) throw err        
                
                await connection.query("SELECT * FROM users WHERE email =?",[adminEmail],(err,adminData)=>{
                    if (!err) {
                        connection.release();
                        let coin = adminData[0].coin + adminCoin
    
                        mysqlConnection.getConnection(async(err,connection)=>{
                            if (err) throw err
                            await connection.query("update users set coin=? where email=?",[coin,adminEmail],(err,rows)=>{
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
                              mysqlConnection.getConnection(async(err,connection)=>{
                                  if (err) throw err
                                  let coin=userCoin - adminCoin;
                                  ("coins",coin);
          
                                  await connection.query("update users set coin=? where email=?",[coin,userEmail],(err,rows)=>{
                                      connection.release();
                                      if (!err) {
                                          res.status(200).json({
                                              data:rows,
                                              error:false,
                                              success:true,
                                              message:"Shorterlink was unlocked successfully"
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
                        })
    
    
                        mysqlConnection.getConnection(async(err,connection)=>{
                            if (err) throw err        
                            
                            await connection.query("update shorterlinks set view=view + 1 where random=?",[random],(err,link)=>{
                                if (!err) {
                                    connection.release();
                        
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
                        res.status(400).json({
                            message:err.message || err,
                            error:true,
                            success:false
                        })
                    }
                })
                
            })
        }else{
            res.status(200).json({
                data:"Same User",
                error:false,
                success:true,
                message:"Shorterlink was unlocked successfully"
            })   
        }
        
    } catch (err) {
        res.json({
            message:err?.message || err,
            error:true,
            success:false
        })
        
    }
}

module.exports =coinTransper