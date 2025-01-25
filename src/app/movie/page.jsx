'use client'
import React, {useEffect, useState} from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import CardData from '../components/MidCard/midcard'
import NextCard from'../components/NextCard/next'
import Loader from '@/app/components/Loader/loader'
import { genres } from '../components/constants/constants'
import Divider from '@/app/components/Divider/divider'
import { GiCrossMark } from "react-icons/gi";

export default function Page() {
  const [MovieData, setMovieData] = useState([])
  const [Page, setPage] = useState('')
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading as true
  const [TotalPage, setTotalPage] = useState('')
  const [Genre, setGenre] = useState('')
  const [change, setChange] = useState('')
  const Params =  usePathname()
  const [selectedGenres, setSelectedGenres] = useState([]);


  const getImage = async () =>{
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page') || '1';
    const genre = urlParams.get('genre') || ''
    const genreIds = genre.split(',').map(id => id.trim());
    setSelectedGenres(genreIds);
    axios.defaults.baseURL = "https://api.themoviedb.org/3";
    
    axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGU2MzE0YTk1ZTU0NTNiMzIwYWQzNzc1ZmI4MTBkNiIsIm5iZiI6MTczNjk0MzAxOS44MjA5OTk5LCJzdWIiOiI2Nzg3YTVhYmYzOGI1ZDMzMzhiYjBiODkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0`;
    const response = await axios.get(`discover${Params}?page=${page}&api_key=20e6314a95e5453b320ad3775fb810d6&include_adult=false&include_video=false&language=en-US&primary_release_year=2024&sort_by=popularity.desc&with_genres=${genre || 28}`)
    setMovieData(response.data.results)
    
    setPage(response.data.page)
    setTotalPage(response.data.total_pages)
    setGenre(genre)
    setIsLoading(false); // Set isLoading to false
  }
  useEffect(() => {
    setInterval(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const genre = urlParams.get('genre') || ''
    setChange(genre)

    }, 2000);
  })
useEffect(() => {
  getImage();
        
}, [change])
if (isLoading) {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="loader"><Loader />
      <h1 className='text-center text-3xl py-4'>Loading...</h1>
      </div>
    </div>
  )
}

  
  return (
    <div onChange={(e)=>{e.preventDefault()}} >
      <title>Movies</title>
      <div className='h-24 relative'></div>
      <div className='text-4xl text-center px-4 py-6 font-bold'>Top Movies Avilable at: {Params}</div>

      <div className='hidden sm:flex'>
  <div className='flex flex-row gap-1 md:gap-4 px-4 w-full justify-center items-center'>
    {genres
      .filter(genre => !selectedGenres.includes(genre.id.toString()))
      .map((genre, index) => (
        <div key={index}>
          <a 
            href={`?page=${Page}&genre=${
              selectedGenres.filter(Boolean).length === 0 
                ? genre.id 
                : selectedGenres.filter(Boolean).join(',') + ',' + genre.id
            }`}
            className='inline-block px-1 lg:px-5 py-2 border border-neutral-600 text-white rounded-md transition-all hover:bg-neutral-800'
          >
            {genre.label}
          </a>
        </div>
      ))}
  </div>
</div>
      <Divider />
  
      {Genre.length > 0 &&
        <div className='hidden sm:block text-xl font-bold'>
        <h2 className='text-center text-2xl font-bold underline underline-offset-8'>
          Applied filters
        </h2>
        
        <div className='flex justify-center py-4 items-center'>
          <div className='flex gap-4'>
            {genres
              .filter(genre => selectedGenres.includes(genre.id.toString()))
              .map((genre, index) => (
                <div key={index} className=" px-4 py-2 bg-neutral-800 rounded-md flex gap-1 items-center justify-center">
                  <h2>{genre.label}</h2>
                  <div className="relative w-20  flex flex-row justify-end">
                    {/* button to cancel the qurey */}
                  <button
  onClick={() => {
    const updatedGenre = selectedGenres
      .filter((g) => g !== genre.id.toString()) // Remove the genre ID
      .join(',');

    // Update the query parameters in the URL
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('genre', updatedGenre); // Update the 'genre' parameter
    window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);

    // Update the state to reflect the change
    setSelectedGenres(updatedGenre.split(',').filter(Boolean));
  }}
  className="text-red-500"
>
  <GiCrossMark />
</button>
                    </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className='hidden sm:block'><Divider /></div>
        </div>}
      <div>
        <div className='w-full overflow-hidden'>
        <CardData 
  data={MovieData || []} 
  param={Params} 
/>
<div className='h-20'>
  <NextCard page={Page} totalPage={TotalPage} genre={Genre} type={'movie'} />
</div>
        </div>
      </div>

    </div>
    
  )
}
