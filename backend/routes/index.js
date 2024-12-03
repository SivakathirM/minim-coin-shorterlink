const express = require("express")
const router=express.Router()

const userSignUpController=require("../controller/user/userSignUp")
const userSignInController=require("../controller/user/userSignin")
const userDetailsController = require("../controller/user/userDetails")
const userCheck = require("../controller/user/userCheck")
const authToken = require("../middleware/authToken")
const userLogout = require("../controller/user/userLogout")
const uploadLinkController = require("../controller/shorterLink/uploadLink")
const getLinkController = require("../controller/shorterLink/getLink")
const coinTransperController = require("../controller/shorterLink/coinTransper")
const pagination = require("../controller/dashboard/pagination")
const totalPage=require("../controller/dashboard/totalPage")
const allLinks = require("../controller/dashboard/allLinks")
const withdraw = require("../controller/withdraw/withdraw")
const history = require("../controller/withdraw/history")
const editLink = require("../controller/shorterLink/EditLink")
const deleteLink = require("../controller/shorterLink/deleteLink")
const walletTransper = require("../controller/shorterLink/walletTransper")
const payment = require("../controller/payment/payment")
const verify = require("../controller/payment/verify")
const subcription = require("../controller/payment/subcription")
const paymentData = require("../controller/payment/paymentData")
const userOtp = require("../controller/user/userOtp")
const otpCheck = require("../controller/user/otpCheck")
const requestPasswordReset = require("../controller/user/requestPasswordReset")
const resetPassword = require("../controller/user/resetPassword")

//User 
router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",authToken,userLogout)
router.post("/userOtp",userOtp)
router.post("/userCheck",userCheck)
router.post("/otpCheck",otpCheck)
router.post("/requestPasswordReset",requestPasswordReset)
router.post("/resetPassword",resetPassword)

//Link
router.post("/uploadShorterLink",authToken,uploadLinkController)
router.post("/getLink",getLinkController)
router.post("/coinTransper",authToken,coinTransperController)
router.post("/editLink",authToken,editLink)
router.post("/deleteLink",authToken,deleteLink)
router.post("/walletTransper",authToken,walletTransper)

//Admin
router.get("/pagination/:page",authToken,pagination)
router.get("/totalPage",authToken,totalPage)
router.get("/allLinks",authToken,allLinks)

//Withdraw
router.post("/withdraw",authToken,withdraw)
router.get("/history",authToken,history)

//Payment
router.post("/payment",authToken,payment);
router.post("/verify",authToken,verify)
router.post("/subcription",authToken,subcription)
router.post("/paymentData",authToken,paymentData)

module.exports=router