import React from 'react'
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";
import { PiHandWithdrawFill } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { IoReorderThreeOutline } from "react-icons/io5";
import { Outlet ,NavLink} from "react-router-dom";

const Dashboard = () => {

    const dashMenuClick =()=>{
        var menu = document.getElementById("dashMenu")
        if(menu.classList.contains('hidden')){
            menu.classList.remove("hidden")
        }else{
            menu.classList.add("hidden");
        }
      }
      
  return (
    <div className='flex flex-row'>
        {/* side bar */}
        <aside className='bg-orange-600 w-auto min-h-[93vh] h-auto'>{/*md:h-[93.5vh]*/}
            <div className='text-2xl p-2 flex md:border-black border-b-2 '>
                <IoReorderThreeOutline className='mt-1 text-3xl cursor-pointer' onClick={dashMenuClick}/>
                <h1 className='hidden md:block text-center font-semibold'>Dashboard</h1>
            </div>
            <div className='flex flex-row'>
                <nav className='' id="dashMenuIcon">
                    <ul className=''>
                        <NavLink to={"admin/page=1"} className=' block py-3 px-3 md:px-2.5 cursor-pointer'><MdAdminPanelSettings/></NavLink> 
                        <NavLink to={"user/page=1"} className='block py-3 px-3 md:px-2.5 cursor-pointer'><FaUser /></NavLink>
                        <NavLink to={"link/page=1"} className='block py-3 px-3 md:px-2.5 cursor-pointer'><IoLinkSharp /></NavLink>
                        <NavLink to={"withdraw"} className='block py-3 px-3 md:px-2.5 cursor-pointer'><PiHandWithdrawFill /></NavLink>
                        <NavLink to={"edit/page=1"} className='block py-3 px-3 md:px-2.5 cursor-pointer'><CiEdit /></NavLink>
                    </ul> 
                </nav> 
                <nav className='hidden md:block' id="dashMenu">
                    <ul className='text-center flex flex-col'>
                        <NavLink to={"admin/page=1"} className='p-1 my-1 mr-1 rounded-md cursor-pointer bg-white w-32' onClick={dashMenuClick}>Admin</NavLink>
                        <NavLink to={"user/page=1"} className='p-1 my-1 mr-1 rounded-md cursor-pointer bg-white w-32' onClick={dashMenuClick}>user</NavLink>
                        <NavLink to={"link/page=1"} className='p-1 my-1 mr-1 rounded-md cursor-pointer bg-white w-32' onClick={dashMenuClick}>Link</NavLink>
                        <NavLink to={"withdraw"} className='p-1 my-1 mr-1 rounded-md cursor-pointer bg-white w-32' onClick={dashMenuClick}>withdraw</NavLink>
                        <NavLink to={"edit/page=1"} className='p-1 my-1 mr-1 rounded-md cursor-pointer bg-white w-32' onClick={dashMenuClick}>Edit/Delete</NavLink>
                    </ul>
                </nav>
            </div>       
        </aside>
        <main className='h-auto flex-initial w-full bg-white'>
            <Outlet/>
        </main>
    </div>
  )
}

export default Dashboard