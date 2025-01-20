'use client'
import React, {useEffect, useState} from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import CardData from '../components/MidCard/midcard'
import NextCard from'../components/NextCard/next'
import Loader from '@/app/components/Loader/loader'
export default function Page() {
  const [TvData, setTVData] = useState([])
  const [Page, setPage] = useState('')
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading as true
  const [TotalPage, setTotalPage] = useState('')
  const Params =  usePathname()
  const getImage = async () =>{
    const page = window.location.search.includes("=")
    ? window.location.search.split("=")[1]
    : "1";
    axios.defaults.baseURL = "https://api.themoviedb.org/3";
    axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGU2MzE0YTk1ZTU0NTNiMzIwYWQzNzc1ZmI4MTBkNiIsIm5iZiI6MTczNjk0MzAxOS44MjA5OTk5LCJzdWIiOiI2Nzg3YTVhYmYzOGI1ZDMzMzhiYjBiODkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0`;
    const response = await axios.get(`discover${Params}?page=${page}&api_key=20e6314a95e5453b320ad3775fb810d6`)
    setTVData(response.data.results)
    
    setPage(response.data.page)
    setTotalPage(response.data.total_pages)
    setIsLoading(false); // Set isLoading to false
  }
useEffect(() => {
  getImage();
        
}, [])
  if (isLoading) {
    return (
    <div>
      <div className='h-24 relative mt-40'>
      <div className='absolute left-1/2 -translate-x-1/2'><Loader />
      </div>

      </div>
      </div>
  )
  }

  
  return (
    <div>
      <title>Movies</title>
      <div className='h-24 relative'></div>
      <div className='text-4xl text-center px-4 py-6 font-bold'>Top TV Shows Avilable at: {Params}</div>
      <div>
        <div className='w-full overflow-hidden'>
        <CardData 
  data={TvData || []} 
  param={Params} 
/>
<div className='h-20'>
  <NextCard page={Page} totalPage={TotalPage} genre={'10749'} />
</div>
        </div>
      </div>

    </div>
    
  )
}
