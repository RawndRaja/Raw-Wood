import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Image from 'next/image';
import axios from 'axios';
import './card.css';

export default function Card({ data, media}) {
  const imageUrl = useSelector(state => state.RawWoods.imageUrl);
  // ${imageUrl}${data.poster_path}` || `${imageUrl}${data.profile_path}
  const [VideoId, setVideoId] = useState([]);
  const [IsHoverdVideo, setIsHoverdVideo] = useState(false);
  const [Loading, setLoading] = useState(false)
  const [isError, setisError] = useState(false)
  
  if (!data) return null;
  
  const CardHover = async () => {
    setIsHoverdVideo(true)
    setLoading(true)
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${data.id}/videos?api_key=20e6314a95e5453b320ad3775fb810d6`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGU2MzE0YTk1ZTU0NTNiMzIwYWQzNzc1ZmI4MTBkNiIsIm5iZiI6MTczNjk0MzAxOS44MjA5OTk5LCJzdWIiOiI2Nzg3YTVhYmYzOGI1ZDMzMzhiYjBiODkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0`
        }
      }
    )
    const FilteredData = (response.data.results || [])?.filter(
      video => video.type === 'Trailer' && video.site === 'YouTube'
    );

    setVideoId(FilteredData[0] ? FilteredData[0] : undefined)

    setLoading(false)
  }
  useEffect(() => {
    if (VideoId === undefined) {
      setisError(true)
    }
  }, [VideoId])

  return (
    <div className="relative group sm:justify-center items-center lg:px-0 cursor-pointer w-80 lg:w-full">
      <Link href={`/${media}/${data.id}`}>
      <div onMouseEnter={CardHover} onMouseLeave={() => {
          setIsHoverdVideo(false);
        }
        } className="overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
          <Image
            draggable={false}
            src={imageUrl+(data.poster_path ||data.profile_path) } // Fallback image
            alt={data.title || "Movie poster"}
            width={300}
            height={450}
            className="object-cover w-80 h-96 lg:h-full lg:w-full"
            loading="lazy"
          />
          {VideoId && IsHoverdVideo && !Loading &&
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full ">
              <iframe
                src={`https://www.youtube.com/embed/${VideoId.key}?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&rel=0`}
                className='w-full h-full absolute top-0 -z-100 '
                allowFullScreen
                allow="autoplay; fullscreen"
                title={`trailer`}
              />
            </div>
          }
          {
            Loading &&
            <div className='w-full h-full bg-opacity-50 absolute top-0 bg-neutral-600'>
              <div className="banter-loader">
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
              </div>
            </div>
          }
          {
            isError && (
                <div className='bg-neutral-600 bg-opacity-50 absolute top-0 h-full w-full '>
                  <h1 className='text-3xl absolute top-1/2'>No preview available</h1>
                </div>
            )
          }
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-white font-bold text-lg truncate">
              {data.title || data.name || "Unknown Title"}
            </h3>
            {media === 'person' ? 
              <p className="text-gray-300 text-sm">
                {data.known_for_department}
              </p> : 
          <div>
            <p className="text-gray-300 text-sm">
              {data.release_date ? new Date(data.release_date || data.first_air_date).getFullYear() : "N/A"}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">
                ⭐ {data.vote_average ? data.vote_average.toFixed(1) : "N/A"}
              </span>
            
            </div>
          </div>
}
          </div>
        </div>
      </Link>
    </div>
  )
}
