const mysqlConnection = require("../../conig/sqlDb")

const pagination=async(req,res)=>{
    try {
        const page=req.params.page 
        const userEmail=req.userEmail
        const limit=10;
        const offset=(page-1)* limit

        await mysqlConnection.getConnection(async(err,connection)=>{
            if (err) throw err        
            
            await connection.query("select * from shorterlinks WHERE userEmail =? limit ? offset ?",[userEmail,limit,offset],(err,data)=>{
                if (!err) {
                    connection.release();
                    res.status(200).json({
                        data:data,
                        error:false,
                        success:true,
                        message:"Pagination"
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

module.exports =pagination