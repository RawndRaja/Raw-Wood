import React from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuid } from "uuid";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { useState, useEffect } from 'react';

export default function Banner() {
  const bannerData = useSelector(state => state.RawWoods.bannerData)
  const imageUrl = useSelector(state => state.RawWoods.imageUrl)

  const [CurrentImage, setCurrentImage] = useState(0)

  const handleNext  = () => {
    if (CurrentImage < bannerData.length - 1) {
      setCurrentImage(CurrentImage + 1)
    } else {
      setCurrentImage(0)
    }

  }
  const handelPrevious = () => {
    if (CurrentImage > 0) {
      setCurrentImage(CurrentImage - 1)
    } else {
      setCurrentImage(bannerData.length - 1)
    }
  
  }
 useEffect(()=>{
    const interval = setInterval(()=>{
        if(CurrentImage < bannerData.length - 1){
            handleNext()
        }else{
            setCurrentImage(0)
        }
    },5000)

    return ()=>clearInterval(interval)
},[bannerData,imageUrl,CurrentImage])



  return (
    <section className='h-full w-full'>

      <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
        {
          bannerData.map((nav, index) => {
            const unique_id = uuid(); 

            return (
              <div key={unique_id} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative transition-all' style={{ transform: `translateX(-${CurrentImage * 100}%)`, transition: 'transform 0.5s ease-in-out'}}>

                <div className='w-full h-full'>
                  <img loading='lazy' className='h-full w-full object-cover' key={index} src={imageUrl + nav.backdrop_path} alt="" />
                </div>

                {/* button */}
                <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 lg:flex'>
                  <button onClick={handelPrevious} className='hover:opacity-75 text-black hover:scale-125 rounded-full bg-neutral-500 p-1 z-10 text-4xl'><FaAngleLeft /></button>
                  <button onClick={handleNext} className='hover:opacity-75 text-black hover:scale-125 rounded-full bg-neutral-500 p-1 z-10 text-4xl'><FaAngleRight /></button>
                </div>

                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>
                <div className='container mx-auto '>
                  <div className='absolute bottom-0 max-w-md px-3 py-3 '>
                    <h1 className='text-3xl font-bold lg:text-5xl text-white drop-shadow-md'>{
                      nav.name === null || nav.name === undefined || nav.name === '' ? nav.title : nav.name
                    }</h1>
                    <p className='text-ellipsis line-clamp-4 my-2 text-2xl'>{nav.overview}</p>
                    <div className='flex items-center gap-5'>
                      <h3 className='text-white text-1xl'>Rating: {Number(nav.vote_average).toFixed(1)} +</h3>
                      <span>|</span>
                      <p>Views: {Number(nav.popularity).toFixed(0)} </p>
                    </div>
                    <a target='_blank' href={`/${nav.media_type}/${nav.id}`}>
                    <button
                      className='bg-white px-5 font-bold text-black rounded-md py-2 mt-4 hover:bg-gradient-to-l from-orange-300 to-yellow-500 shadow-md transition-all hover:scale-125'
                    >Play Now.</button>
                    </a>
                  </div>
                </div>

              </div>
            )
          })
        }
      </div>

    </section>
  )
}
