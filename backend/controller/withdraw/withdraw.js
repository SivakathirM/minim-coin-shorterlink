const mysqlConnection = require("../../conig/sqlDb");

async function withdraw(req, res) {
  try {
    const userEmail = req.userEmail;
    const { withdrawMethod,withdrawAmount,paymentName,upiId, phoneNumber,upiUserName,cardNumber,cardUserName,expireDate,cvc,accountNumber,accountName,ifsc,cif,micr,paymentNameWallet,walletNumber,walletName} = req.body;

    await mysqlConnection.getConnection(async (err, connection) => {
        if (err) throw err;
        if(withdrawMethod ==='upi'){
          await connection.query("insert into withdraw (payment_method,user_email,withdraw_amount,upi_payment_name, upi_id,upi_phone_number,upi_user_name,card_number,card_user_name,card_expire_date,card_cvc,bank_account_number,bank_account_name,bank_ifsc,bank_cif,bank_micr,wallet_payment_name,wallet_number,wallet_name) values (?,?,?,?,?,?,?,0,0,0,0,0,0,0,0,0,0,0,0)",[withdrawMethod,userEmail, withdrawAmount, paymentName, upiId,phoneNumber,upiUserName],(err, rows) => {
            if (!err) {
              connection.release();
              mysqlConnection.getConnection(async(err,connection)=>{
                if (err) throw err
                await connection.query("update users set coin=coin - ? where email=?",[withdrawAmount,userEmail],(err,rows)=>{
                    connection.release();
                    if (!err) {
                        res.status(200).json({
                          data:rows,
                          error:false,
                          success:true,
                          message:"Withdraw Process is Added Successfully"
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
            } else {
              res.json({
                message: err.message || err,
                error: true,
                success: false,
              });
            }
          });
           
        }else if(withdrawMethod ==='card'){
            await connection.query("insert into withdraw (payment_method,user_email,withdraw_amount,card_number,card_user_name,card_expire_date,card_cvc,upi_payment_name,upi_id,upi_phone_number,upi_user_name,bank_account_number,bank_account_name,bank_ifsc,bank_cif,bank_micr,wallet_payment_name,wallet_number,wallet_name) values (?,?,?,?,?,?,?,0,0,0,0,0,0,0,0,0,0,0,0)",[withdrawMethod,userEmail, withdrawAmount,cardNumber,cardUserName, expireDate, cvc],(err, rows) => {
                if (!err) {
                  connection.release();
                  mysqlConnection.getConnection(async(err,connection)=>{
                    if (err) throw err
                    await connection.query("update users set coin=coin - ? where email=?",[withdrawAmount,userEmail],(err,rows)=>{
                        connection.release();
                        if (!err) {
                            res.status(200).json({
                              data:rows,
                              error:false,
                              success:true,
                              message:"Withdraw Process is Added Successfully"
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
                } else {
                    res.json({
                      message: err.message || err,
                      error: true,
                      success: false,
                    });
                  }
                });
        }else if(withdrawMethod ==='bank'){
            await connection.query("insert into withdraw (payment_method,user_email,withdraw_amount,bank_account_number,bank_account_name,bank_ifsc,bank_cif,bank_micr,upi_payment_name, upi_id,upi_phone_number,upi_user_name,card_number,card_user_name,card_expire_date,card_cvc,wallet_payment_name,wallet_number,wallet_name) values (?,?,?,?,?,?,?,?,0,0,0,0,0,0,0,0,0,0,0)",[withdrawMethod,userEmail, withdrawAmount,accountNumber,accountName, ifsc, cif, micr],(err, rows) => {
                if (!err) {
                  connection.release();
                  mysqlConnection.getConnection(async(err,connection)=>{
                    if (err) throw err
                    await connection.query("update users set coin=coin - ? where email=?",[withdrawAmount,userEmail],(err,rows)=>{
                        connection.release();
                        if (!err) {
                            res.status(200).json({
                              data:rows,
                              error:false,
                              success:true,
                              message:"Withdraw Process is Added Successfully"
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
                } else {
                    res.json({
                      message: err.message || err,
                      error: true,
                      success: false,
                    });
                  }
                });
        }else if(withdrawMethod ==='wallet'){
            await connection.query("insert into withdraw (payment_method,user_email,withdraw_amount,wallet_payment_name,wallet_number,wallet_name,upi_payment_name, upi_id,upi_phone_number,upi_user_name,card_number,card_user_name,card_expire_date,card_cvc,bank_account_number,bank_account_name,bank_ifsc,bank_cif,bank_micr) values (?,?,?,?,?,?,0,0,0,0,0,0,0,0,0,0,0,0,0)",[withdrawMethod,userEmail, withdrawAmount,paymentNameWallet,walletNumber, walletName],(err, rows) => {
                if (!err) {
                  connection.release();
                  mysqlConnection.getConnection(async(err,connection)=>{
                    if (err) throw err
                    await connection.query("update users set coin=coin - ? where email=?",[withdrawAmount,userEmail],(err,rows)=>{
                        connection.release();
                        if (!err) {
                            res.status(200).json({
                              data:rows,
                              error:false,
                              success:true,
                              message:"Withdraw Process is Added Successfully"
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
                } else {
                    res.json({
                      message: err.message || err,
                      error: true,
                      success: false,
                    });
                  }
                });
        }
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = withdraw;
