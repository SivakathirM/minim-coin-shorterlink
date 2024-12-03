import React, { useEffect, useRef, useState } from "react";
import SummaryApi from "../common/index";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import coinCategory from "../helpers/coinCategory";
import displayINRCurrency from "../helpers/displayCurrency";

const EditDelete = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const pageList =[]
  const frontendUrl=process.env.REACT_APP_FRONTEND_URL
  const [editData, setEditData] = useState({
    random:'',
    link:'',
    coin:''
  });
  const [totalPage, setTotalPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const editPage=useRef()
  
  const loadingList = new Array(10).fill(null);
  const page = Number(params.page.split("=")[1]);
  const indexPage = page-1
  const paginationList = [page, page + 1, page + 2, page + 3, page + 4];

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
      navigate(`/dashboard/edit/page=${totalPage}`);
      fetchPagination(totalPage);
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
      navigate(`/dashboard/edit/page=${page - 1}`);
      fetchPagination(page - 1);
    }
  };
  const nextPage = () => {
    if (totalPage > page) {
      navigate(`/dashboard/edit/page=${page + 1}`);
      fetchPagination(page + 1);
    }
  };

  const handleOnChangeEdit= (e) => {
    const { name, value } = e.target;
    e.preventDefault()
    setEditData((preve) => {
        return {
        ...preve,
        [name]: value,
        };
    });
};

  const handleOnEdit=(random,link,coin)=>{
    editPage.current.className="backdrop-blur-sm bg-stone-500 absolute top-0 right-0 bottom-0 left-0 "
    setEditData({random:random,link:link,coin:coin})
  }

  const handleOnEditClose=()=>{
    editPage.current.className="hidden backdrop-blur-sm bg-stone-500 absolute top-0 right-0 bottom-0 left-0 "
  }

  const handleOnSubmit=async(e)=>{
    e.preventDefault();
    const response=await fetch(SummaryApi.editLink.url,{
      method:SummaryApi.editLink.method,
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(editData),
    })
    const responseData=await response.json()
    if (responseData.success) {
      toast.success(responseData?.message);
      editPage.current.className="hidden backdrop-blur-sm bg-stone-500 absolute top-0 right-0 bottom-0 left-0 ";
      fetchPagination();
    }
    if (responseData.error) {
      toast.error(responseData?.message)
    }
  }
  const handleOnDelete=async(random)=>{
    const response=await fetch(SummaryApi.deleteLink.url,{
      method:SummaryApi.deleteLink.method,
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        random:random
      }),
    })
    const responseData=await response.json()
    if (responseData.success) {
      toast.error(responseData?.message);
      editPage.current.className="hidden backdrop-blur-sm bg-stone-500 absolute top-0 right-0 bottom-0 left-0 ";
      fetchPagination();
      fetchTotalPage();
    }
    if (responseData.error) {
      toast.error(responseData?.message)
    }
  }

  useEffect(() => {
    // Pagination
    fetchPagination();
    fetchTotalPage();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="">
      <table className="w-full h-auto userTable table-fixed borders">
        <thead>
          <tr className="bg-black text-white">
            <th className="w-2/12 p-1">ID</th>
            <th className="w-5/12 text-sm">Shorter Link</th>
            <th className="w-2/12 text-[2px]">coin</th>
            <th className="w-3/12 text-[2px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? loadingList.map((item, index) => {
                return (
                  <tr key={index + item}>
                    <td className="animate-pulse opacity-20 bg-slate-200 text-white w-10 h-[51px] md:h-[39px]"></td>
                    <td role="status">
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-200 animate-spin mx-auto dark:text-gray-600 fill-blue-600 mt-2.5 md:mt-1"
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
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </td>
                    <td className="animate-pulse opacity-20 bg-slate-200 text-white w-10"></td>
                    <td className="animate-pulse opacity-20 bg-slate-200 text-white w-10"></td>
                  </tr>
                );
              })
            : data.map((item, index) => {
                return (
                  <tr key={index + item} className="p-1 text-sm">
                    <td>{indexPage * 10+index +1}</td>
                    <td
                      className="overflow-hidden text-sm md:text-md lg:text-lg"
                      id="linkTable"
                    >{`${frontendUrl}/shorter/${item.random}`}</td>
                    <td>{item.coin}</td>
                    <td>
                      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-1 md:mx-1 shareMainBtn">  
                        <button className="h-5 md:h-8 rounded-md w-full text-[12px] md:text-[14px] text-white border border-fuchsia-700 bg-fuchsia-700 mb-1 font-semibold" onClick={()=>handleOnEdit(item.random,item.link,item.coin)}>Edit</button>
                        <button className="h-5 md:h-8 rounded-md w-full text-[12px] md:text-[14px] text-white border border-red-600 bg-red-600 font-semibold" onClick={()=>handleOnDelete(item.random)}>Delete</button>
                      </div>
                    </td>
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
              to={`/dashboard/edit/page=${item}`}
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
              to={`/dashboard/edit/page=${item}`}
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
      {/* Edit */}
      <div className="hidden backdrop-blur-sm bg-stone-500 absolute top-0 right-0 bottom-0 left-0 " ref={editPage}>
        <div className="bg-white w-10/12 md:w-5/12 h-[85vh] mx-auto mt-16">
            <div className="w-fit ml-auto text-2xl bg-red-600 text-white cursor-pointer rounded-full">
                <CgClose onClick={handleOnEditClose}/>
            </div>
            <div className='mx-1 mt-3'>  
                <form  action='#' onSubmit={handleOnSubmit}>
                    <h4 className='text-center mx-auto w-full h-[10%] px-3 py-1 font-semibold bg-fuchsia-700 text-white'>Edit Shorter Link</h4>
                    <label htmlFor="link" className='block mt-1'>Enter your Wallet Phone Number : </label>
                    <input
                        type="text"
                        placeholder="Ex : www.link.com"
                        className="h-7 md:h-8 w-[90%] mx-auto text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                        name="link"
                        value={editData.link}   
                        onChange={handleOnChangeEdit}
                        id='link'
                        required
                    />
                    <label htmlFor="paymentWallet" className='block mt-1'>Select Wallet System : </label>
                        <select
                            className="h-7 md:h-8 w-[90%] mx-auto text-md border border-black mt-1 block rounded-md"
                            name="coin"
                            value={editData.coin}
                            onChange={handleOnChangeEdit}   
                            required
                            id='paymentWallet'
                        >
                        <option value={editData.coin}>{displayINRCurrency(editData.coin)}</option>
                        <option value={0.15}>{displayINRCurrency(0.15)}</option>
                            {coinCategory.map((el, index) => {
                            return (
                                <option value={el.value} key={el.value + index}>
                                {displayINRCurrency(el.label)}
                                </option>
                            );
                        })}
                        </select>
                    <button className='w-[80%] mx-auto block h-8 mt-4 mb-2 rounded-md bg-orange-500 text-white'>Process</button>
                    <div className='bg-white w-full h-4'></div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditDelete;
