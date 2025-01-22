'use client'
import React,{useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import Divider from '@/app/components/Divider/divider'
import Loader from '@/app/components/Loader/loader'
import Routecard from './midcard'

export default function Page() {
  
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [movie, setmovie] = useState([])
  const [moviecrew, setmoviecrew] = useState([])
  const [Knownas, setKnownas] = useState([])
  const path = useParams()  
  const imageUrl = useSelector(state => state.RawWoods.imageUrl)


  const person = async () => {
    try {
      setLoading(true)
      axios.defaults.baseURL = "https://api.themoviedb.org/3";
    
      axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGU2MzE0YTk1ZTU0NTNiMzIwYWQzNzc1ZmI4MTBkNiIsIm5iZiI6MTczNjk0MzAxOS44MjA5OTk5LCJzdWIiOiI2Nzg3YTVhYmYzOGI1ZDMzMzhiYjBiODkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0`;
      const response = await axios.get(`person/${path.id}?api_key=20e6314a95e5453b320ad3775fb810d6&language=en-US`)
      const movieData = await axios.get(`person/${path.id}/movie_credits?api_key=20e6314a95e5453b320ad3775fb810d6&language=en-US`)
      setmovie(movieData.data.cast)
      setmoviecrew(movieData.data.crew)
      setData(response.data)
      setKnownas(response.data?.also_known_as)
      setLoading(false)
    } catch (error) {
      setError(true)
    }
    
  }
  useEffect(() => {
    person();
  }, [])
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className="loader"><Loader />
        <h1 className='text-center text-3xl py-4'>Loading...</h1>
        </div>
      </div>
    )
  }
  if (error) {
    return (
      <div className='flex'>
        <div className='flex flex-col justify-center items-center h-screen'>
          <h1>Something went wrong.</h1>
        </div>
      </div>
    )
  }

  return (
    <div>
    <div>
      <div className="h-24"></div>
      <div className='container mx-auto px-5 py-16 lg:py-0 flex flex-col gap-5 justify-center lg:flex-row'>

    <div className='w-30 h-30 flex flex-row justify-center items-center lg:block'>
    <Image className='object-cover w-30 h-30 rounded-lg md:rounded-t-lg md:rounded-r-lg md:rounded-l-none' src={imageUrl + data?.profile_path} width={250} height={300} alt='Person Image' />
    </div>
    <div className='flex flex-col lg:container rounded-lg mx-4 md:ml-4'>
    <div className='relative bg-neutral-700 bg-opacity-70 px-6 py-4 text-white rounded-lg'>
      <h1 className='text-2xl font-bold'>Name: {data?.name}</h1>
      <Divider />
      <h2 className='text-sm lg:text-xl'>Profession: {data?.known_for_department}</h2>
      {
        data?.birthday &&
        <div>
          <Divider />
          <h3>Birth Date: {data?.birthday}</h3>
        </div>
      }
      {
         data?.place_of_birth && 
         <div>
         <Divider />
         <h3>Place of Birth: {data?.place_of_birth}</h3>
       </div>

      }
      <Divider />

      {
        data?.deathday &&
        <div>
        <Divider />
        <h3>Deathday: {data?.deathday}</h3>
        </div>
      }

      <div className='flex text-ellipsis line-clamp-1'>

      <h3 className='flex flex-col gap-1 text-sm md:flex-row md:gap-4 lg:text-xl'> Known as:
        {
        Knownas?.map((data, index) => {
          return(
          <div className='text-sm lg:text-lg'key={index}>
            {data}
          </div>
          )
        }) || "Unknown"
          
        }
      </h3>
      </div>
      <Divider />
      <p className='text-sm lg:text-lg'>{data?.biography}</p>
    </div>
    </div>
      </div>
    </div>
    <div className='flex flex-col  w-full justify-center items-center'>
      <div>
      <h2 className='text-5xl py-4 text-center justify-center'>Cast: </h2>
        <div>
          <div>
            <Routecard data={movie} param='movie' />
          </div>
        </div>
        </div>
        <div>
          <h2 className='text-5xl py-4 text-center justify-center'>Crew: </h2>
          <div>
          <Routecard data={moviecrew} param='movie' />
          </div>
        </div>
    </div>
    </div>
  )
}
