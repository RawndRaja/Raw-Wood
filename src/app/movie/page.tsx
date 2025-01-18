'use client'
import React, {useEffect, useState} from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import CardData from '../components/MidCard/midcard'
import NextCard from'../components/NextCard/next'
export default function Page() {
  const [MovieData, setMovieData] = useState([])
  const [Page, setPage] = useState('')
  const [TotalPage, setTotalPage] = useState('')
  const Params =  usePathname()
  const getImage = async () =>{
    const page = window.location.search.includes("=")
    ? window.location.search.split("=")[1]
    : "1";
    axios.defaults.baseURL = "https://api.themoviedb.org/3";
    
    axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGU2MzE0YTk1ZTU0NTNiMzIwYWQzNzc1ZmI4MTBkNiIsIm5iZiI6MTczNjk0MzAxOS44MjA5OTk5LCJzdWIiOiI2Nzg3YTVhYmYzOGI1ZDMzMzhiYjBiODkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0`;
    const response = await axios.get(`discover${Params}?page=${page}&api_key=20e6314a95e5453b320ad3775fb810d6`)
    setMovieData(response.data.results)
    
    setPage(response.data.page)
    setTotalPage(response.data.total_pages)
  }
useEffect(() => {
  getImage();
        
}, [])

  
  return (
    <div>
      <title>Movies</title>
      <div className='h-24 relative'></div>
      <div className='text-4xl text-center px-4 py-6 font-bold'>Top Movies Avilable at: {Params}</div>
      <div>
        <div className='w-full overflow-hidden'>
        <CardData 
  data={MovieData || []} 
  param={Params} 
/>
<div className='h-20'>
  <NextCard page={Page} totalPage={TotalPage} />
</div>
        </div>
      </div>

    </div>
    
  )
}
