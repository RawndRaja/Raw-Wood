import moment from 'moment/moment'
import React from 'react'
import { v4 as uuid } from "uuid";
import { useSelector } from 'react-redux'
import Link from 'next/link';
const id = uuid()

export default function Card({data, trending, index, type}) {
    const imageUrl = useSelector(state => state.RawWoods.imageUrl)
    return (  
      <Link target='_blank' href={`/${type === 'tv' ? "tv" : data.media_type || 'movie'}/${data.id}`}>
    <div className="flex-shrink-0 hover:scale-105 mt-10 relative overflow-hidden min-w-[230px]">
        <img className='rounded-sm object-cover ' key={id} loading='lazy' width={300} height={300} src={imageUrl + data?.poster_path} alt="Card Image" />
      <div className='absolute top-4 bg-neutral-700 opacity-70 px-3 py-4 rounded-r-full'>
        {
          trending && (
            <div key={id}>
              #{index} {type}
            </div>
          )
        }
      </div>
      <div className='absolute bottom-0 h-14 backdrop-blur-3xl w-full bg-neutral-600 py-1 px-4'>
        <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{data?.title || data?.name}</h2>
        <div className='justify-between flex items-center'>
        <h3 className='-py-1'>{moment(data.release_date).format('MMMM Do YYYY')}</h3>
        <p className='bg-neutral-700 px-6 h-6 py-1 -mt-8 w-40 text-white rounded-full text-xs  '>Rating: {Number(data.vote_average).toFixed(1)}</p>
        </div>
      </div>
    </div>
    </Link>
    )
}