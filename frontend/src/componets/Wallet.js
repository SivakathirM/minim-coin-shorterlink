import React, { useState } from 'react'
import displayINRCurrency from "../helpers/displayCurrency"
import { useSelector } from "react-redux";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";

const Wallet = () => {
  const user = useSelector((state) => state?.user?.user);
  
  const [data,setData]=useState({
      phone:'',
      coin:''
  })

  const handleOnChange = (e) => {
      const { name, value } = e.target;
      setData((preve) => {
          return {
          ...preve,
          [name]: value,
          };
      });
  };

  const fetchWalletTransper=async(e)=>{
    e.preventDefault();
    const response=await fetch(SummaryApi.walletTransper.url,{
      method:SummaryApi.walletTransper.method,
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    })
    const responseData=await response.json()
    if (responseData.success) {
      toast.success(responseData?.message);
      window.location.reload();
    }
    if (responseData.error) {
      toast.error(responseData?.message)
    }
  }
  const withdrawCheck=(value)=>{
    var coin=user?.coin || ' '
    if (value<=coin) {
        return value
    }else{
        toast.error("Your are type wrong Number Pleace check!")
        setData({
          phone:data.phone,
          coin:''
        })
    }
  }  

  return (
    <div className='h-[100vh] w-full'>
        <div className='w-12/12 md:w-5/12 h-full bg-white mx-auto'>
            <div className='flex justify-between font-semibold px-1 py-2 border-b-2 border-violet-800 bg-violet-800 text-white'>
            <h6 className='max-sm:text-sm'>Payment Wallet</h6>  
            <h6 className='max-sm:text-sm'>Balance : {user?.coin && (displayINRCurrency(user?.coin))}</h6>  
            </div>
            <div className='mx-1 mt-3'>  
                <form action='#' onSubmit={fetchWalletTransper}> 
                    <h4 className='text-center mx-auto w-[40%] h-[10%] text-2xl md:text-3xl font-semibold'>Wallet</h4>
                    <label htmlFor="phone" className='block mt-1'>Enter Phone Number : </label>
                    <input
                        type="number"
                        placeholder="Ex:63790101010"
                        className="h-7 md:h-8 w-[90%] mx-auto otpAppearance text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                        name="phone"
                        value={data.phone}   
                        onChange={handleOnChange}
                        id='phone'
                        required
                    />
                    <label htmlFor="coin" className='block mt-1'>Enter coin : </label>
                    <input
                        type="number"
                        placeholder="Ex : 1.25"
                        className="h-7 md:h-8 w-[90%] mx-auto otpAppearance text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                        name="coin"
                        value={withdrawCheck(data.coin)}
                        onChange={handleOnChange}
                        id='coin'
                        required
                    />
                    <button className='w-[80%] mx-auto block h-8 mt-4 mb-2 rounded-md bg-orange-500 text-white'>Process</button>
                    <div className='bg-white w-full h-1'></div>
                </form>
            </div>
      </div>

    </div>
  )
}

export default Wallet
