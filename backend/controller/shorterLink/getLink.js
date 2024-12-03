const mysqlConnection = require("../../conig/sqlDb")

const getLink=async(req,res)=>{
    try {
        const {random} =req.body
        
        await mysqlConnection.getConnection(async(err,connection)=>{
            if (err) throw err        
            
            await connection.query("SELECT * FROM shorterlinks WHERE random =?",[random],(err,link)=>{
                if (!err) {
                    connection.release();
                    res.status(200).json({
                        data:link[0],
                        error:false,
                        success:true,
                        message:"link Details"
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

module.exports =getLink