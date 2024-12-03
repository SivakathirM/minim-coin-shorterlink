const mysql =require("mysql")

require('dotenv').config()

async function connectDB() {
    try {
        await mysql.createPool({
            host    :process.env.DB_HOST,
            user    :process.env.DB_USER,
            password:process.env.DB_PASS,
            database:process.env.DB_NAME
        })
        console.log("mysql server connected successfully");
        
        
    } catch (err) {
        console.log(err)
    }
}

module.exports= connectDB


