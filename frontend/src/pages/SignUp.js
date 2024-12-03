import React, { useEffect, useRef, useState } from "react";
import loginIcons from "../assest/user.png"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Icon from 'react-icons-kit';
import {arrows_exclamation} from 'react-icons-kit/linea/arrows_exclamation'
import {arrows_circle_check} from 'react-icons-kit/linea/arrows_circle_check'

const SignUp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [showPassword, setShowPassword] = useState(false);
  const [lowerValidated, setLowerValidated]=useState(false);
  const [upperValidated, setUpperValidated]=useState(false);
  const [numberValidated, setNumberValidated]=useState(false);
  const [specialValidated, setSpecialValidated]=useState(false);
  const [lengthValidated, setLengthValidated]=useState(false);
  const signUp=useRef()
  const otpBox=useRef()
  const otpBoxReference=useRef([])

  const [data, setData] = useState({
    email: "@gmail.com",
    phone:"",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const [otpData,setOtpData]=useState()
  const navigate=useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
  });

  if(name ==="password"){
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#\$%\^&\*])');
    const length = new RegExp('(?=.{8,})')
    if(lower.test(value)){
      setLowerValidated(true);
    }
    else{
      setLowerValidated(false);
    }
    if(upper.test(value)){
      setUpperValidated(true);
    }
    else{
      setUpperValidated(false);
    }
    if(number.test(value)){
      setNumberValidated(true);
    }
    else{
      setNumberValidated(false);
    }
    if(special.test(value)){
      setSpecialValidated(true);
    }
    else{
      setSpecialValidated(false);
    }
    if(length.test(value)){
      setLengthValidated(true);
    }
    else{
      setLengthValidated(false);
    }
  }
};

  const handleFirstFouces=()=> {
    otpBoxReference.current[0].focus()
  }

  const handleOtpChange=(value,index)=>{
    let newArr =[...otp]
    newArr[index]=value
    setOtp(newArr)
    
    if (value && index < 6-1) {
      otpBoxReference.current[index+1].focus()
    }
  }
  
  const handleBackspaceAndEnter=(e,index)=>{
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index-1].focus()
    }
    if (e.key === "Enter" && e.target.value && index < 6-1) {
      otpBoxReference.current[index-1].focus()
    }
  }

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);
    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(lowerValidated ===true && upperValidated  === true && numberValidated  === true && specialValidated  === true && lengthValidated === true){
      if(data.phone.length ===10){
        const dataResponse = await fetch(SummaryApi.userCheck.url, {
          method: SummaryApi.userCheck.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const dataApi = await dataResponse.json();
    
        if (dataApi.success) {
          handleOTP();
        }
        if(dataApi.user){
          toast.error(dataApi.message)
        }
        if (dataApi.error) {
          toast.error(dataApi.message);
        }        
      }else{
        toast.error("wrong number (10 digit)")
      }  
    }else{
      toast.error("Password must be fill in below colunms")
    }    
  };

  const handleOTP = async () => {
    const dataRespose = await fetch(SummaryApi.otp.url, {
      method: SummaryApi.otp.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataRespose.json();
    if(dataApi.success){
      toast.success(dataApi.message)
      signUp.current.className="hidden"
      otpBox.current.className="h-[93.5vh]"
      handleFirstFouces()
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.otpCheck.url, {
      method: SummaryApi.otpCheck.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email:data.email,
        otp:new Number(otp.toString().split(',').join(""))
      }),
    });
    const dataApi = await dataResponse.json();

    if (dataApi.message==='otpMatch') {
      handleAccount()
    }
    if(dataApi.message ==='otpNotMatch'){
      toast.error("otp not match")
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  const handleAccount = async () => {
    const dataRespose = await fetch(SummaryApi.signUP.url, {
      method: SummaryApi.signUP.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataRespose.json();
    if(dataApi.success){
      toast.success("Account Created Succedssfully");
      navigate("/login");
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }
  };

  return (
    <>
    <section id="signup" className="" ref={signUp}>
      <div className="max-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative  overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="Login icons" />
            </div>

            <form action="#">
              <label htmlFor="photo">
                <div className="text-xs bg-opacity-80 cursor-pointer bg-slate-200 pb-4 pt-2 text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  id="photo"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form
            action="#"
            className="pt-2 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div className="grid">
              <label htmlFor="">Name : </label>
              <div className="bg-slate-200 p-2">
                <input
                  type="text"
                  placeholder="enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="grid">
              <label htmlFor="">Email : </label>
              <div className="bg-slate-200 p-2">
                <input
                  type="email"
                  placeholder="enter your email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="grid">
              <label htmlFor="">Phone : </label>
              <div className="bg-slate-200 p-2">
                <input
                  type="number"
                  placeholder="enter your phone number"
                  name="phone"
                  value={data.phone}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full bg-transparent outline-none otpAppearance"
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Password : </label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full bg-transparent outline-none"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            {data.password !== '' && (
              <div className='tracker-box'>
                <div className={lowerValidated?'validated':'not-validated'}>
                  {lowerValidated?(
                    <span className='list-icon green'>
                      <Icon icon={arrows_circle_check}/>  
                    </span>
                  ):(
                    <span className='list-icon'>
                      <Icon icon={arrows_exclamation}/>  
                    </span>
                  )}
                  At least one lowercase letter
                </div>
                <div className={upperValidated?'validated':'not-validated'}>
                  {upperValidated?(
                    <span className='list-icon green'>
                      <Icon icon={arrows_circle_check}/>  
                    </span>
                  ):(
                    <span className='list-icon'>
                      <Icon icon={arrows_exclamation}/>  
                    </span>
                  )}
                  At least one uppercase letter
                </div>
                <div className={numberValidated?'validated':'not-validated'}>
              {numberValidated?(
                <span className='list-icon green'>
                  <Icon icon={arrows_circle_check}/>  
                </span>
                ):(
                  <span className='list-icon'>
                    <Icon icon={arrows_exclamation}/>  
                  </span>
                )}
                At least one number
                </div>
                <div className={specialValidated?'validated':'not-validated'}>
                {specialValidated?(
                  <span className='list-icon green'>
                    <Icon icon={arrows_circle_check}/>  
                  </span>
                ):(
                  <span className='list-icon'>
                    <Icon icon={arrows_exclamation}/>  
                  </span>
                )}
                At least one special character
                </div>
                <div className={lengthValidated?'validated':'not-validated'}>
                {lengthValidated?(
                  <span className='list-icon green'>
                    <Icon icon={arrows_circle_check}/>  
                  </span>
                ):(
                  <span className='list-icon'>
                    <Icon icon={arrows_exclamation}/>  
                  </span>
                )}
                At least 8 characters
                </div>
              </div>
            )}
            
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 hover:bg-orange-700 transition-all mx-auto block mt-6"
            >
              SignUp
            </button>
          </form>

          <p className="my-2">
            Already have account ?{" "}
            <Link
              to={"/login"}
              className="text-orange-600 hover:text-orange-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
    <section id="login" className="h-[93.5vh] hidden" ref={otpBox}>
      <div className="max-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="Login icons"/>
          </div>
          <h1 className="text-center text-3xl font-semibold text-black">OTP Verification</h1>
          <form
            action="#"
            className="pt-6 flex flex-col gap-2"
            onSubmit={handleOTPSubmit}
          >
            <div className="grid">
            <label htmlFor="">Enter your 6 - Digit Code : </label>
              <div className="flex items-center gap-4"> 
                {otp.map((digit,index)=>(
                  <input key={index} value={digit} maxLength={1} type="number" 
                  onChange={(e)=>handleOtpChange(e.target.value,index)}
                  onKeyUp={(e)=>handleBackspaceAndEnter(e,index)}
                  ref={(reference)=>(otpBoxReference.current[index]=reference)}
                  className="border w-8 md:w-10 h-auto otpAppearance text-white p-2 rounded-md block bg-black focus:outline-none"
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 hover:bg-orange-700 transition-all mx-auto block mt-6"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </section>
    </>
  );
};

export default SignUp;
