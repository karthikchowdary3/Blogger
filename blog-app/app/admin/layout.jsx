import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({children}){
    return(
        <>
        <div className="flex  ">
            <ToastContainer theme="dark"/>
            <Sidebar/>
            <div className="flex flex-col w-full bg-gray-100">
                <div className="px-2 sm:pl-14 py-3 border border-black flex items-center justify-between">
                    <h3 className="text-xl sm:text-4xl font-medium ">Admin Panel</h3>
       

                </div>
                {children}

            </div>

        </div>
      
        </>
    )

}