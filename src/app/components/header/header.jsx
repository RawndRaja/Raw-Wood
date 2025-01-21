'use client'
import React from 'react';
import Link from 'next/link';
import Drawer from '@/app/components/drawer/drawer';
import Menu from '@/app/components/search/search'
import { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation'


export default function Header() {
  const [movie, setmovie] = useState('')
  const navigation = useRouter()
  const search = () => {
    if (movie !== '') {
  navigation.push(`/search?q=${movie}`)
}
  }
useEffect(() => {
  search();
  }, [movie])
  const links = (

    <>
     <div className="hidden w-auto md:hidden lg:flex md:mt-[-2vw] items-center gap-10 lg:mt-[-2vw] ml-[6vw]">
          <a href="/" className="Link font-bold hover:scale-125">Home</a>
          <a href="/movie?page=1" className="Link font-bold hover:scale-125">Movies</a>
          <a href="/tv?page=1" className="Link font-bold hover:scale-125">TV</a>
          <a href="/about-us" className="Link font-bold hover:scale-125">About Us</a>
        </div>
    </>
  )

  return (
    <div className='mt-[-1vw] fixed opacity-85 z-40 header-body-all-page-raw-wood'>
      {/* Logo and Links Container */}
      <div className="flex flex-row items-center h-20 w-[100dvw] md:mt-[1vw] bg-neutral-500 ">
        {/* Logo */}
        <Link href={'/'} className="flex-shrink-0">
          <img
            src={'/images/logo.png'}
            className="py-2 mt-4 h-52 w-48 sm:h-[30vh] md:h-[30vh] lg:ml-[2vw] md:w-[30vw] lg:w-[18vw] lg:h-[30vh] sm:mt-0"
            width={160}
            height={160}
            alt="logo"
          />
        </Link>

        {/* Links Area */}
        <div className='lg:mt-6'>
       {links}
       </div>

        {/* Search Bar */}
        <form className='flex  flex-row lg:mt-6' onSubmit={(e) => (e.preventDefault())}>
        <div className=" ml-6 lg:block lg:ml-[8vw] lg:mt-[-2vw] ">
          
          <input
            className="hidden border w-[30vw] border-black p-2 lg:block rounded-md lg:w-[20vw] text-black
            lg:ml-36"
            type="text"
            value={movie}
            onChange={(e) => setmovie(e.target.value)}
            placeholder="Enter the movie name"
          />
        </div>
        {/* Sign IN Button */}
        <button onClick={search} className="mt-2 hidden bg-white h-10 w-10 justify-center pl-2 rounded-md ml-[30vw] lg:mt-[-2vw]
        md:ml-[52vw] sm:ml-72 lg:ml-8 sm:block"><Menu /></button>
        </form>
        <div className='mt-2 ml-28 sm:ml-0 lg:mt-1 '><Drawer /></div>
      </div>


    </div>
  );
};