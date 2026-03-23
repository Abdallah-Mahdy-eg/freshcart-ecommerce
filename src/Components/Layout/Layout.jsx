// import { Outlet } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";

// const Layout=({currentUser, clearUserData})=>{
//     return <>
//     <div className="font-montserratAlt">
//         <Navbar currentUser={currentUser} clearUserData={clearUserData}/>

//         <div className="container w-4/5 mx-auto">
//             <Outlet/>
//         </div>
        
//         <footer className="bg-gray-200 p-4">
//             <h2>Get the FreshCart App</h2>
//             <p>We will send you a link, open it your phone to download the app.</p>
//             <div className="container flex w-11/12 m-auto justify-between mt-6">
//                 <input className="w-3/4 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 focus:outline-blue-300" type="email" placeholder="Email.."/>
//                 <button className="bg-green-600 w-1/5 text-white px-4 py-2 rounded hover:bg-green-700 transition">Share App Link</button> 
//             </div>
//             <div className="container md:flex justify-between w-11/12 m-auto border-t-2 border-b-2 border-gray-600 py-4 my-4">
//                 <div className="leftPart flex items-center gap-3">
//                     <p>payment parteners.</p>
//                     <i className="fa-brands fa-amazon-pay text-blue-600 cursor-pointer text-xl"></i>
//                     <i className="fa-brands fa-cc-mastercard text-blue-500 cursor-pointer text-xl"></i>
//                     <i className="fa-brands fa-paypal text-blue-500 cursor-pointer text-xl"></i>
//                 </div>

//                 <div className="rightPart flex items-center gap-3">
//                     <p>Get deliveries with FreshCart</p>
//                     <button className="bg-black text-white py-2 px-4 w-48 flex items-center rounded"><i className="fa-brands fa-app-store text-3xl"></i><span>Available on the App Stor</span></button>
//                     <button className="bg-black text-white py-2 px-4 w-48 flex items-center rounded"><i className="fa-brands fa-google-play text-3xl"></i> <span>Get it on Google Play</span></button>
//                 </div>
//             </div>
//         </footer>
//     </div>
        
//     </>
// };

// export default Layout;


import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Layout = ({ currentUser, clearUserData }) => {
  return (
    <div className="font-montserratAlt">
      <Navbar currentUser={currentUser} clearUserData={clearUserData} />

      <div className="container w-4/5 mx-auto">
        <Outlet />
      </div>

      <footer style={{ background: "#1f2937" }} className="px-6 py-8 mt-10">
        <div className="max-w-5xl mx-auto">

          <div className="flex flex-col items-center gap-2 mb-7 text-center">
            <p className="text-base font-medium text-white">Get the FreshCart App</p>
            <p className="text-sm text-gray-400">
              We will send you a link, open it on your phone to download the app.
            </p>
            <div className="flex gap-3 mt-2 w-full max-w-md">
              <input
                type="email"
                placeholder="Email..."
                className="flex-1 px-3 py-2 rounded-lg text-sm text-white focus:outline-none"
                style={{ background: "#374151", border: "1px solid #374151" }}
              />
              <button className="bg-indigo-700 hover:bg-indigo-800 text-indigo-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
                Share App Link
              </button>
            </div>
          </div>

          <div
            className="flex justify-between items-center flex-wrap gap-4 pt-5"
            style={{ borderTop: "1px solid #374151" }}
          >
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-400">Payment partners</p>
              <i className="fa-brands fa-amazon-pay text-blue-400 text-xl cursor-pointer"></i>
              <i className="fa-brands fa-cc-mastercard text-blue-400 text-xl cursor-pointer"></i>
              <i className="fa-brands fa-paypal text-blue-400 text-xl cursor-pointer"></i>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-400">Get deliveries with FreshCart</p>
              <button
                className="text-white text-xs px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
                style={{ background: "#111827", border: "1px solid #374151" }}
              >
                <i className="fa-brands fa-app-store text-lg"></i>
                App Store
              </button>
              <button
                className="text-white text-xs px-3 py-2 rounded-lg flex items-center gap-2 transition-colors"
                style={{ background: "#111827", border: "1px solid #374151" }}
              >
                <i className="fa-brands fa-google-play text-lg"></i>
                Google Play
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-600 mt-5">
            © 2024 FreshCart. All rights reserved.
          </p>

        </div>
      </footer>
    </div>
  );
};

export default Layout;