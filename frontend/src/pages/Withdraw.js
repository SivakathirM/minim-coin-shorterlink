import React, { useEffect, useRef, useState } from 'react'
import displayINRCurrency from "../helpers/displayCurrency"
import upi from "../assest/withdraw/upi.jpg"
import card from "../assest/withdraw/card.png"
import bank from "../assest/withdraw/bank.png"
import wallet from "../assest/withdraw/wallet.png"
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cards from 'react-credit-cards-2';
import visa from '../assest/withdraw/visa.jpg'
import SummaryApi from "../common";
import moment from 'moment'

const Withdraw = () => {
    const [data,setData]=useState([])
    const [upiPay,setUpiPay]=useState(true)
    const [cardPay,setCardPay]=useState(false)
    const [accountPay,setAccountPay]=useState(false)
    const [walletPay,setWalletPay]=useState(false)
    const [withdrawAmount,setWithdrawAmount]=useState('')
    const withdraw=useRef();
    const history=useRef();
    const user = useSelector((state) => state?.user?.user);
    const [upiData, setUpiData] = useState({
        withdrawMethod:'upi',
        paymentName:'GPay',
        upiId: "",
        phoneNumber: "",
        upiUserName: "",
    });
    const [cardData, setCardData] = useState({
        withdrawMethod:'card',
        cardNumber:'',
        cardUserName: "",
        expireDate: "",
        cvc: "",
    });
    const [bankData, setBankData] = useState({
        withdrawMethod:'bank',
        accountNumber:'',
        accountName: "",
        ifsc: "",
        cif: "",
        micr: "",
    });
    const [walletData, setWalletData] = useState({
        withdrawMethod:'wallet',
        paymentNameWallet:'Gpay',
        walletNumber: "",
        walletName: ""
    });

    const handleUpiSubmit = async (e) => {
        e.preventDefault();
        upiData.withdrawAmount=withdrawAmount
        const dataRespose = await fetch(SummaryApi.withdraw.url, {
          method: SummaryApi.withdraw.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(upiData),
        });
        const dataApi = await dataRespose.json();
        if (dataApi.success) {
          toast.success(dataApi.message);
          history.current.className=""
          withdraw.current.className="hidden"
          fetchHistory();
          window.location.reload();
        }
        if (dataApi.error) {
            toast.error(dataApi.message);
        }
      };
    const handleCardSubmit = async (e) => {
        e.preventDefault();
        cardData.withdrawAmount=withdrawAmount
        const dataRespose = await fetch(SummaryApi.withdraw.url, {
          method: SummaryApi.withdraw.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(cardData),
        });
        const dataApi = await dataRespose.json();
        if (dataApi.success) {
          toast.success(dataApi.message);
          history.current.className=""
          withdraw.current.className="hidden"
          fetchHistory();
          window.location.reload();
        }
        if (dataApi.error) {
            toast.error(dataApi.message);
        }
      };
    const handleBankSubmit = async (e) => {
        e.preventDefault();
        bankData.withdrawAmount=withdrawAmount
        const dataRespose = await fetch(SummaryApi.withdraw.url, {
            method: SummaryApi.withdraw.method,
            credentials: "include",
            headers: {
            "content-type": "application/json",
            },
            body: JSON.stringify(bankData),
        });
        const dataApi = await dataRespose.json();
            if (dataApi.success) {
                toast.success(dataApi.message);
                withdraw.current.className="hidden"
                history.current.className=""
                fetchHistory();
                window.location.reload();
            }
            if (dataApi.error) {
                toast.error(dataApi.message);
            }
        };  
    const handleWalletSubmit = async (e) => {
        e.preventDefault();
        walletData.withdrawAmount=withdrawAmount
        const dataRespose = await fetch(SummaryApi.withdraw.url, {
          method: SummaryApi.withdraw.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(walletData),
        });
        const dataApi = await dataRespose.json();
        if (dataApi.success) {
          toast.success(dataApi.message);
          history.current.className=""
          withdraw.current.className="hidden"
          fetchHistory();
          window.location.reload();
        }
        if (dataApi.error) {
            toast.error(dataApi.message);
        }
      };

    const fetchHistory = async () => {
        const dataResponse = await fetch(SummaryApi.history.url, {
            method: SummaryApi.history.method,
            credentials: "include",
        });
        const dataApi = await dataResponse.json();
        if (dataApi.success) {
            setData(dataApi.data)
        }
    };

    const handleOnChangeUpi = (e) => {
        const { name, value } = e.target;
        setUpiData((preve) => {
            return {
            ...preve,
            [name]: value,
            };
        });
    };
    const handleInputChange = (evt) => {
        evt.preventDefault();
        const { name, value } = evt.target;
        setCardData((prev) => ({ ...prev, [name]: value }));
      }
    
      const handleInputFocus = (evt) => {
        evt.preventDefault();
        setCardData((prev) => ({ ...prev, focus: evt.target.name }));
      }
    
    const handleOnChangeBank = (e) => {
        const { name, value } = e.target;
        e.preventDefault()
        setBankData((preve) => {
            return {
            ...preve,
            [name]: value,
            };
        });
    };
    const handleOnChangeWallet = (e) => {
        const { name, value } = e.target;
        e.preventDefault()
        setWalletData((preve) => {
            return {
            ...preve,
            [name]: value,
            };
        });
    };

    const withdrawCheck=(value)=>{

        var coin=user?.coin || ' '
        if (value<=coin) {
            return value
        }else{
            toast.error("Your are type wrong Number Pleace check!")
            setWithdrawAmount('')
        }
    }

    const handlePaymentSystem=(value)=>{
        if (value==='upi') {
            setUpiPay(true)
            setCardPay(false)
            setAccountPay(false)
            setWalletPay(false)
        }else if(value==='card'){
            setCardPay(true)
            setUpiPay(false)
            setAccountPay(false)
            setWalletPay(false)
        }else if(value==='account'){
            setAccountPay(true)
            setCardPay(false)
            setUpiPay(false)
            setWalletPay(false)
        }else if(value==='wallet'){
            setWalletPay(true)
            setAccountPay(false)
            setCardPay(false)
            setUpiPay(false)
        }
      }

    const handleOnWithdraw=()=>{
        history.current.className="hidden"
        withdraw.current.className="mt-2"
    }  
    const handleOnHistory=()=>{
        history.current.className=""
        withdraw.current.className="mt-2 hidden"
    }  
    useEffect(() => {
        // history
        fetchHistory();
        // eslint-disable-next-line
      }, []);
  return (
    <div className='bg-slate-200 h-auto md:min-h-[93.5vh]'>{/*md:h-[93.5vh*/}
      <div className='w-12/12 md:w-7/12 lg:w-5/12 bg-white h-auto mx-auto relative'>
        <div className='flex justify-between font-semibold px-1 py-2 border-b-2 border-violet-800 bg-violet-800 text-white'>
         <h6 className='max-sm:text-sm'>Payment WithDraw</h6>  
         <h6 className='max-sm:text-sm'>Balance : {user?.coin && (displayINRCurrency(user?.coin))}</h6>  
        </div>
        {/* withdraw form */}
        <div className='mt-2' ref={withdraw}>
            <label htmlFor="" className=''>Select Withdraw Method : </label>
            <button className='inline-block mb-2 ml-[20px] md:ml-[97px] lg:ml-[199px] bg-gray-700 text-white w-18 px-2' onClick={handleOnHistory}>History</button>
            <div className='flex justify-around mx-1'>
                <div className='border border-black px-1 md:px-2 lg:px-4 py-1 cursor-pointer'  onClick={()=>handlePaymentSystem('upi')}> 
                    <img src={upi} alt="upi" width={45} height={40} className='-mt-0.5 mx-auto'/>
                    <button className='font-serif' >UPI</button>
                </div>
                <div className='border border-black px-1 md:px-2 lg:px-4 py-1 cursor-pointer' onClick={()=>handlePaymentSystem('card')}>
                    <img src={card} alt="card" width={35} height={35} className='-mt-0.5 mx-auto'/>
                    <button className='font-serif'>Cards</button>
                </div>
                <div className='border border-black px-1 md:px-2 lg:px-4 py-1 cursor-pointer' onClick={()=>handlePaymentSystem('account')}>
                    <img src={bank} alt="bank" width={35} height={30} className='mx-auto -mt-0.5'/>
                    <button className='font-serif'>Account</button>
                </div>
                <div className='border border-black px-1 md:px-2 lg:px-4 py-1 cursor-pointer' onClick={()=>handlePaymentSystem('wallet')}>
                    <img src={wallet} alt="wallet" width={45} height={45} className='mx-auto -mt-0.5'/>
                    <button className='font-serif'>Wallet</button>
                </div>
            </div>
            {/* UPI */}
            {
            upiPay && (
                <div className='mx-1 mt-3'>  
                    <form action='#' onSubmit={handleUpiSubmit}>
                        <h4 className='text-center mx-auto w-[40%] h-[10%] bg-orange-500 text-white'>UPI Payment</h4>
                        <label htmlFor="withdrawUpi" className='block mt-1'>Enter your Withdraw Amount : </label>
                        <input
                            type="text"
                            placeholder="Ex : 00.00"
                            className="h-7 md:h-8 w-[90%] mx-auto text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                            value={withdrawCheck(withdrawAmount)}   
                            onChange={(e)=>setWithdrawAmount(e.target.value)}
                            id='withdrawUpi'
                            required
                        />
                        <label htmlFor="payment" className='block mt-1'>Select Upi System : </label>
                        <select
                            value={upiData.paymentName}
                            name="paymentName"
                            onChange={handleOnChangeUpi}   
                            className="h-7 md:h-8 w-[90%] mx-auto text-md border border-black mt-1 block rounded-md"
                            required
                            id='payment'
                        >
                            <option value="Gpay">GPay</option>
                            <option value="Phonepe">Phonepe</option>
                            <option value="paytm">paytm</option>
                        </select>
                        <label htmlFor="upiId" className='block mt-1'>Enter your Upi ID : </label>
                        <input
                            type="text"
                            placeholder="Ex : samesh08@oksbi"
                            className="h-7 md:h-8 w-[90%] mx-auto text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                            name="upiId"
                            value={upiData.upiId}   
                            onChange={handleOnChangeUpi}
                            id='upiId'
                            required
                        />
                        <label htmlFor="upiPhoneNumber" className='block mt-1'>Enter your Upi Phone Number : </label>
                        <input
                            type="number"
                            placeholder="Ex : 1234567890"
                            className="h-7 md:h-8 w-[90%] mx-auto otpAppearance text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                            name="phoneNumber"
                            value={upiData.phoneNumber}
                            onChange={handleOnChangeUpi}
                            id='upiPhoneNumber'
                            required
                        />
                        <label htmlFor="upiUserName" className='block mt-1'>Enter your Upi Name : </label>
                        <input
                            type="text"
                            placeholder="Ex : samesh"
                            className="h-7 md:h-8 w-[90%] mx-auto text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                            name="upiUserName"  
                            value={upiData.upiUserName}
                            onChange={handleOnChangeUpi}
                            id='upiUserName'
                            required
                        />
                        <button className='w-[80%] mx-auto block h-8 mt-4 mb-2 rounded-md bg-orange-500 text-white'>Process</button>
                        <div className='bg-white w-full h-1'></div>
                    </form>
                </div>
            )
            }

            {/* Card */}
            { 
            cardPay && (
                <div className='mx-1 mt-3'>
                    <form action='#' onSubmit={handleCardSubmit}>
                        <h4 className='text-center mx-auto w-[40%] h-[10%] bg-orange-500 text-white'>Card Payment</h4>
                        <img src={visa} alt="visa" className='mt-2 z-10 mx-auto w-44 h-24'/>
                        <div className='z-20 relative -top-24 left-16 md:left-[72px] lg:left-40 text-white' >
                            <Cards
                                number={cardData.cardNumber}
                                expiry={cardData.expireDate}
                                name={cardData.cardUserName}
                                focused={cardData.focus}
                            />
                        </div>
                        
                        <label htmlFor="withdrawCard" className='block -mt-24'>Enter your Withdraw Amount : </label>
                        <input
                            type="text"
                            placeholder="Ex : 00.00"
                            className="h-7 md:h-8 w-[90%] mx-auto text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                            value={withdrawCheck(withdrawAmount)}   
                            onChange={(e)=>setWithdrawAmount(e.target.value)}
                            id='withdrawCard'
                            required
                        />
                        <div className='flex flex-row justify-between mt-1 mx-2 md:mx-3 lg:mx-4'>
                            <div>
                                <label htmlFor="cardNumber" className='mt-1 -ml-3'>Card Number : </label>
                                <input
                                    type="number"
                                    placeholder="Ex : 444 4444 4444 444"
                                    className="h-7 md:h-8 w-[90%] mx-auto otpAppearance text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                                    value={cardData.cardNumber}
                                    name='cardNumber'
                                    id='cardNumber'
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="cardUserName" className='mt-1 ml-2'>Card Name : </label>
                                <input
                                    type="text"
                                    placeholder="Ex : 1234567890"
                                    className="h-7 md:h-8 w-[90%] mx-auto text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                                    name="cardUserName"
                                    value={cardData.cardUserName}
                                    id='cardUserName'
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex flex-row justify-between mt-1 mx-2 md:mx-3 lg:mx-4'>
                            <div>
                                <label htmlFor="expireDate" className='mt-1 -ml-3'>Expire Date : </label>
                                <input
                                    type="text"
                                    placeholder="Ex : 00/00"
                                    className="h-7 md:h-8 w-[90%] mx-auto text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                                    name="expireDate"
                                    value={cardData.expireDate}
                                    id='expireDate'
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="cvc" className='mt-1 ml-2'>CVC : </label>
                                <input  
                                    type="text"
                                    placeholder="Ex : 123"
                                    className="h-7 md:h-8 w-[90%] mx-auto text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                                    name="cvc"
                                    value={cardData.cvc}
                                    id='cvc'
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    required
                                />
                            </div>
                        </div>
                        <button className='w-[90%] mx-auto block h-8 mt-4 rounded-md bg-orange-500 text-white'>Process</button>
                        <div className='bg-white w-full h-5'></div>
                    </form>
                </div>
            )
            }

            {/* Account */}
            {
            accountPay && (
                <div className='mx-1 mt-3'>  
                    <form  action='#' onSubmit={handleBankSubmit}>
                        <h4 className='text-center mx-auto w-[70%] h-[10%] bg-orange-500 text-white'>Bank Account Payment</h4>
                        <label htmlFor="withdrawAccount" className='block mt-1'>Enter your Withdraw Amount : </label>
                        <input
                            type="text"
                            placeholder="Ex : 00.00"
                            className="h-7 md:h-8 w-[90%] mx-auto text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                            value={withdrawCheck(withdrawAmount)}   
                            onChange={(e)=>setWithdrawAmount(e.target.value)}
                            id='withdrawAccount'
                            required
                        />
                        <label htmlFor="accountNumber" className='block mt-1'>Enter your Account Number : </label>
                        <input
                            type="number"
                            placeholder="12345678901"
                            className="h-7 md:h-8 w-[90%] mx-auto otpAppearance text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                            name="accountNumber"
                            value={bankData.accountNumber}
                            onChange={handleOnChangeBank}
                            id='accountNumber'
                            required
                        />
                        <label htmlFor="accountName" className='block mt-1'>Enter your Bank Holder Name : </label>
                        <input
                            type="text"
                            placeholder="Ex:T RAMASH"
                            className="h-7 md:h-8 w-[90%] mx-auto text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                            name="accountName"
                            value={bankData.accountName}
                            onChange={handleOnChangeBank}
                            id='accountName'
                            required
                        />
                        <label htmlFor="ifsc" className='block mt-1'>Enter your Bank IFSC Number : </label>
                        <input
                            type="text"
                            placeholder="SBIN0000000"
                            className="h-7 md:h-8 w-[90%] mx-auto text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                            name="ifsc"
                            value={bankData.ifsc}
                            onChange={handleOnChangeBank}
                            id='ifsc'
                            required
                        />
                        <div className='flex flex-row justify-between mt-1 mx-2 md:mx-3 lg:mx-4'>
                            <div>
                                <label htmlFor="cif" className='mt-1 -ml-3'>CIF Number : </label>
                                <input
                                    type="text"
                                    placeholder="12345678901"
                                    className="h-7 md:h-8 w-[90%] mx-auto text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                                    name="cif"
                                    value={bankData.cif}
                                    onChange={handleOnChangeBank}
                                    id='cif'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="micr" className='mt-1 ml-2'>MICR : </label>
                                <input  
                                    type="text"
                                    placeholder="123"
                                    className="h-7 md:h-8 w-[90%] mx-auto text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                                    name="micr"
                                    value={bankData.micr}
                                    onChange={handleOnChangeBank}
                                    id='micr'
                                    required
                                />
                            </div>
                        </div>
                        <button className='w-[90%] mx-auto block h-8 mt-4 rounded-md bg-orange-500 text-white'>Process</button>
                        <div className='bg-white w-full h-3'></div>
                    </form>
                </div>
            )
            }

            {/* Wallet */}
            {
            walletPay && (
                <div className='mx-1 mt-3'>  
                    <form  action='#' onSubmit={handleWalletSubmit}>
                        <h4 className='text-center mx-auto w-[40%] h-[10%] bg-orange-500 text-white'>Wallet Payment</h4>
                        <label htmlFor="withdrawWallet" className='block mt-1'>Enter your Withdraw Amount : </label>
                        <input
                            type="text"
                            placeholder="Ex : 00.00"
                            className="h-7 md:h-8 w-[90%] mx-auto text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                            value={withdrawCheck(withdrawAmount)}   
                            onChange={(e)=>setWithdrawAmount(e.target.value)}
                            id='withdrawWallet'
                            required
                        />
                        <label htmlFor="paymentWallet" className='block mt-1'>Select Wallet System : </label>
                        <select
                            className="h-7 md:h-8 w-[90%] mx-auto text-md border border-black mt-1 block rounded-md"
                            name="paymentNameWallet"
                            value={walletData.paymentNameWallet}
                            onChange={handleOnChangeWallet}   
                            required
                            id='paymentWallet'
                        >
                            <option value="Gpay">GPay</option>
                            <option value="Phonepe">Phonepe</option>
                            <option value="paytm">paytm</option>
                        </select>
                        <label htmlFor="walletNumber" className='block mt-1'>Enter your Wallet Phone Number : </label>
                        <input
                            type="number"
                            placeholder="1234567890"
                            className="h-7 md:h-8 w-[90%] mx-auto otpAppearance text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                            name="walletNumber"
                            value={walletData.walletNumber}   
                            onChange={handleOnChangeWallet}
                            id='walletNumber'
                            required
                        />
                        <label htmlFor="walletName" className='block mt-1'>Enter your Wallet User Name : </label>
                        <input
                            type="text"
                            placeholder="EX RAMESH"
                            className="h-7 md:h-8 w-[90%] mx-auto text-md border placeholder-slate-400 border-black mt-1 block focus:outline-none rounded-md"
                            name="walletName"
                            value={walletData.walletName}
                            onChange={handleOnChangeWallet}
                            id='walletName'
                            required
                        />
                        <button className='w-[80%] mx-auto block h-8 mt-4 mb-2 rounded-md bg-orange-500 text-white'>Process</button>
                        <div className='bg-white w-full h-4'></div>
                    </form>
                </div>
            )
            }
        </div>
        {/* history */}
        <div className='hidden' ref={history}>
            <h2 className='inline-block'>Withdraw History</h2>
            <button className='inline-block mt-2 mb-2 ml-[67px] md:ml-[138px] lg:ml-[245px] bg-gray-900 text-white w-18 px-2' onClick={handleOnWithdraw}>Withdraw</button> 
            
            { data[0] ? (
            <table className="w-full h-auto userTable table-fixed borders mt-1 md:mt-2">
                <thead>
                <tr className="bg-black text-white">
                    <th className="w-2/12 p-1">ID</th>
                    <th className="w-3/12 md:w-5/12 text-[2px]">Process</th>
                    <th className="w-3/12 text-sm">RS</th>
                    <th className="w-4/12 md:w-3/12 text-sm">Date</th>
                </tr>
                </thead>
                <tbody>
         
                { 
                data && data.map((data, index) => {
                        return (
                        <tr key={index + data} className="p-1 text-sm">
                            <td>{index+1}</td>
                            <td className="overflow-hidden text-sm md:text-lg">{data?.process}</td>
                            <td>{data.withdraw_amount}</td>
                            <td>{moment(data?.timestamps).format("DD-MM-YYYY")}</td>
                        </tr>
                        );
                    })}
                    
                </tbody>
            </table>
            ):(
                <div className='p-5 text-center font-semibold text-2xl'>No withdraw history</div>
            )
            }

        </div>
      </div> 
    </div>
  )
}

export default Withdraw
