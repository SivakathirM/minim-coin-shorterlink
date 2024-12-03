const mysqlConnection = require("../../conig/sqlDb")

const paymentData=async(req,res)=>{
    try {
        const userEmail=req.userEmail
        const userPhone=req.userPhone
        const userName=req.userName

        const { order_id, payment_amount, payment_status, payment_currency,payment_gateway_details , payment_group, payment_time, payment_completion_time} =req.body
        const gateway_order_id=payment_gateway_details.gateway_order_id
        const gateway_payment_id=payment_gateway_details.gateway_payment_id
        
        await mysqlConnection.getConnection(async(err,connection)=>{
            if (err) throw err
            await connection.query("insert into payment (user_email, user_phone, user_name, order_id, payment_amount, payment_status, payment_currency, gateway_order_id, gateway_payment_id, payment_group, payment_time, payment_completion_time) values (?,?,?,?,?,?,?,?,?,?,?,?)",[userEmail, userPhone,userName,order_id, payment_amount, payment_status, payment_currency, gateway_order_id, gateway_payment_id, payment_group, payment_time, payment_completion_time],(err,rows)=>{
                connection.release();
                if (!err) {
                    res.status(200).json({
                        data:rows,
                        error:false,
                        success:true,
                        message:"payment data added successfully"
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

module.exports =paymentData
