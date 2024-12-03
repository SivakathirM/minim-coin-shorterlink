import React, { useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Icon from 'react-icons-kit';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {arrows_exclamation} from 'react-icons-kit/linea/arrows_exclamation'
import {arrows_circle_check} from 'react-icons-kit/linea/arrows_circle_check'

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [lowerValidated, setLowerValidated]=useState(false);
  const [upperValidated, setUpperValidated]=useState(false);
  const [numberValidated, setNumberValidated]=useState(false);
  const [specialValidated, setSpecialValidated]=useState(false);
  const [lengthValidated, setLengthValidated]=useState(false);
  
  const location=useLocation()
  const search=location.search
  const navigate = useNavigate();

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
    id:search.split("=")[1].split("&")[0],
    token:search.split("=")[2]
  });

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
  console.log();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(lowerValidated ===true && upperValidated  === true && numberValidated  === true && specialValidated  === true && lengthValidated === true){
      if(data.password ===data.confirmPassword){
        const dataResponse = await fetch(SummaryApi.resetPassword.url, {
          method: SummaryApi.resetPassword.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const dataApi = await dataResponse.json();
        if (dataApi.success) {
          toast.success(dataApi.message)
          }
        if (dataApi.error) {
          toast.error(dataApi.message);
        }
      }else{
        toast.error("Password and confirm password are same")
      }  
    }else{
      toast.error("Password must be fill in below colunms")
    }
  };

  return (
    <section id="login" className="h-[93.5vh]">
      <div className="max-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <h1 className="text-center text-3xl font-semibold text-black">Forget Password</h1>
          <form
            action="#"
            className="pt-6 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="">Create New Password : </label>
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
            <div>
              <label htmlFor="">Confirm New Password : </label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="enter confirm password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full bg-transparent outline-none"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 hover:bg-orange-700 transition-all mx-auto block mt-6"
            >
              Chance
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
