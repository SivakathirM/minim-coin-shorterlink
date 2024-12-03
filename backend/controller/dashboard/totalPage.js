const mysqlConnection = require("../../conig/sqlDb")

const totalPage=async(req,res)=>{
    try {
        // const {page,limit} =req.query

        const limit=10;
        const userEmail=req.userEmail 

        await mysqlConnection.getConnection(async(err,connection)=>{
            if (err) throw err       

            await connection.query('select count(*) as count from shorterlinks WHERE userEmail =?',[userEmail],(err,totalPageData)=>{
                if (!err) {
                    const totalPage=Math.ceil(+totalPageData[0]?.count/limit)
                    const count=totalPageData[0]?.count
                    res.status(200).json({
                        totalPage:totalPage,
                        count:count,
                        error:false,
                        success:true,
                        message:"Total Pages"
                    })
                }
            })
            
        })
        
        // const [totalPageData]=await mysqlConnection.query('select count(*) as count from shorterlinks')
    
    } catch (err) {
        res.json({
            message:err?.message || err,
            error:true,
            success:false
        })
        
    }
}

module.exports =totalPage
