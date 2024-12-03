import React, { useContext, useState } from "react";
import loginIcons from "../assest/user.png";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ForgetPassword = () => {

  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  console.log(data.email);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.requestPasswordReset.url, {
      method: SummaryApi.requestPasswordReset.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();

    if (dataApi.message==='userFound') {
      toast.success("reset link was send your gmail account");
    }
    if(dataApi.message ==='User not Exist'){
      toast.error("User not Exist")
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
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
            <div className="grid">
            <label htmlFor="">Enter your Account Email : </label>
              <div className="bg-slate-200 p-2">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full h-full bg-transparent outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 hover:bg-orange-700 transition-all mx-auto block mt-6"
            >
              Process
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
