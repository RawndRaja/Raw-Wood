import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';

const Video = ({ mediaId, mediaType, close }) => {
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setIsLoading(true);
       
        const response = await axios.get(
          `https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos?api_key=20e6314a95e5453b320ad3775fb810d6`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGU2MzE0YTk1ZTU0NTNiMzIwYWQzNzc1ZmI4MTBkNiIsIm5iZiI6MTczNjk0MzAxOS44MjA5OTk5LCJzdWIiOiI2Nzg3YTVhYmYzOGI1ZDMzMzhiYjBiODkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0`
            }
          }
        );

        
        if (response.data.results && response.data.results.length > 0) {
          setVideoData(response.data);
        } else {
          setError('No videos found');
        }
      } catch (error) {
        console.error('Error fetching video:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (mediaId) {
      fetchVideo();
    }
  }, [mediaId, mediaType]);

  if (isLoading) {
    return (
      <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'>
        <div className='text-white'>Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'>
        <div className='text-white'>Error: {error}</div>
      </section>
    );
  }

  const trailer = videoData?.results.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
<section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative'>
        <button 
          onClick={close} 
          className='absolute -right-2 -top-8 text-3xl z-50 text-white hover:text-red-500 transition-colors duration-200'
          aria-label="Close video"
        >
          <IoClose />
        </button>
        {trailer ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            className='w-full h-full'
            allowFullScreen
            title="trailer"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            No trailer available
          </div>
        )}
      </div>
    </section>
  );
};

export default Video;