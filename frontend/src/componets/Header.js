import React, { useContext, useState } from "react";
import logo from "../assest/logo/logo1.jpg";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userslice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user); //? this ? is use for display error not user varrable declare
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context= useContext(Context)
  const navigate=useNavigate()
    
  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();
    
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const menuClick =()=>{
    var menu = document.getElementById("mobileMenu")
    if(menu.classList.contains('hidden')){
        menu.classList.remove("hidden")
    }else{
        menu.classList.add("hidden");
    }
  }
  return (
    <header className="h-10 md:h-11 shadow-sm px-4 bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center justify-between">
        <div className="hidden md:block">
              <Link to={"/"}>
                <img src={logo} className="w-12 h-8 rounded-sm"/>
              </Link>
        </div>
        <div className="my-auto">
          <button className="md:hidden" onClick={menuClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
          </button>
          <ul className="hidden md:flex font-bold text-gray-600">
            <li className="pr-4"><Link className="px-3 py-2 border border-white hover:border hover:border-orange-400 rounded"
              to={"/"}>Home</Link></li>
            <li className="pr-4"><Link className="px-3 py-2 border border-white hover:border hover:border-orange-400 rounded"
              to={"/dashboard/admin/page=1"}>Dashboard</Link></li>
            <li className="pr-4"><Link className="px-3 py-2 border border-white hover:border hover:border-orange-400 rounded"
              to="/buy">Buy Coin</Link></li>
            <li className="pr-4"><Link className="px-3 py-2 border border-white hover:border hover:border-orange-400 rounded"
              to={"/wallet"}>Wallet</Link></li>
            <li className="pr-4"><Link className="px-3 py-2 border border-white hover:border hover:border-orange-400 rounded"
                to={"/"}>About</Link></li>
          </ul>
        </div>
        
        <div className="hidden bg-black absolute top-10 right-0 left-0 w-[100vw]" id="mobileMenu">
          <ul className="md:hidden font-semibold text-white text-center">
            <li className="mt-1"><Link className=" py-2" onClick={menuClick} to={"/"}>Home</Link></li>
            <li className="mt-1"><Link className=" py-2" onClick={menuClick} to={"/dashboard/admin/page=1"}>Dashboard</Link></li>
            <li className="mt-1"><Link className=" py-2" onClick={menuClick} to="/buy">Buy Coin</Link></li>
            <li className="mt-1"><Link className=" py-2" onClick={menuClick} to={"/wallet"}>Wallet</Link></li>
            <li className="mt-1"><Link className=" py-2" onClick={menuClick} to={"/"}>About</Link></li>
          </ul>
        </div>
        <div className="sm:block md:hidden">
          <Link to={"/"}>
            <img src={logo} className="w-10 h-7 ml-20 rounded-sm"/>
          </Link>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?.id && (
              <div
                className="text-3xl relative flex justify-center"
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

          </div>
          
          <div>
            {user?.id ? (
              <button
                onClick={handleLogout}
                className="px-2 py-1 rounded-full text-white bg-orange-600 hover:bg-orange-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-2 py-1 rounded-full text-white bg-orange-600 hover:bg-orange-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
