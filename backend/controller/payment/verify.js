const { Cashfree } = require("cashfree-pg");

async function verify(req,res){
    try {
        let {orderId}=req.body;
        console.log("order id",orderId);
        
        Cashfree.PGOrderFetchPayments("2023-08-01",orderId).then((response)=>{
            console.log('verify data',response.data[0]);
            
            res.json({
                data:response.data[0],
                error:false,
                success:true,
                message:"Order Verify successfully"
            })
        }).catch(error=>{
            console.log("error verify",error.response.data.message);
            
        })
    } catch (error) {
        console.log("error verify",error);
        
    }
}

module.exports=verify