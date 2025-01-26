'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment'
import Divider from '@/app/components/Divider/divider'
import Scroll from '@/app/components/ScrollBar/scroll'
import VideoPlay from '@/app/components/Video/video'
import Loader from '@/app/components/Loader/loader'
import { FaRegHeart } from "react-icons/fa";  

export default function Page() {
  const imageUrl = useSelector(state => state.RawWoods.imageUrl); // Fallback image
  const Params = useParams();
  const [data, setData] = useState({}); // Initialize data as an empty object
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading as true
  const [Cast, setCast] = useState({})
  const [Crew, setCrew] = useState({})
  const [Recommendation, setRecommendation] = useState([])
  const [similar, setSimilar] = useState([])
  const [showVideo, setShowVideo] = useState(false);
  const [scale, setscale] = useState(false)
  const [email, setemail] = useState('')
  const getImage = async () => {
    try {
      axios.defaults.baseURL = "https://api.themoviedb.org/3";
      axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGU2MzE0YTk1ZTU0NTNiMzIwYWQzNzc1ZmI4MTBkNiIsIm5iZiI6MTczNjk0MzAxOS44MjA5OTk5LCJzdWIiOiI2Nzg3YTVhYmYzOGI1ZDMzMzhiYjBiODkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0`;
      const response = await axios.get(`movie/${Params.id}?api_key=20e6314a95e5453b320ad3775fb810d6`);
      const Crew = await axios.get(`movie/${Params.id}/credits?api_key=20e6314a95e5453b320ad3775fb810d6`);
      const recommendation = await axios.get(`movie/${Params.id}/recommendations?api_key=20e6314a95e5453b320ad3775fb810d6`)
      const similar = await axios.get(`movie/${Params.id}/similar?api_key=20e6314a95e5453b320ad3775fb810d6`)

  
      setSimilar(similar.data.results)

      setCast(Crew.data.cast)

      setCrew(Crew.data.crew)

      setData(response.data); // Update the data state
      setRecommendation(recommendation.data.results)
      
      setIsLoading(false); // Set isLoading to false
    } catch (error) {
      console.log(error);
    }
  };
  const userDetails = async ()=>{
    try {
      axios.defaults.baseURL = "";
      axios.defaults.headers.common = '';
      const response = axios.get('/api/Users/user')
      console.log('user',response.data.user.email)
      axios.defaults.baseURL = "https://api.themoviedb.org/3";
      axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGU2MzE0YTk1ZTU0NTNiMzIwYWQzNzc1ZmI4MTBkNiIsIm5iZiI6MTczNjk0MzAxOS44MjA5OTk5LCJzdWIiOiI2Nzg3YTVhYmYzOGI1ZDMzMzhiYjBiODkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0`;
    } catch (error) {
      console.log(error)

    }
  }
  const handlePlayVideo = ()=>{
    setShowVideo(true)

  }

  useEffect(() => {
    getImage();
    userDetails()
  }, [Params.id]); // Add Params.id as a dependency to re-run the effect when the id changes
  
const FavAction = async () =>{
  try {
    if (data && data.id) {
      const FavData = {
        id: data.id,
        genre: data.genres || [],
        title: data.title || '',
        action: scale ? 'remove' : 'add'
      };
      axios.defaults.baseURL = "";
      await axios.post("/api/Users/favourate", FavData)

    }
  } catch (error) {
    console.log(error+ 'data')
  }
}


  const formatMovieTitle = (title) => {
  return title
    ?.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')  // Remove special characters
    .replace(/\s+/g, '-')          // Replace spaces with dashes
    .trim();                       // Remove trailing spaces
};

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
    
    <div>
        <div popover='auto' className='rounded-lg w-full sm:w-96 bg-neutral-700 backdrop-blur-md h-96 text-white lg:w-[45vw] lg:h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' id="suggest">
      <div className='text-center lg:text-xl' >
      Watch Your Favaourate movies Now.⚡ <br />
      Top Movies 🎥 Avilable at Raw Cinemas.
        <div className='mt-6'>
          <h3>Recommended for Indian Movies 🎥 and Hollywood Movies 🎥.</h3>
          <a className='mt-2' 
            href={`https://www.watch-movies.com.pk/?s=${(data.title || data.name)}`} 
            target='_blank'>
            <button className='mt-3 w-80 h-16 lg:h-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'>
              Watch Now. <br /> at watch-movies.com.pk
            </button>
          </a>
        </div>
        
        <div className='mt-4'>
          <h3>Recommended for Hollywood Movies.🎥</h3>
          <a className='mt-2' 
            href={`https://cineb.rs/search/${formatMovieTitle(data.title || data.name)}`} 
            target='_blank'>
            <button className='mt-3 h-16 lg:h-full w-80 py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'>
              Watch Now. <br /> at cineb.rs
            </button>
          </a>
        </div>
      </div>
    </div>
      <div className='h-20 lg:h-20'></div>
      <div className='w-full h-[400px] relative hidden lg:block'>
        <div className='w-full h-full '>
        <img
          src={imageUrl+data?.backdrop_path } // Fallback image
          alt={data.title || "Movie poster"}
          className="object-cover w-full h-full "
          loading="lazy"
        />
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
      </div>
      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col gap-5 lg:flex-row'>
          <div className=' relative mx-auto ml-8 sm:ml-0 lg:ml-0 lg:-mt-28 lg:mx-0 w-fit min-w-60'>
            <img           
          src={imageUrl+(`${data.poster_path}` ||`${data.profile_path}` ) } // Fallback image
          alt={data.title || "Movie poster"}
          className="object-cover w-60 h-80 rounded-md "
          loading="lazy" />
         
        <div>
        <button onClick={()=>handlePlayVideo(data)} className='mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'>Watch Trailer</button>
            <button onClick={
              ()=>{
                setscale(!scale)
                FavAction();
              }
            } className='mt-3 w-full py-2 px-4 text-center bg-blue-200 text-black rounded font-bold text-lg  transition-all flex flex-row gap-10 items-center justify-center'><p>{scale? "Added TO Favourate" :"Add TO Favourate"}</p><div><FaRegHeart className={scale ? 'scale-150 transition-all text-red-600': null}/></div></button>
            <button popoverTarget='suggest' className='mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-yellow-400 to-orange-500 hover:scale-105 transition-all'>Play Now</button>
          <a href={`https://hdhub4u.spa/?s=${data.title || data.name}`} target='_blank' ><button className='mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-green-500 to-green-700 hover:scale-105 transition-all'>Download Now</button></a>
        </div>

          </div>
          <div className='px-8'>
            <h2 className=' text-3xl font-bold text-white lg:px-0'> {data.title || data.name} </h2>
            <p className=' text-xl text-neutral-400'> {data.tagline} </p>
            <Divider />
            <div className='flex flex-row gap-3 items-center lg:text-xl'>
              <p>
                Rating: {Number(data.vote_average).toFixed(1)}+
              </p>
              <span>|</span>
              <p>
                Views: {Number(data.vote_count)}
              </p>
              <span>|</span>
              <p>
                Duration: {Number(data?.runtime)} minutes
              </p>
            </div>
            <Divider />
            <div className='flex flex-row gap-4'>Genres: 
                  {
                    (data.genres).map((data, index)=>{
                      return(
                        <div key={index}>
                          <h2> {data.name} </h2>
                        </div>
                      )
                    })
                  }
            </div>
            <Divider />
            <div>
              <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
              <p> {data.overview} </p>
              <Divider />
              <div className='flex flex-row gap-3 items-center my-3 text-center'>
                <p>
                  Status: {data?.status}
                </p>
                <span>|</span>
                <p>
                  Release Date: {moment(data?.release_date).format("MMM D YYYY")}
                </p>
                <span>|</span>
                <p>
                revenue: {Number(data?.revenue)}
                </p>
              </div>
              <Divider />

            </div>
            <div className=''> 
            <div className='flex gap-1 '>Director : 
  {
    Crew.filter(data => data.job === "Director")
      .map((data) => data.name || data.original_name)
      .join(', ')
  }
</div>

<Divider />

<div className='flex gap-1'>Writer :
  {
    Crew.filter(data => data?.job === "Dialogue" || data?.job === "Writer" || data?.known_for_department === "Writing")
      .map((data) => data.name || data.original_name)
      .join(', ')
  }
</div>
<Divider />
<div className='flex gap-1 '>Producers : 
  {
    Crew.filter(data => data.department === "Production")
      .map((data) => data.name || data.original_name)
      .join(', ')
  }
</div>
<Divider />

            </div>

            <h2 className='text-xl '>Cast:</h2>
            <div>
              
              <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4'>  
                {
                  Cast.map((data, index)=>{
                    return (
                      <div key={index}>
                      <a href={`/person/${data.id}`}>
                      <div>
                        <img src={`${imageUrl}${data.profile_path}`} alt="Cast Actor" className='w-24 object-cover h-20 rounded-full' />
                      </div>
                      <p className='font-bold text-sm items-center'>{data?.name}</p>
                      </a>
                      </div>
                    )
                  })
                }

              </div>
            </div>

          </div>

      </div>
                <div>
                <Scroll data={similar} heading={"Similar Movies"} type={"movie"} />
                <Scroll data={Recommendation} heading={"Recommended Movies"} type={"movie"} />
                </div>
                <div>
                {
            showVideo && (
              <VideoPlay
              onClick={() => setShowVideo(false)}
  mediaId={Params.id} // Make sure this is a number
  mediaType={'movie'} // Should be either 'movie' or 'tv'
  close={() => setShowVideo(false)}
/>
            )
          }
                </div>
    </div>
  );
}
