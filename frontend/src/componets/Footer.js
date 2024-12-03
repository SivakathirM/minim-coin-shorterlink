import React from 'react'

const Footer = () => {
  return (
    <footer className="text-white bg-gray-800 p-5">
        <div className="flex flex-wrap ">
            <div className="p-5 lg:p-10 w-full md:w-1/3 ">
                <h2 className="font-extrabold text-2xl">ShorterLink</h2>
                <p className="text-gray-400 mt-3">Your shortened URLs can be used in publications, documents, advertisements, blogs, forums, instant messages, and other locations. Track statistics for your business and projects by monitoring the number of hits from your URL with our click counter.</p>
            </div>
            <div className="p-5 lg:p-10 w-full md:w-1/3 ">
                <h2 className="font-extrabold text-xl">Address</h2>
                <p className="text-gray-400 mt-3">
                    Buildings Alyssa, Begonia & <br/>
                    Clove Embassy Tech Village, <br/>
                    Outer Ring Road, Devarabeesanahalli Village, <br/>
                    Chennai, 600002, <br/>
                    Tamilnadu, India.
                </p>
            </div>
            <div className="p-5 lg:p-10 w-full md:w-1/3">
                <h2 className="font-extrabold text-xl">Inquiries</h2>
                <p className="text-gray-400 mt-3">
                    <a href="tel:+91000000000">5934-334-1876</a>
                    <br/>
                    <a href="mailto:contact@gmail.com">minimcoin@gmail.com</a>
                </p>
                <ul className="flex  mt-4">
                    <li className="p-2 bg-white shadow rounded mx-1"><a className="text-gray-500" href="#">
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                    </a></li>
                    <li className="p-2 bg-white shadow rounded mx-1"><a className="text-gray-500" href="#">
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path d="M15.233 5.488c-.843-.038-1.097-.046-3.233-.046s-2.389.008-3.232.046c-2.17.099-3.181 1.127-3.279 3.279-.039.844-.048 1.097-.048 3.233s.009 2.389.047 3.233c.099 2.148 1.106 3.18 3.279 3.279.843.038 1.097.047 3.233.047 2.137 0 2.39-.008 3.233-.046 2.17-.099 3.18-1.129 3.279-3.279.038-.844.046-1.097.046-3.233s-.008-2.389-.046-3.232c-.099-2.153-1.111-3.182-3.279-3.281zm-3.233 10.62c-2.269 0-4.108-1.839-4.108-4.108 0-2.269 1.84-4.108 4.108-4.108s4.108 1.839 4.108 4.108c0 2.269-1.839 4.108-4.108 4.108zm4.271-7.418c-.53 0-.96-.43-.96-.96s.43-.96.96-.96.96.43.96.96-.43.96-.96.96zm-1.604 3.31c0 1.473-1.194 2.667-2.667 2.667s-2.667-1.194-2.667-2.667c0-1.473 1.194-2.667 2.667-2.667s2.667 1.194 2.667 2.667zm4.333-12h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm.952 15.298c-.132 2.909-1.751 4.521-4.653 4.654-.854.039-1.126.048-3.299.048s-2.444-.009-3.298-.048c-2.908-.133-4.52-1.748-4.654-4.654-.039-.853-.048-1.125-.048-3.298 0-2.172.009-2.445.048-3.298.134-2.908 1.748-4.521 4.654-4.653.854-.04 1.125-.049 3.298-.049s2.445.009 3.299.048c2.908.133 4.523 1.751 4.653 4.653.039.854.048 1.127.048 3.299 0 2.173-.009 2.445-.048 3.298z"/></svg>
                    </a></li>
                    <li className="p-2 bg-white shadow rounded mx-1"><a className="text-gray-500" href="#">
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </a></li>
                    <li className="p-2 bg-white shadow rounded mx-1"><a className="text-gray-500" href="#">
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    </a></li>
                </ul>
            </div>
        </div>
        <div className="text-center text-gray-500 border-t border-gray-500 pt-5">
            All Rights Reserved @2024 minimcoin
        </div> 
    </footer>
  )
}

export default Footer
