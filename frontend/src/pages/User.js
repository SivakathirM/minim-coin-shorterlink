import React, { useEffect, useState } from "react";
import SummaryApi from "../common/index";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const User = () => {
  const params = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageList =[]
  const frontendUrl=process.env.REACT_APP_FRONTEND_URL

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
      toast("Count = "+count +" &&" +" Page's = " + totalPage );
      navigate(`/dashboard/user/page=${totalPage}`);
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
      navigate(`/dashboard/user/page=${page - 1}`);
      fetchPagination(page - 1);
    }
  };
  const nextPage = () => {
    if (totalPage > page) {
      navigate(`/dashboard/user/page=${page + 1}`);
      fetchPagination(page + 1);
    }
  };
  
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
            <th className="w-6/12 text-sm">Shorter Link</th>
            <th className="w-2/12 text-[2px]">Coin</th>
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
                          fill="currentFill"
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
                    <td>{item.coin * item.view}</td>
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
              to={`/dashboard/user/page=${item}`}
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
              to={`/dashboard/user/page=${item}`}
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

export default User;
