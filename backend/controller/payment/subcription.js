const mysqlConnection = require("../../conig/sqlDb")

const subcription=async(req,res)=>{
    try {
        const userEmail=req.userEmail
        const {planCoin} =req.body
        
        await mysqlConnection.getConnection(async(err,connection)=>{
            if (err) throw err
            await connection.query("update users set coin=coin+? where email=?",[planCoin,userEmail],(err,rows)=>{
                connection.release();
                if (!err) {
                    res.status(200).json({
                        data:rows,
                        error:false,
                        success:true,
                        message:"subcription added successfully"
                    }) 
                } else {
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

module.exports =subcription