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


export default function Page() {
  const imageUrl = useSelector(state => state.RawWoods.imageUrl); // Fallback image
  const Params = useParams();
  const [data, setData] = useState({}); // Initialize data as an empty object
  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading as false
  const [Cast, setCast] = useState([])
  const [Crew, setCrew] = useState([])
  const [Recommendation, setRecommendation] = useState([])
  const [similar, setSimilar] = useState([])
  const [showVideo, setShowVideo] = useState(false);
  

  const getImage = async () => {
    try {
      setIsLoading(true); // Set isLoading to true
      axios.defaults.baseURL = "https://api.themoviedb.org/3";
      axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGU2MzE0YTk1ZTU0NTNiMzIwYWQzNzc1ZmI4MTBkNiIsIm5iZiI6MTczNjk0MzAxOS44MjA5OTk5LCJzdWIiOiI2Nzg3YTVhYmYzOGI1ZDMzMzhiYjBiODkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0`;
      const response = await axios.get(`tv/${Params.id}?api_key=20e6314a95e5453b320ad3775fb810d6`);
      const Crew = await axios.get(`tv/${Params.id}/credits?api_key=20e6314a95e5453b320ad3775fb810d6`);
      const recommendation = await axios.get(`tv/${Params.id}/recommendations?api_key=20e6314a95e5453b320ad3775fb810d6`)
      const similar = await axios.get(`tv/${Params.id}/similar?api_key=20e6314a95e5453b320ad3775fb810d6`)

      setRecommendation(recommendation.data.results)

      setSimilar(similar.data.results)

      setCast(Crew.data.cast)

      setCrew(Crew.data.crew)

      setData(response.data); // Update the data state
      
      setIsLoading(false); // Set isLoading to false
    } catch (error) {
      console.log(error);
    }
  };  
  const handlePlayVideo = ()=>{
    setShowVideo(true)

  }

  useEffect(() => {
    getImage();
  }, [Params.id]); // Add Params.id as a dependency to re-run the effect when the id changes

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
      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col gap-5 lg:flex-row '>
          <div className=' relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
            <img           
          src={imageUrl+(`${data.poster_path}` ||`${data.profile_path}` ) } // Fallback image
          alt={data.title || "Movie poster"}
          className="object-cover w-60 h-80 rounded-md "
          loading="lazy" />
          <button onClick={()=>handlePlayVideo(data)} className='mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'>Play Now</button>  
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

            <h1 className='text-xl '>Cast:</h1>
            <div>
              <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4'>
                
                {
                  Cast.filter(el => el?.profile_path).map((data, index)=>{
                    return (
                      <div key={index}>

                      <div>
                        <img src={`${imageUrl}${data.profile_path}`} alt="Cast Actor" className='w-24 object-cover h-20 rounded-full' />
                      </div>
                      <p className='font-bold text-xl'>{data?.name}</p>

                      </div>
                    )
                  })
                }

              </div>
            </div>

          </div>
      </div>
              <div>
                <Scroll data={similar} heading={"Similar TV Shows"} type={"tv"} />
                <Scroll data={Recommendation} heading={"Recommended TV Shows"} type={"tv"} />
              </div>
              <div>
              {
            showVideo && (
              <VideoPlay
              onClick={() => setShowVideo(false)}
  mediaId={Params.id} // Make sure this is a number
  mediaType={'tv'} // Should be either 'movie' or 'tv'
  close={() => setShowVideo(false)}
/>
            )
          }
              </div>

    </div>
  );
}
