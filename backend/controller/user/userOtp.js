const mysqlConnection = require("../../conig/sqlDb")
const nodemailer=require("nodemailer")
require('dotenv').config()

async function userOtp(req,res,next){
    const {email} = req.body
    const characters ="0123456789";
    function randomString(length) {
        let randomeResult = " ";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
        randomeResult += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        }
        return randomeResult;
    }
    const otp = randomString(6)
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    });
    const option={
        from:'MininCoin@gmail.com',
        to:email,
        subject:'Mimin Coin',
        html:`Your otp is <b>${otp}</b>`
    }
    transporter.sendMail(option,function (error,info) {
        if(error){
            res.status(200).json({
                data:error,
                error:false,
                success:true,
                message:"error in userOtp"
            })
        }
    })
    try {
        await mysqlConnection.getConnection(async (err, connection) => {
            if (err) throw err;
            
            await connection.query("insert into otp (userEmail,otp) values (?,?)",[email,otp],(err, rows) => {
              connection.release();
              if (!err) {
                  res.status(200).json({
                    data:rows,
                    error:false,
                    success:true,
                    message:"OTP send your email account"
                })
                } else {
                  res.json({
                    message: err.message || err,
                    error: true,
                    success: false,
                  });
                }
            });
        });
    } catch (err) {
        res.json({
            message: err.message||err,
            error:true,
            success:false,
        })   
    }
}

module.exports=userOtp
