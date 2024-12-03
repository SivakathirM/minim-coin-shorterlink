const { Cashfree } = require("cashfree-pg");

async function verify(req,res){
    try {
        let {orderId}=req.body;
        
        Cashfree.PGOrderFetchPayments("2023-08-01",orderId).then((response)=>{
            res.json({
                data:response.data[0],
                error:false,
                success:true,
                message:"Order Verify successfully"
            })
        }).catch(err=>{
            res.json({
            message:err?.message || err,
            error:true,
            success:false
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

module.exports=verify
