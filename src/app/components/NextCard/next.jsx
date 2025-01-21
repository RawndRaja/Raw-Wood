import React from 'react'

export default function Next({page , totalPage, genre}) {
  return (
    <div className='flex justify-center mt-6 px-6'>
        <div className='flex flex-row gap-2 md:gap-6 lg:gap-8'>
            <a className='cursor-pointer border bg-neutral-600 text-white px-4  rounded-md hover:bg-neutral-800 transition-all' href={`/movie?page=1&genre=${genre}`}>First</a>
            <a className='cursor-pointer border bg-neutral-600 text-white px-4  rounded-md hover:bg-neutral-800 transition-all' href={`?page=${(page <=0 ? '1' :page-1 )}&genre=${genre}`}> {page - 1} </a>
            <a className='cursor-pointer border bg-neutral-600 text-white px-4  rounded-md hover:bg-neutral-800 transition-all' href={`?page=${(page>500? page : page )}&genre=${genre}`}> {page} </a>
            <a className='cursor-pointer border bg-neutral-600 text-white px-4  rounded-md hover:bg-neutral-800 transition-all' href={`?page=${(page>500? page : page+1 )}&genre=${genre}`}> {page + 1} </a>
            <h3 className='border border-white w-10 text-center rounded-md bg-neutral-600 text-2xl'>...</h3>
            <a className='cursor-pointer border bg-neutral-600 text-white px-4  rounded-md hover:bg-neutral-800 transition-all' href={`?page=${(totalPage<=500 ? totalPage : 500)}&genre=${genre}`}>{totalPage} </a>
        </div>
    </div>
  )
}
