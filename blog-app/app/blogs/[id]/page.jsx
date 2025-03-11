'use client'
import { assets, blog_data } from '@/Assets/assets';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Ensure Image is imported properly
import Footer from '@/Components/Footer';
import Link from 'next/link';
import axios from 'axios';

const Page = ({ params }) => {
  const [data, setData] = useState(null);

  // Function to fetch blog data based on the id
  const fetchBlogData = async  () => {
    const response = await axios.get('/api/blog',{
      params:{
        id:params.id
      }
    })
    setData(response.data)
   
  };

  useEffect(() => {
    fetchBlogData(); // Fetch data on component mount
  }, [params]);

  return (
    data ? <div className='bg-gray-100'>
      <div className="bg-amber-400 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href='/'>
          <h1 className="text-3xl sm:text-5xl font-medium">BLOGGER</h1>
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000] bg-amber-200">
            Get Started <Image src={assets.arrow} alt="Arrow" />
          </button>
        </div>

        <div className="text-center my-24">
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
          <Image className='mx-auto mt-6 border border-black rounded-full' src={data.authorImg} width={60} height={60} alt='' />
          <p className='mt-1 pb-2 text-xl max-w-[740px] mx-auto'>{data.author}</p>
        </div>
        </div>
        

        <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-15'>
          <Image className='border-2 border-black' src={data.image} width={1280} height={720} alt='' />
         
          
          <div className='blog-content px-5' dangerouslySetInnerHTML={{__html:data.description}}></div>

          {/* <div className='my-24'>
            <p className='text-black font-semibold font my-4'>Share this article on social media</p>
            <div className='flex'>
              <Image src={assets.facebook_icon} width={50} alt='' />
              <Image src={assets.twitter_icon} width={50} alt='' />
              <Image src={assets.googleplus_icon} width={50} alt='' />
            </div>

          </div> */}
        </div>
        <Footer/>
      </div>:<></>
  )
}

export default Page;
