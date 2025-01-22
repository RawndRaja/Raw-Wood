'use client'
import axios from "axios";
import '@/app/components/page.css'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBannerData, setimageUrl } from "@/lib/rawWoodSlice";
import Banner from "./components/Banner/Banner";
import Trending from './components/trending/trend'
import Scroll from '../app/components/ScrollBar/scroll'
import Loader from './components/Loader/loader'


export default function Home() {
  const [nowPlayingdata, setnowPlayingdata] = useState([])
  const [trending, setTrending] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading as true
  const [tv, setTv] = useState([])
  const [onAir, setOnAir] = useState([])

  const dispatch = useDispatch()
  const get = async () => {
    try {
      axios.defaults.baseURL = "https://api.themoviedb.org/3";
      axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.AccessToken}`;
      const response = await axios.get('/trending/all/week?api_key=20e6314a95e5453b320ad3775fb810d6')
      dispatch(setBannerData(response.data.results))
      setIsLoading(false); // Set isLoading to false
    } catch (error) {
      console.log(error)
    }
  }
  const getImage = async () =>{
try {
  setIsLoading(true); // Set isLoading to true
  const response = await axios.get('/configuration?api_key=20e6314a95e5453b320ad3775fb810d6')
  dispatch(setimageUrl(response.data.images.secure_base_url+"original"))
  setIsLoading(false); // Set isLoading to false
} catch (error) {
  console.log(error);
  
}
  }
  const nowPlaying = async () => {
    try {
      setIsLoading(true); // Set isLoading to true
      const response = await axios.get('/movie/now_playing?api_key=20e6314a95e5453b320ad3775fb810d6')
      setnowPlayingdata(response.data.results)
      setIsLoading(false); // Set isLoading to false
    } catch (error) {
      console.log(error);
      
    }
  
  }
  const topRated = async() => {
      try {
        setIsLoading(true); // Set isLoading to true
        const response = await axios.get('movie/top_rated?api_key=20e6314a95e5453b320ad3775fb810d6')
        setTrending(response.data.results)
        setIsLoading(false); // Set isLoading to false
      } catch (error) {
        console.log(error);
      }
  }
  const upcomingMovies = async() => {
    try {
      setIsLoading(true); // Set isLoading to true
      const response = await axios.get('movie/upcoming?api_key=20e6314a95e5453b320ad3775fb810d6')
      setUpcoming(response.data.results)
      setIsLoading(false); // Set isLoading to false
    } catch (error) {
      console.log(error);
    }
  }
  const Tv = async() => {
    try {
      setIsLoading(true); // Set isLoading to true
      const response = await axios.get('/trending/tv/week?api_key=20e6314a95e5453b320ad3775fb810d6')
      setTv(response.data.results)
      setIsLoading(false); // Set isLoading to false
    } catch (error) {
      console.log(error);
    }
  }
  const onAirData = async() => {
    try {
      setIsLoading(true); // Set isLoading to true
      const response = await axios.get('tv/on_the_air?api_key=20e6314a95e5453b320ad3775fb810d6')
      setOnAir(response.data.results)
      setIsLoading(false); // Set isLoading to false  
    } catch (error) {
      console.log(error);
    }
    
  }
useEffect(() => {
  get();
  getImage();
  nowPlaying();
  topRated();
  upcomingMovies();
  Tv();
  onAirData();

},[])
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
<>
<div>

    <Banner />
    <Trending />
    <Scroll data={tv} heading={"Top TV Shows"} type={"tv"}/>
    <Scroll data={nowPlayingdata} heading={'Playing Now'} type={'Playing'}/>
    <Scroll data={onAir} heading={'On Air'} type={"tv"}/>
    <Scroll data={trending} heading={'Top Rated'} type={'Top Rated'}/>
    <Scroll data={upcoming} heading={'Upcoming Movies'} type={"movie"}/>

    </div>
</>
  );
}
