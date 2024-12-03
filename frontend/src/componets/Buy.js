import React from 'react'
import { useState } from "react";
import {load} from '@cashfreepayments/cashfree-js';
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Buy = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  console.log(user);
  const [planPrice,setPlanPrice]=useState(99.00)   
  const [planCoin,setPlanCoin]=useState(100.00)   
  let cashfree;

  let insitialzeSDK=async function () {
    cashfree=await load({
      mode:"sandbox",
    })
  }
  insitialzeSDK();

  const getSessionId=async()=>{
    try {
      const dataRespose = await fetch(SummaryApi.payment.url, {
        method: SummaryApi.payment.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({planPrice:planPrice}),
      });
      const res = await dataRespose.json();
      if (res.data && res.data.payment_session_id) {
        return res.data
      }
    } catch (error) {
      console.log(error);
    }
  }

  const verifyPayment=async(id)=>{
    try {
      const dataRespose = await fetch(SummaryApi.verify.url, {
        method: SummaryApi.verify.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({orderId:id}),
      });
      const res = await dataRespose.json();

      if (res && res.data) {
          console.log("payment verified", res.data);
          console.log("payment status", res.data.payment_status);
          if(res.data.payment_status ==="SUCCESS"){
            toast.success(`Payment ${res.data.payment_status}`)
            fetchSubcription(res.data);
          }else{
            toast.error(`Payment ${res.data.payment_status}`)
          }
      }
    } catch (error) {
     console.log(error);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault()
    if (user===null) {
      navigate("/login");
    } else {
      try {
        let data = await getSessionId();
        let checkoutOptions={
          paymentSessionId:data.payment_session_id,
          redirectTarget:"_modal",
        }
        cashfree.checkout(checkoutOptions).then((res)=>{
          verifyPayment(data.order_id);
        })
      } catch (error) {
        console.log(error);
      }
      
    }
  };

  const fetchSubcription=async(data)=>{
    const dataRespose = await fetch(SummaryApi.subcription.url, {
      method: SummaryApi.subcription.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({planCoin:planCoin}),
    });
    const response = await dataRespose.json();

    if (response.success) {
      toast.success(response.message)
      fetchPaymentData(data);
    }else{
      toast.error(response.message)
    }    
  }  
  const fetchPaymentData=async(data)=>{
    const dataRespose = await fetch(SummaryApi.paymentData.url, {
      method: SummaryApi.paymentData.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await dataRespose.json();

    if (response.success) {
      toast.success(response.message)
      navigate("/wallet");
      window.location.reload();
    }else{
      toast.error(response.message)
    }    
  }  
  const activiPlan =(value)=>{
    var plan1 = document.getElementById("activePlan1")
    var plan2 = document.getElementById("activePlan2")
    var plan3 = document.getElementById("activePlan3")
      
    if(value===1){
      setPlanPrice(99.00)
      setPlanCoin(100.00)
      if(plan1.classList.contains('activePlan')){
          plan1.classList.remove("activePlan","cursor-pointer")
          plan2.classList.add("activePlan2","activePlan","cursor-pointer");
          plan3.classList.add("activePlan3","activePlan","cursor-pointer");
      }
    }else if(value===2){
      setPlanPrice(499.00)
      setPlanCoin(550.00)
      if(plan2.classList.contains('activePlan2')){
        plan1.classList.add("activePlan","cursor-pointer")
        plan2.classList.remove("activePlan2","activePlan","cursor-pointer");
        plan3.classList.add("activePlan3","activePlan","cursor-pointer");
      }
    }else if(value===3){
      setPlanPrice(999.00)
      setPlanCoin(1100.00)
        if(plan3.classList.contains('activePlan3')){
          plan1.classList.add("activePlan","cursor-pointer")
          plan2.classList.add("activePlan2","activePlan","cursor-pointer");
          plan3.classList.remove("activePlan3","activePlan","cursor-pointer");
        }
      }
  }

  return (
    <div className="w-full h-[100vh] bg-slate-300">
      <h1 className="font-extrabold text-[30px] mb-4 text-center text-[#ffa600ee]">Coin Buy Plan</h1>  
      <div className="flex md:justify-center overflow-scroll scrollbar-none">
        <div className="max-sm:min-w-[80vw] md:w-[25vw] lg:w-[20vw] ml-4 my-4 bg-white h-[68vh] md:h-[60vh] rounded-md border border-black cursor-pointer" onClick={()=>activiPlan(1)} id="activePlan1" >
          <h1 className="w-[80%] -ml-5 text-center h-auto px-4 py-2 bg-[linear-gradient(45deg,#ffe01c,#f8a71b)] rounded-md rounded-r-full text-white mt-8">BASIC</h1>
          <h1 className="font-bold text-3xl ml-8 mt-1 mb-3 "><label className="font-medium text-lg text-slate-400">Price </label>{displayINRCurrency(99)}</h1>
          <ul className="buyPageUl">
            <li>Coin 100.00</li>
            <li>Validity Lifetime</li>
            <li>Share with Friends</li>
            <li>Wallet Access</li>
          </ul>
          {planPrice === 99.00 ?(

            <button className="w-[90%] mx-auto h-auto px-2 py-1 bg-[linear-gradient(45deg,#ffe01c,#f8a71b)] rounded-md block text-white mt-6" onClick={handleClick}>Process</button>
          ):(
            <button className="w-[90%] mx-auto h-auto px-2 py-1 bg-[linear-gradient(45deg,#ffe01c,#f8a71b)] rounded-md block text-white mt-6" >Process</button>
          ) }
        </div>
        <div className="activePlan2 activePlan max-sm:min-w-[80vw] md:w-[25vw] lg:w-[20vw] ml-6 my-4 bg-white h-[68vh] md:h-[60vh] rounded-md border border-black cursor-pointer" onClick={()=>activiPlan(2)} id="activePlan2">
          <h1 className="w-[80%] -ml-5 text-center h-auto px-4 py-2 bg-[linear-gradient(45deg,#bff524,#45ba45)] rounded-md rounded-r-full text-white mt-8">GOLD</h1>
          <h1 className="font-bold text-3xl ml-8 mt-1 mb-3"><label className="font-medium text-lg text-slate-400">Price </label>{displayINRCurrency(499)}</h1>
          <ul className="buyPageUl">
            <li>Coin 550.00</li>
            <li>Validity Lifetime</li>
            <li>Share with Friends</li>
            <li>Wallet Access</li>
          </ul>
          {planPrice === 499.00 ?(
            <button className="w-[90%] mx-auto h-auto px-2 py-1 bg-[linear-gradient(45deg,#bff524,#45ba45)] rounded-md block text-white mt-6" onClick={handleClick}>Process</button>
            ):(
            <button className="w-[90%] mx-auto h-auto px-2 py-1 bg-[linear-gradient(45deg,#bff524,#45ba45)] rounded-md block text-white mt-6" >Process</button>
          ) }
        </div>
        <div className="activePlan3 activePlan max-sm:min-w-[80vw] md:w-[25vw] lg:w-[20vw] mx-6 my-4 bg-white h-[68vh] md:h-[60vh] rounded-md border border-black cursor-pointer" onClick={()=>activiPlan(3)} id="activePlan3">
          <h1 className="w-[80%] -ml-5 text-center h-auto px-4 py-2 bg-[linear-gradient(45deg,#00cdf3,#0179e9)] rounded-md rounded-r-full text-white mt-8">PREMIUM</h1>
          <h1 className="font-bold text-3xl ml-8 mt-1 mb-3"><label className="font-medium text-lg text-slate-400">Price </label>{displayINRCurrency(999)}</h1>
          <ul className="buyPageUl">
            <li>Coin 1100.00</li>
            <li>Validity Lifetime</li>
            <li>Share with Friends</li>
            <li>Wallet Access</li>
          </ul>
          {planPrice === 999.00 ?(
            <button className="w-[90%] mx-auto h-auto px-2 py-1 bg-[linear-gradient(45deg,#00cdf3,#0179e9)] rounded-md block text-white mt-6" onClick={handleClick}>Process</button>
            ):(
            <button className="w-[90%] mx-auto h-auto px-2 py-1 bg-[linear-gradient(45deg,#00cdf3,#0179e9)] rounded-md block text-white mt-6">Process</button>
          ) }
        </div>
      </div>
    </div>
  )
}

export default Buy
