'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CardData from './midcard'
import {useRouter} from 'next/navigation'
import Loader from '@/app/components/Loader/loader'


export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [NewSearchQuery, setNewSearchQuery] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [movie, setmovie] = useState('')
  const [recommendation, setrecommendation] = useState([])
  const navigation = useRouter()

  const recommendations = async () => {
    try {
      setLoading(true)
      axios.defaults.baseURL = "https://api.themoviedb.org/3";
      axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGU2MzE0YTk1ZTU0NTNiMzIwYWQzNzc1ZmI4MTBkNiIsIm5iZiI6MTczNjk0MzAxOS44MjA5OTk5LCJzdWIiOiI2Nzg3YTVhYmYzOGI1ZDMzMzhiYjBiODkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0`;
      const response = await axios.get(`trending/all/week?language=en-US&api_key=20e6314a95e5453b320ad3775fb810d6`)
      setrecommendation(response.data.results)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }
  const search = () => {
    if (movie !== '') {
  navigation.push(`/search?q=${movie}`)
  }
  }
  useEffect(() => {
  search();
  }, [movie])
  useEffect(() => {
    recommendations()
  }, [])

  async function Search() {
    try {
      setLoading(true)
      setError(null)
      
      axios.defaults.baseURL = "https://api.themoviedb.org/3"
      const response = await axios.get(`/search/multi?query=${searchQuery}&api_key=20e6314a95e5453b320ad3775fb810d6`)
      // Validate the response structure
      const results = Array.isArray(response.data.results) ? response.data.results : []
      setData(results)
    } catch (err) {
      setError('Failed to fetch results')
      setData([])
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
  
    const intervalId = setInterval(() => {
        const newQueryParam = window.location.search.includes("=")
          ? window.location.search.split("=")[1]
          : "";
      setNewSearchQuery(newQueryParam);
    }, 2000);
  
    return () => {
      clearInterval(intervalId); // Clean up the interval
    };
  }, []);


  useEffect(() => {
    const queryParam = window.location.search.includes("=")
      ? window.location.search.split("=")[1]
      : ""
    setSearchQuery(queryParam || "")
  }, [NewSearchQuery])

  useEffect(() => {
    if (searchQuery) {
      Search()
    }
  }, [searchQuery])
  if (!searchQuery) return (
     <div className='flex flex-col justify-center items-center'>
       <div className='h-24'></div> 
       <div className='justify-center'>
        <h2 className='text-4xl text-center text-white'>Search Any Movie</h2> 
        <input className='w-80 rounded-md h-12 mt-10 p-6 placeholder:px-2 placeholder:text-black text-xl lg:w-80' onChange={(e) => setmovie(e.target.value)} placeholder='Search' type='text' />
        </div> 
        <div className='w-full flex flex-col justify-start items-center mt-10'>
          <h1 className='text-xl text-center'>Recommendations</h1>
          <div>
            <CardData data={recommendation} />
          </div>
        </div>
        <div className='h-52'></div>
        </div>
        )
    if (loading) {
      return (
        <div className='flex justify-center items-center h-screen'>
          <div className="loader"><Loader />
          <h1 className='text-center text-3xl py-4'>Loading...</h1>
          </div>
        </div>
      )
    }
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4">
      <div className='h-24'></div>
      <div className='ml-20'>
        {/* <h1 className='text-3xl text-center -ml-20'>Search movie</h1> */}
        <input className='w-60 px-4 h-12 mt-2 rounded-md  placeholder:text-black lg:bg-transparent lg:border-none lg:outline-none lg:placeholder:text-white' type="text" placeholder='Search Any Movie Here' onChange={(e) => setmovie(e.target.value)} />
      </div>
      <div>
        <h1 className='text-5xl text-center mt-4'>Search Results</h1>
        {searchQuery && (
          <h2 className='text-2xl text-center mt-4'>
            Results for: {decodeURIComponent(searchQuery || "").trim()}
          </h2>
        )}
      </div>
      <div className="mt-8">
        {data.length > 0 ? (
          <CardData data={data} />
        ) : (
          <p className="text-center text-xl">
            {searchQuery ? "No results found" : "Enter a search query to get started"}
          </p>
        )}
      </div>
    </div>
  )
}
