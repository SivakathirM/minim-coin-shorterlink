const mysqlConnection = require("../../conig/sqlDb")
const bcrypt =require('bcryptjs')

async function userSignUpController(req,res) {
    try {
        const {email,phone,password,name,profilePic}=req.body

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }
        const salt = bcrypt.genSaltSync(10)
        const hashPassword=await bcrypt.hashSync(password,salt)

        if(!hashPassword){
            throw new Error("Something is wrong")
        }

        await mysqlConnection.getConnection((err,connection)=>{
            if (err) throw err

        connection.query("insert into users (name, email,phone, password, profilePic, role,coin) values (?,?,?,?,?,?,?)",[name,email,phone,hashPassword,profilePic,"GENERAL","10.00"],(err,rows) =>{
        connection.release();
        if (!err) {
            res.status(201).json({
                data:rows,
                success:true,
                error:false,
                message:"Account created successfully"
            })
        } else {
            res.json({
                message: err.message||err,
                error:true,
                success:false,
            })
        }  
        })
    })

    } catch (err) {
        res.json({
            message: err.message||err,
            error:true,
            success:false,
        })
    }
}

module.exports=userSignUpController