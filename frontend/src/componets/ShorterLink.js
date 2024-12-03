import React, { useRef, useState } from "react";
import coinCategory from "../helpers/coinCategory";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa6";
import displayINRCurrency from "../helpers/displayCurrency";
import { useSelector } from "react-redux";
import {FacebookShareButton,TelegramShareButton,TwitterShareButton,WhatsappShareButton,} from"react-share";
import {FacebookIcon,TelegramIcon, TwitterIcon,WhatsappIcon} from "react-share";
import QRCode from 'react-qr-code'

const Shorterlink = () => {
  const navigate = useNavigate();
  const [shareBtn,setShareBtn]=useState(false)
  const [qrBtn,setQrBtn]=useState(false)
  const formElement1 = useRef();
  const formElement2 = useRef();
  const frontendUrl=process.env.REACT_APP_FRONTEND_URL
  const user = useSelector((state) => state?.user?.user) || '';
  
  const [data, setData] = useState({
    userName:'admin',
    userEmail: "",
    link: "",
    coin: "0.15",
    random: "",
  });

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault()
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(data.link.substring(0,21) !== frontendUrl){
      data.userName=user.name
      data.random = randomString(8).trim();
      const dataRespose = await fetch(SummaryApi.uploadShorterLink.url, {
        method: SummaryApi.uploadShorterLink.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataRespose.json();
      if (dataApi.success) {
        toast.success(dataApi.message);
        formElement1.current.className="hidden"
        formElement2.current.className="relative mt-12 md:mt-[81px] md:mr-[122px]"

        const frontendUrl=process.env.REACT_APP_FRONTEND_URL
        data.link= `${frontendUrl}/shorter/${data.random}`
        navigate("/");

      }
      if (dataApi.error) {
        if (dataApi.message === "User not login") {
          navigate("/login");
        } else {
          toast.error(dataApi.message);
        }
      }
    }else{
      toast.error("same link not accepted")
    }  
  };
 
  const copyShorterLink=()=>{
    navigator.clipboard.writeText(data.link) 
    toast.success("Shorterlink Copy Successfully")
    navigate("/");
  }

  const handleShare=()=>{
    if (shareBtn ) {
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
    <div className="h-[52vh] md:h-[320px] w-full bg-[#73787F] flex justify-center">
      {/* upolad link */}
      <div className="mt-12 md:mt-20" ref={formElement1}>
        <form
          action="#"
          className="pt-6 flex flex-col gap-2 max-sm:ml-3"
          onSubmit={handleSubmit}
        >
          <div className="my-auto ml-2.5">
            <div className="inline-block">
            <input
              type="url"
              placeholder="Enter link only and Past"
              className="relative p-2 md:p-4 top-0.5 h-10 md:h-14 w-[300px] md:w-[400px] lg:w-[600px] text-[15px] md:text-[20px] rounded-tl-md focus:border-none focus:outline-none pr-2"
              name="link"
              value={data.link}
              onChange={handleOnChange}
              
            />
              <select
                value={data.category}
                name="coin"
                onChange={handleOnChange}
                className="h-10 md:h-14 w-20 md:w-35 text-lg "
                required
              >
                <option value="0.15">{displayINRCurrency(0.15)}</option>
                {coinCategory.map((el, index) => {
                  return (
                    <option value={el.value} key={el.value + index}>
                      {displayINRCurrency(el.label)}
                    </option>
                  );
                })}
              </select>
              <button className="h-10 md:h-14 w-20 md:w-40 text-lg rounded-r-md text-white bg-orange-600 border-b border-red-400 hover:bg-orange-700 ">
                Shorter
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* shorter link */}
      <div className="hidden relative mt-12 md:mt-[81px] md:mr-[122px]" ref={formElement2}>
        <form
          action="#"
          className="pt-[26px] flex flex-col gap-2 max-sm:ml-3"
          onSubmit={handleOnChange}
        >
          <div className="relative my-auto ml-2.5">
            <input
              type="text"
              placeholder="Enter link and Past"
              className="h-10 p-2 md:p-4 md:h-14 w-[300px] md:w-[439px] lg:w-[665px] text-[15px] md:text-[20px]  focus:border-none focus:outline-none pr-2"
              name="link"
              value={data.link}
              onChange={handleOnChange}
              readOnly
            />
            <div className="inline-block relative md:-top-0.5">
              <select
                value={data.category}
                name="coin"
                onChange={handleOnChange}
                className="h-8 md:h-14 w-[50px] md:w-35 text-lg appearance-none"
                required
              >
                <option value={data.coin}>{displayINRCurrency(data.coin)}</option>
              </select>

              <button className="h-8 md:h-14 w-[50px] md:w-40 text-[10px] absolute top-0 md:text-lg md:rounded-r-md text-white bg-orange-600 border border-red-400 hover:bg-orange-700" onClick={copyShorterLink}>
                Copy
              <FaRegCopy className="hidden md:block md:h-5 md:w-8 text-md cursor-pointer rounded-r-md absolute left-[104px] top-5" />
              </button>
              
            </div>
            <div className="absolute top-11 right-[28px] md:relative md:top-0 md:right-0.5 -mt-1 md:-mt-0.5">
              <Link to={"/shorter/" +data.random} ><button className="h-8 md:h-14 w-12 md:w-40 ml-0.5 text-[10px] md:text-lg text-white bg-orange-600 border border-red-400 hover:bg-orange-700">Open</button></Link>
              <button className="h-8 md:h-14 w-12 md:w-40 ml-0.5 text-[10px] md:text-lg text-white bg-orange-600 border border-red-400 hover:bg-orange-700" onClick={handleShare}>Share</button>
              <button className="h-8 md:h-14 w-12 md:w-40 ml-0.5 text-[10px] md:text-lg text-white bg-orange-600 border border-red-400 hover:bg-orange-700" onClick={handleQRCode}>QR Code</button>
              <button className="h-8 md:h-14 w-12 md:w-40 ml-0.5 text-[10px] md:text-lg text-white bg-orange-600 border border-red-400 hover:bg-orange-700" onClick={()=>{window.location.reload()}}>Another</button>
            </div>
          </div>
        </form>
        {/* share buttons */}
        {shareBtn && (
          <div className="w-2/4 md:w-1/4 absolute left-28 md:left-[170px] h-auto border border-black">
            <FacebookShareButton className="flex flex-row gap-4 m-1" url={data.link}>
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
          <div className="w-1/4 md:w-1/4 absolute left-[196px] md:left-[332px] h-[37%] md:h-2/4 border border-black">
            <div className="bg-white">
              <QRCode
                size={150}
                bgColor="white"
                fgColor="black"
                className="w-20 max-sm:h-auto md:w-[100%] max-w-[100%] p-1 md:p-[10px]"
                value={data.link}
              />
            </div>
          </div>
          )
        }
      </div>
    </div>
  );
};
export default Shorterlink;
