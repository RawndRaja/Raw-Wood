import React, { use, useRef } from 'react'
import Card from '../card/card'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import './scroll.css'


export default function Scroll({ data, heading, type }) {
    const containerStyle = useRef()
    if (!data) {
        return (
          null
        )
    }
    const handleNext = () =>{
        containerStyle.current.scrollLeft += 250;
    }
    const handlePrev = () => {
        containerStyle.current.scrollLeft -=250;
    }

    return (
        <div>
            <div className="cont mx-auto px-3 my-10 h-100 ">
                <h1 className='text-xl lg:text-2xl font-bold mb-2 px-12 text-white'>{heading}</h1>
                <div className='overflow-hidden relative'>
                    <div ref={containerStyle} className="grid grid-cols-[repeat(auto-fit,250px)] h-[70vh]  gap-4 px-5 grid-flow-col overflow-y-hidden  relative z-10 scroll-smooth scroll-none">
                        {
                            data.map((item, index) => (
                                <Card
                                    key={   item.id || index}
                                    data={item}
                                    index={index + 1}
                                    trending={true}
                                    type={type}
                                />
                            ))
                        }
                    </div>
                    <div className='absolute hidden top-0  justify-between w-full items-center h-full px-2 lg:flex'>
                        <button onClick={handlePrev} className='hover:opacity-75 text-black hover:scale-125 rounded-full bg-white p-1 z-10  text-4xl lg:text-2xl'>
                            <FaAngleLeft />
                        </button>
                        <button onClick={handleNext} className='hover:opacity-75 text-black hover:scale-125 rounded-full bg-white p-1 z-10  text-4xl lg:text-2xl'>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}