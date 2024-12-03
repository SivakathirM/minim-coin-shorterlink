const mysqlConnection = require("../../conig/sqlDb");

async function uploadLinkController(req, res) {
  try {
    const userEmail = req.userEmail || "admin@gmail.com";
    const { userName,link, coin,random} = req.body;

    if (!link) {
      throw new Error("Please provide link");
    }
    if (!coin) {
      throw new Error("Please provide coin");
    }
    await mysqlConnection.getConnection(async (err, connection) => {
        if (err) throw err;
        
        await connection.query("insert into shorterlinks (userName,userEmail,link, coin,random,view) values (?,?,?,?,?,?)",[userName,userEmail, link, coin, random,0],(err, rows) => {
          connection.release();
          if (!err) {
              res.status(200).json({
                data:rows,
                error:false,
                success:true,
                message:"ShorterLink is Created Successfully"
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
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = uploadLinkController;
