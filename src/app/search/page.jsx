'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CardData from './midcard'
import {useRouter} from 'next/navigation'


export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [NewSearchQuery, setNewSearchQuery] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [movie, setmovie] = useState('')
  const navigation = useRouter()
  const search = () => {
    if (movie !== '') {
  navigation.push(`/search?q=${movie}`)
  }
  }
  useEffect(() => {
  search();
  }, [movie])

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
  if (!searchQuery) return  <div> <div className='h-24'></div> <div className='justify-center relative'><h2 className='tex-4xl text-center text-white'>Search Any Movie</h2> <input className='absolute ml-[14vw] w-80 rounded-md h-12 mt-10 p-6 placeholder:px-2 placeholder:text-black text-xl lg:ml-[42vw] lg:w-80' onChange={(e) => setmovie(e.target.value)} placeholder='Search Any Movies Here' type='text' /></div> </div>
  if (loading) return <div className="text-center mt-10">Loading...</div>
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
