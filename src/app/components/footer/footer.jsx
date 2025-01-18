import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Links from '../constants/constants'

export default function Footer() {
  return (
    <div className='w-full relative h-16 bg-neutral-500 hidden lg:block bottom-0'>

      <div className='w-full absolute bottom-0 justify-between items-center h-full px-36 lg:flex'>
        <div className='relative'>
          <Link href={'/'} className='flex-shrink-0'>
            <Image className='w-64 h-20 px-2 py-2 mt-6' src={'/images/logo.png'} width={140} height={140} alt='logo' />
          </Link>
        </div>
        <div className='py-1 w-full ml-40'>
          <div>
            <h1>Useful Links</h1>
            <ul className='lg:flex lg:flex-row lg:gap-10' style={{'listStyleType': 'circle'}}>
              {
                Links.map((nav,index)=>{
                  return(
                    <li key={index + 'datas'+ index}><a href={nav.link} key={index+'footerlinks'} className='py-1'>
                      {nav.label}
                      </a>
                      </li> 

                  )
                })
              }
              
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}
