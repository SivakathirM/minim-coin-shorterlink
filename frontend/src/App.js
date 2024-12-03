import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./componets/Header";
import Footer from "./componets/Footer";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect} from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userslice";

function App() {
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }

  };

  useEffect(()=>{
    // user Details
    fetchUserDetails();
    // eslint-disable-next-line
  },[])
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, //user detail fetch
        }}
      >
        <ToastContainer autoClose={1000} position="top-center" hideProgressBar={true}/>
        <Header />
        <main className="h-auto pt-10">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
