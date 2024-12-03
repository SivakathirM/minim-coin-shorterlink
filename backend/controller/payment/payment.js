const crypto = require("crypto");
const { Cashfree } = require("cashfree-pg");

async function payment(req,res){
    const {planPrice} =req.body
    const userId=req.userId.toString();
    const userEmail=req.userEmail
    const userPhone=req.userPhone
    const userName=req.userName
    
    function generateOrderId() {
        const uniqueId=crypto.randomBytes(16).toString('hex')
    
        const hash=crypto.createHash('sha256')
        hash.update(uniqueId);
    
        const orderId=hash.digest('hex');
    
        return orderId.substr(0,12);
    }
    
    try {
        let request={
            "order_amount":planPrice,
            "order_currency":"INR",
            "order_id":await generateOrderId(),
            "customer_details":{
                "customer_id":userId,
                "customer_phone":userPhone,
                "customer_name":userName,
                "customer_email":userEmail,
            },
        }
        Cashfree.PGCreateOrder("2023-08-01",request).then(response=>{
            res.json({
                data:response.data,
                error:false,
                success:true,
                message:"payment"
            })
        }).catch(error=>{
            console.error(error.response.data.message)
        })
    } catch (err) {
        res.json({
            message:err?.message || err,
            error:true,
            success:false
        })
    }
}

module.exports=payment
