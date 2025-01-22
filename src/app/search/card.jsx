import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSelector } from 'react-redux'

export default function Card({ data, media}) {
  const imageUrl = useSelector(state => state.RawWoods.imageUrl);
  // ${imageUrl}${data.poster_path}` || `${imageUrl}${data.profile_path}

  if (!data) return null;

  return (
    <div className="relative group sm:justify-center items-center lg:px-0 cursor-pointer w-80 lg:w-full">
      <Link href={`/${media}/${data.id}`}>
        <div className="overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
          <Image
            src={imageUrl+(`${data.poster_path}` ||`${data.profile_path}` ) } // Fallback image
            alt={data.title || "Movie poster"}
            width={300}
            height={450}
            className="object-cover w-80 h-96 lg:h-full lg:w-full"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-white font-bold text-lg truncate">
              {data.title || data.name || "Unknown Title"}
            </h3>
            <p className="text-gray-300 text-sm">
              {data.release_date ? new Date(data.release_date).getFullYear() : "N/A"}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">
                ⭐ {data.vote_average ? data.vote_average.toFixed(1) : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
