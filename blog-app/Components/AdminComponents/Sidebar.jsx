import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-gray-100'>
        <div className='px-2 sm:pl-14 py-3 border border-black'>
        <h1 className="text-xl sm:text-4xl font-medium">BLOGGER</h1>

        </div>
        <div className='w-28 sm:w-80 h-[100vh] relative py-12 border border-black'>
            <div className='w-[50%] sm:w-[80%] absolute right-0 '>
            <Link href='/admin/addProduct' className='flex items-center border border-black gap-3 font-medium px-3 py-2 shadow-[-5px_5px_0px_#000000]'>
                <Image src={assets.add_icon} alt='' width={28} /> <p className='sm:block hidden '>Add Blog</p>

            </Link>
            
            <Link href='/admin/blogList' className=' mt-6 flex items-center border border-black gap-3 font-medium px-3 py-2 shadow-[-5px_5px_0px_#000000]'>
                <Image src={assets.blog_icon} alt='' width={28} /> <p className='sm:block hidden '>Blog List</p>

            </Link>
            
            <Link href='/admin/subscriptions' className='mt-6 flex items-center border border-black gap-3 font-medium px-3 py-2 shadow-[-5px_5px_0px_#000000]'>
                <Image src={assets.email_icon} alt='' width={28} /> <p className='sm:block hidden'>Subscriptions</p>

            </Link> </div>
            

        </div>

    </div>
  )
}

export default Sidebar