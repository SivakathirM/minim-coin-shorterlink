const mysqlConnection = require("../../conig/sqlDb")

async function userDetailsController(req,res){
    try {
        await mysqlConnection.getConnection(async(err,connection)=>{
            if (err) throw err        
            
            await connection.query("SELECT * FROM users WHERE id =?",[req?.userId],(err,user)=>{
                if (!err) {
                    connection.release();
                    res.status(200).json({
                        data:user[0],
                        error:false,
                        success:true,
                        message:"User details"
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

module.exports=userDetailsController