const mysqlConnection = require("../../conig/sqlDb")

const deleteLink=async(req,res)=>{
    try {
        const {random} =req.body
        
        await mysqlConnection.getConnection(async(err,connection)=>{
            if (err) throw err
            await connection.query("delete from shorterlinks where random=?",[random],(err,rows)=>{
                connection.release();
                if (!err) {
                    res.status(200).json({
                        data:rows,
                        error:false,
                        success:true,
                        message:"Shorter Link Delete Successfully"
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

module.exports =deleteLink