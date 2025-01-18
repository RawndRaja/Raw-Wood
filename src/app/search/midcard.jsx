import React from 'react';
import Card from '../search/card';

export default function CardDatas({ data, param  }) {
  // Check if data exists and is an array
  if (!data || !Array.isArray(data)) {
    console.error('Data is not valid:', data);
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 px-8 justify-center items-center">
      {data.map((item) => (
        <div 
          // Using unique movie ID from TMDB as key
          key={`movie-${item.id}`}
          className="card-wrapper"
        >
          <Card 
          media={item.media_type}
            data={item} 
          />
        </div>
      ))}
    </div>
  );
}