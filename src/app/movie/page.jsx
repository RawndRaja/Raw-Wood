'use client'
import React, {useEffect, useState} from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import CardData from '../components/MidCard/midcard'
import NextCard from'../components/NextCard/next'
import Loader from '@/app/components/Loader/loader'
import { genres } from '../components/constants/constants'
import Divider from '@/app/components/Divider/divider'

export default function Page() {
  const [MovieData, setMovieData] = useState([])
  const [Page, setPage] = useState('')
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading as true
  const [TotalPage, setTotalPage] = useState('')
  const [Genre, setGenre] = useState('')
  const [Param, setParam] = useState('');
  const Params =  usePathname()
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    setParam(urlParams || '')
  }
  const getImage = async () =>{
    const page = Param.get('page') || '1';
    const genre = Param.get('genre') || '28'
    axios.defaults.baseURL = "https://api.themoviedb.org/3";
    
    axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGU2MzE0YTk1ZTU0NTNiMzIwYWQzNzc1ZmI4MTBkNiIsIm5iZiI6MTczNjk0MzAxOS44MjA5OTk5LCJzdWIiOiI2Nzg3YTVhYmYzOGI1ZDMzMzhiYjBiODkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0`;
    const response = await axios.get(`discover${Params}?page=${page}&api_key=20e6314a95e5453b320ad3775fb810d6&include_adult=false&include_video=false&language=en-US&primary_release_year=2024&sort_by=popularity.desc&with_genres=${genre}`)
    setMovieData(response.data.results)
    
    setPage(response.data.page)
    setTotalPage(response.data.total_pages)
    setGenre(genre)
    setIsLoading(false); // Set isLoading to false
  }
useEffect(() => {
  getImage();
        
}, [])
  if (isLoading) {
    return (
    <div>
      <div className='h-24 relative mt-40'>
      <div className='absolute left-1/2 -translate-x-1/2'>
      <Loader />
      </div>
      </div>
      </div>
  )
  }

  
  return (
    <div>
      <title>Movies</title>
      <div className='h-24 relative'></div>
      <div className='text-4xl text-center px-4 py-6 font-bold'>Top Movies Avilable at: {Params}</div>

      <div className='hidden sm:flex'>
          <div className='flex flex-row gap-1 md:gap-4 px-4 w-full justify-center items-center'>
          {
          genres.map((genre, index) => {
            return (
            <div key={index}>
              <a href={`?page=${Page}&genre=${genre.id}`}>
              <button className=' border border-neutral-600 text-white px-1 lg:px-5  rounded-md hover:bg-neutral-800 transition-all' >
                {genre.label}
              </button>
              </a>
            </div>
            )
          })
        }
          </div>
      </div>
      <Divider />
      <div>
        <div className='w-full overflow-hidden'>
        <CardData 
  data={MovieData || []} 
  param={Params} 
/>
<div className='h-20'>
  <NextCard page={Page} totalPage={TotalPage} genre={Genre} />
</div>
        </div>
      </div>

    </div>
    
  )
}
