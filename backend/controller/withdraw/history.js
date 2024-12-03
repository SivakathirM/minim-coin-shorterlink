const mysqlConnection = require("../../conig/sqlDb")

async function history(req,res){
    try {

        await mysqlConnection.getConnection(async(err,connection)=>{
            if (err) throw err        
            
            await connection.query("SELECT * FROM withdraw WHERE user_email =?",[req.userEmail],(err,data)=>{
                if (!err) {
                    connection.release();
                    res.status(200).json({
                        data:data,
                        error:false,
                        success:true,
                        message:"History"
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
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports =history