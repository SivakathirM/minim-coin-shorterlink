import React, { useEffect, useRef,useState } from 'react'
import { useParams} from 'react-router-dom'
import SummaryApi from '../common'
import displayINRCurrency from "../helpers/displayCurrency"
import { useSelector } from "react-redux";
import moment from 'moment'
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {FacebookShareButton,TelegramShareButton,TwitterShareButton,WhatsappShareButton,} from"react-share";
import {FacebookIcon,TelegramIcon, TwitterIcon,WhatsappIcon} from "react-share";
import QRCode from 'react-qr-code'

const ShorterlinkBuyPage =  () => {
  const [data,setData]=useState({})
  const [pay,setPay]=useState(false)
  const [qrBtn,setQrBtn]=useState(false)
  const [shareBtn,setShareBtn]=useState(false)
  const params= useParams()
  const navigate = useNavigate();
  const formElement1 = useRef();
  const formElement2 = useRef();
  const user = useSelector((state) => state?.user?.user); 
  const fetchShorterLink=async()=>{
    const response= await fetch(SummaryApi.getShorterLink.url,{
      method:SummaryApi.getShorterLink.method,
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        random:params?.id
      })
    })
    const dataResponse=await response.json()
    setData(dataResponse.data)
  }  

  const fetchCoinTransper=async()=>{
    if (data.coin <= user.coin) {
      const response=await fetch(SummaryApi.coinTransper.url,{
        method:SummaryApi.coinTransper.method,
        credentials:'include',
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          adminEmail:data.userEmail,
          adminCoin:data.coin,
          userEmail:user.email,
          userCoin:user.coin,
          random:params?.id
        })
      })
      const responseData=await response.json()
      if (responseData.success) {
        toast.success(responseData?.message);
        formElement1.current.className="hidden"
        formElement2.current.className="relative"
        setPay(true)
      }
      if (responseData.error) {
        toast.error(responseData?.message)
      }
    }else{
      toast.error("your coin below to buy this link buy more coin")
    }
  }
  
  useEffect(()=>{
    fetchShorterLink()
  },[params])

  const copyShorterLink=()=>{
    navigator.clipboard.writeText(data.link)
    toast.success("Shorterlink Copy Successfully")
  }

  const handleShare=()=>{
    if (shareBtn) {
      setShareBtn(false)
    } else {
      setShareBtn(true)
    }
  }

  const handleQRCode=()=>{
    if (qrBtn) {
      setQrBtn(false)
    } else {
      setQrBtn(true)
    }
  }

  return (
    <div className='container w-full md:w-6/12 lg:w-5/12 h-[93.5vh] mx-auto bg-white' >
      <div className='flex-col'>
      <div className='flex justify-between font-semibold px-1 py-2 border-b-2 border-violet-800 bg-violet-800 text-white'>
            <h6 className='max-sm:text-sm'>Payment Wallet</h6>  
            <h6 className='max-sm:text-sm'>Balance : {user?.coin && (displayINRCurrency(user?.coin))}</h6>  
            </div>
        <div className='flex justify-between text-lg font-semibold'>
          <p className='text-sm md:font-medium'>Admin : {data?.userEmail && data?.userEmail.slice(0,6) + '*****'}</p>
          <p className='text-sm md:font-medium'>Name : {data?.userName}</p>
        </div>
        <div className='' ref={formElement1}>
          <div className='text-center font-medium mt-12 md:mt-28'>
            <p className='text-[25px]'>Price :{displayINRCurrency(data.coin)} coin</p>
          </div>
          <div className='flex items-center justify-center gap-3 my-2' >
            <button className='border-2 border-orange-500 rounded px-3 py-1 min-w-[120px] text-white bg-orange-600 font-medium hover:bg-white hover:text-orange-600' onClick={fetchCoinTransper}>Unlock Link</button>
            <Link to={"/buy"} className='text-center border-2 border-orange-500 rounded px-3 py-1 min-w-[120px] text-orange-600 font-medium hover:bg-orange-600 hover:text-white'>Buy Coin</Link>
          </div>
          <div className=' mt-5 text-center'>
            <p className='font-medium'><span className='text-red-600'>*</span>If you are unlock the link ,first you buy the coin then unlock the link.Below the buy button click to buy coin's.</p>
          </div>
        </div>
        <div className="hidden relative" ref={formElement2}>
          <div className="pt-6 flex flex-col gap-2">
            <div className="relative my-auto ml-2.5">
              <textarea
                type="text"
                placeholder="Enter link and Past"
                className="scrollbar-none h-24 w-[330px] md:w-[365px] lg:w-[505px] text-[15px] md:text-[20px] border border-black focus:outline-none px-2"
                name="link"
                value={data.link}
                readOnly
              />
              <div className="flex flex-row lg:relative">
                <button className="h-8 md:h-14 w-full md:w-[90px] lg:w-[151px] text-[10px] md:text-lg text-white bg-orange-600 border border-red-400 hover:bg-orange-700" onClick={copyShorterLink}>Copy</button>
                <a href={data.link} target='_blank' className='block text-center p-[7px] md:p-3 md:h-14 w-full md:w-[90px] lg:w-[151px] ml-0.5 text-[10px] md:text-lg text-white bg-orange-600 border border-red-400 hover:bg-orange-700'>Open</a>  
                <button className="h-8 md:h-14 w-full md:w-[90px] lg:w-[151px] ml-0.5 text-[10px] md:text-lg text-white bg-orange-600 border border-red-400 hover:bg-orange-700" onClick={handleShare}>Share</button>
                <button className="h-8 md:h-14 w-full md:w-[90px] lg:w-[151px] ml-0.5 text-[10px] md:text-lg text-white bg-orange-600 border border-red-400 hover:bg-orange-700 mr-[10px] md:mr-2 lg:mr-3" onClick={handleQRCode}>QR Code</button>
              </div>
            </div>
          </div>
          {/* share buttons */}
          {shareBtn && (
            <div className="w-3/6 lg:w-1/4 absolute left-32 md:left-36 lg:left-[280px] h-auto border border-black">
              <FacebookShareButton className="flex flex-row  gap-4 m-1" url={data.link}>
                <FacebookIcon id="face" size={32} round={true}/>
                <label htmlFor="face" className="cursor-pointer">Facebook</label>
              </FacebookShareButton>
              <TelegramShareButton className="flex flex-row  gap-4 m-1" url={data.link}>
                <TelegramIcon id="tele" size={32} round={true}/>
                <label htmlFor="tele" className="cursor-pointer">Telegram</label>
              </TelegramShareButton>
              <TwitterShareButton className="flex flex-row  gap-4 m-1" url={data.link}>
                <TwitterIcon id="twitt" size={32} round={true}/>
                <label htmlFor="twitt" className="cursor-pointer">Twitter</label>
              </TwitterShareButton>
              <WhatsappShareButton className="flex flex-row  gap-4 m-1" url={data.link}>
                <WhatsappIcon id="what" size={32} round={true}/>
                <label htmlFor="what" className="cursor-pointer">Whatsapp</label>
              </WhatsappShareButton>
            </div>
            )
          }
          {/*QR Code Button */}
          {qrBtn && (
            <div className="w-1/4 md:w-1/4 absolute left-[252px] md:left-72 lg:left-[400px] lg:h-auto border border-black">
              <div className="bg-white">
                <QRCode
                  size={150}
                  bgColor="white"
                  fgColor="black"
                  className="max-xl:h-auto w-[100%] max-w-[100%] p-1 md:p-[10px]"
                  value={data.link}
                />
              </div>
            </div>
            )
          }
        </div>
        <div className='absolute bottom-0 bg-violet-800 text-white w-[100vw] md:w-[41.1vw]'>
          <p className='font-semibold text-[10px] md:text-sm px-1 py-2 '>Upload Date : {moment(data?.timestamps).format('LLLL')}</p>
        </div>
      </div>
    </div>
  ) 
}

export default ShorterlinkBuyPage
