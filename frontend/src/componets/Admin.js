import React, { useEffect, useState } from "react";
import displayINRCurrency from "../helpers/displayCurrency";
import SummaryApi from "../common/index";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUsersRectangle } from "react-icons/fa6";
import { PiLinkSimpleBreakFill } from "react-icons/pi";
import { MdOutlinePreview } from "react-icons/md";
import { PiHandWithdrawFill } from "react-icons/pi";
import { useSelector } from "react-redux";

const Admin = () => {
  const params = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [allLinks, setAllLinks] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const frontendUrl=process.env.REACT_APP_FRONTEND_URL

  const loadingList = new Array(10).fill(null);
  const pageList =[]
  const page = Number(params.page.split("=")[1]);
  const indexPage = page-1
  const paginationList = [page, page + 1, page + 2, page + 3, page + 4];
  const user = useSelector((state) => state?.user?.user); 

  for (let i = 0; i < totalPage; i++) {
    pageList[i]=i+1;
  }
  const fetchPagination = async (pages = 1) => {
    setLoading(true);
    const dataResponse = await fetch(SummaryApi.pagination.url + "/" + pages, {
      method: SummaryApi.pagination.method,
      credentials: "include",
    });
    setLoading(false);
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      setData(dataApi.data);
    }
    if (totalPage < pages) {
      // eslint-disable-next-line
      toast("Count = "+count +" &&" +" Page's = " + totalPage );
      navigate(`/dashboard/admin/page=${totalPage}`);
      fetchPagination(totalPage);
    }
  };
  const fetchAllLink = async () => {
    const dataResponse = await fetch(SummaryApi.allLinks.url, {
      method: SummaryApi.allLinks.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      setAllLinks(dataApi.data)
    }
  };

  const fetchTotalPage = async () => {
    const dataResponse = await fetch(SummaryApi.totalPage.url, {
      method: SummaryApi.totalPage.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      setTotalPage(dataApi.totalPage);
      setCount(dataApi.count)
    }
  };
  
  const prevePage = () => {
    if (page !== 1) {
      navigate(`/dashboard/admin/page=${page - 1}`);
      fetchPagination(page - 1);
    }
  };
  const nextPage = () => {
    if (totalPage > page) {
      navigate(`/dashboard/admin/page=${page + 1}`);
      fetchPagination(page + 1);
    }
  };

  const totalView=allLinks.reduce((acc,current)=>{
    return acc + current.view
  },0);

  const zeroAdd=(value)=>{
    const val=value.toString()
    if(val.length === 1){
      return "000"+val
    }else if(val.length === 2){
      return "00"+val
    }else if(val.length === 3){
      return "0"+val
    }else if(val.length===4){
      return val
    }else if(val.length===5 ||val.length===6){
      return val/1000+"K"
    }else{
      return val/1000000+"M"
    }
  }
  
  useEffect(() => {
    // Pagination
    fetchPagination();
    fetchAllLink();
    fetchTotalPage();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="">
      {/* Box */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 max-sm:p-1 md:gap-2 md:p-2 md:pt-3 bg-slate-200">
        <div className="relative cursor-pointer h-20 w-full md:h-36 bg-white rounded-md"> 
          <span className="p-1 text-sm md:text-lg font-semibold ">View</span> 
          <span className="absolute right-0 top-0 text-fuchsia-700 rounded-tr-md text-2xl md:text-4xl">< MdOutlinePreview />
          </span>
          <span className="absolute top-[37%] left-[22%] md:top-[34%] md:left-[32%] texl-md md:text-2xl bg-fuchsia-700 px-4 py-1 rounded-md text-white">{zeroAdd(totalView)}</span>
        </div>
        <div className="relative cursor-pointer h-20 w-full md:h-36 bg-white rounded-md"> 
          <span className="p-1 text-sm md:text-lg font-semibold ">Link</span> 
          <span className="absolute right-0 top-0 text-green-500 rounded-tr-md text-2xl md:text-4xl">< PiLinkSimpleBreakFill />
          </span>
          <span className="absolute top-[37%] left-[22%] md:top-[31%] md:left-[32%] texl-md md:text-2xl bg-green-500 px-4 py-1 rounded-md text-white">{zeroAdd(allLinks.length)}</span>
        </div>
        <div className="relative cursor-pointer h-20 w-full md:h-36 bg-white rounded-md"> 
          <span className="p-1 text-sm md:text-lg font-semibold ">Customer</span> 
          <span className="absolute right-1 top-0 bg-white text-red-600 rounded-tr-md text-2xl md:text-4xl">< FaUsersRectangle />
          </span>
          <span className="absolute top-[37%] left-[22%] md:top-[31%] md:left-[32%] texl-md md:text-2xl bg-red-600 px-4 py-1 rounded-md text-white">{zeroAdd(totalView)}</span>
        </div>
        <div className="relative cursor-pointer h-20 w-full md:h-36 bg-white rounded-md"> 
          <span className="p-1 text-sm md:text-lg font-semibold ">Total Coin</span> 
          <span className="absolute right-0 top-0 bg-white text-teal-600 rounded-tr-md text-2xl md:text-4xl">< PiHandWithdrawFill />
          </span>
          <span className="absolute top-[37%] left-[22%] md:top-[31%] md:left-[32%] texl-md md:text-2xl bg-teal-600 px-4 py-1 rounded-md text-white">{user?.coin ? (user?.coin):'0000'}</span>
        </div>
      </div>
      <Link to={"/dashboard/withdraw"} className="max-sm:hidden block w-full md:w-1/4 md:ml-auto mt-2 cursor-pointer text-white bg-violet-800 text-center">
        Withdraw <span> = {user?.coin && displayINRCurrency(user?.coin)}</span>
      </Link>
      {/* Links */}
      <table className="w-full h-auto userTable table-fixed borders mt-1 md:mt-2">
        <thead>
          <tr className="bg-black text-white">
            <th className="w-2/12 p-1">ID</th>
            <th className="w-6/12 text-sm">Shorter Link</th>
            <th className="w-2/12 text-[2px]">View</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? loadingList.map((item, index) => {
                return (
                  <tr key={index + item}>
                    <td className="animate-pulse opacity-20 bg-slate-200 text-white w-10 h-[51px] md:h-[27px]"></td>
                    <td role="status">
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-200 animate-spin mx-auto dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill= "currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </td>
                    <td className="animate-pulse opacity-20 bg-slate-200 text-white w-10"></td>
                  </tr>
                );
              })
            : data.map((item, index) => {
                return (
                  <tr key={index + item} className="p-1 text-sm">
                    <td>{indexPage * 10+index +1}</td>
                    <td
                      className="overflow-hidden"
                      id="pagiantionTable"
                    >{`${frontendUrl}/shorter/${item.random}`}</td>
                    <td>{item.view}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      {/* Pagination */}
      {
      data[0] ? (
      <div className="w-full h-12 flex justify-center items-center ">
        <NavLink
          onClick={prevePage}
          className="w-8 h-6 md:m-1 text-center bg-black text-white hover:bg-orange-600 cursor-pointer hover:text-white"
        >
          <FaArrowLeft className="mx-auto mt-1" />
        </NavLink>
        {totalPage < 6 && pageList.map((item, index) => {
          return (
            <NavLink
              to={`/dashboard/admin/page=${item}`}
              key={item + index}
              onClick={() => fetchPagination(item)}
              className="w-8 h-6 max-sm:ml-1 md:m-1 text-center bg-black text-white hover:bg-orange-600 cursor-pointer hover:text-white"
            >
              {item}
            </NavLink>
          );
        })}

        {totalPage > 5 && paginationList.map((item, index) => {
          return (
            <NavLink
              to={`/dashboard/admin/page=${item}`}
              key={item + index}
              onClick={() => fetchPagination(item)}
              className="w-8 h-6 max-sm:ml-1 md:m-1 text-center bg-black text-white hover:bg-orange-600 cursor-pointer hover:text-white"
            >
              {item}
            </NavLink>
          );
        })}

        <NavLink
          onClick={nextPage}
          className="w-8 h-6 max-sm:ml-1 md:m-1  text-center bg-black text-white hover:bg-orange-600 cursor-pointer hover:text-white"
        >
          <FaArrowRight className="mx-auto mt-1" />
        </NavLink>
      </div>
        ) : (
          <>
            <div className="p-1 text-center font-semibold text-2xl">No shorter link created </div>
            <Link to={"/"} className="block p-1 text-center underline text-xl">create shorter link</Link>
          </>
        )
      } 
    </div>
  );
};

export default Admin;
