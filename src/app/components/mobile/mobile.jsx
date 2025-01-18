 'use client'
import React from 'react'
import constants from '@/app/components/constants/constants'

export default function Mobile() {
  return (
    <div className='lg:hidden pb-1 lg:p-0 bg-neutral-500 h-16 bg-opacity-50 fixed bottom-0 w-full z-40 opacity-70 backdrop-blur-3xl'>
        <div className="container">

            <div className="links flex justify-between items-center h-full">
                    {
                       constants.map((nav, index)=>{
                        return (
                            <a href={nav.link} key={index+'mobilenavigation'} className={`py-2 px-3 h-full items-center flex-col justify-center` }>
                               <div className="text-2xl px-2">{nav.Icon}</div> 
                                <p className='text-sm'>{nav.label}</p>
                            </a>
                          )
                       }
                      )
                    }
            </div>

        </div>
    </div>
  )
}
