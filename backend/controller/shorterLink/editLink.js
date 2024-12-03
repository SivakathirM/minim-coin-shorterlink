const mysqlConnection = require("../../conig/sqlDb")

const editLink=async(req,res)=>{
    try {
        const {random,link,coin} =req.body
        
        await mysqlConnection.getConnection(async(err,connection)=>{
            if (err) throw err
            await connection.query("update shorterlinks set coin=? ,link=? where random=?",[coin,link,random],(err,rows)=>{
                connection.release();
                if (!err) {
                    res.status(200).json({
                        data:rows,
                        error:false,
                        success:true,
                        message:"Shorter Link Update successfully"
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

module.exports =editLink