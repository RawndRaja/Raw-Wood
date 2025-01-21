// pages/about-us.js

import Link from 'next/link';

const AboutUs = () => {
  return (
    <div className="bg-neutral-800 min-h-screen text-white font-sans">
      <div className="h-24"></div>
      {/* Header Section */}
      <header className="text-center py-20 bg-gradient-to-r from-neutral-600 to-neutral-700">
        <h1 className="text-5xl font-extrabold tracking-wide uppercase drop-shadow-lg animate__animated animate__fadeIn">
          About RAW Cinemas
        </h1>
        <p className="mt-4 text-lg opacity-90 animate__animated animate__fadeIn animate__delay-1s">
          Your Ultimate Destination for Free Online Movies
        </p>
      </header>

      {/* What Makes RAW Cinemas Unique Section */}
      <section className="my-20 px-6 lg:px-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-teal-500">
          What Makes RAW Cinemas Unique?
        </h2>
        
        <div className="space-y-8">
          <div className="bg-neutral-700 p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:bg-neutral-600 hover:shadow-xl">
            <p className="text-xl font-bold mb-4">1. Extensive Movie Library</p>
            <ul className="list-disc pl-5 text-lg space-y-3">
              <li>Blockbusters and Classics: Dive into a collection of Hollywood hits, Bollywood gems, indie treasures, and international cinema.</li>
              <li>Constant Updates: Our library is regularly updated to include the latest releases and trending titles.</li>
              <li>Genres for Everyone: Whether you love action, comedy, romance, horror, or documentaries, we’ve got it all.</li>
            </ul>
          </div>

          <div className="bg-neutral-700 p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:bg-neutral-600 hover:shadow-xl">
            <p className="text-xl font-bold mb-4">2. User-Friendly Streaming Experience</p>
            <ul className="list-disc pl-5 text-lg space-y-3">
              <li>High-Quality Streaming: Enjoy movies in HD without interruptions.</li>
              <li>No Sign-Up Required: Start watching instantly without creating an account.</li>
              <li>Device Compatibility: Access RAW Cinemas on your desktop, tablet, or mobile device.</li>
            </ul>
          </div>

          <div className="bg-neutral-700 p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:bg-neutral-600 hover:shadow-xl">
            <p className="text-xl font-bold mb-4">3. Community Features</p>
            <ul className="list-disc pl-5 text-lg space-y-3">
              <li>Ratings and Reviews: Share your thoughts on movies and see what others are saying.</li>
              <li>Watchlists: Save your favorite movies for easy access later.</li>
              <li>Recommendations: Get personalized suggestions based on your viewing history.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose RAW Cinemas Section */}
      <section className="my-20 px-6 lg:px-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-pink-600">
          Why Choose RAW Cinemas?
        </h2>
        <div className="space-y-6">
          <p className="text-lg text-center">
            <strong>Completely Free:</strong> RAW Cinemas offers a premium streaming experience at no cost. No hidden fees, no subscriptions — just movies, anytime you want.
          </p>
          <p className="text-lg text-center">
            <strong>Safe & Legal:</strong> Our platform only hosts legally licensed content, ensuring a safe and secure viewing experience for our users.
          </p>
          <p className="text-lg text-center">
            <strong>Global Access:</strong> No matter where you are, RAW Cinemas brings movies to your screen. All you need is an internet connection.
          </p>
        </div>
      </section>

      {/* Upcoming Features and Events Section */}
      <section className="my-20 px-6 lg:px-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Upcoming Features and Events
        </h2>
        <ul className="list-disc pl-5 text-lg space-y-4">
          <li><strong>Exclusive Online Screenings:</strong> Be the first to watch exclusive premieres and special releases, available only on RAW Cinemas.</li>
          <li><strong>Movie Marathons:</strong> Join themed marathons featuring fan-favorite franchises, directors, and genres.</li>
          <li><strong>Interactive Features:</strong> Engage with fellow movie enthusiasts through live chats, polls, and trivia during screenings.</li>
        </ul>
      </section>

      {/* How to Get Started Section */}
      <section className="my-20 px-6 lg:px-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">
          How to Get Started
        </h2>
        <ol className="list-decimal pl-5 text-lg space-y-3">
          <li><strong>Visit Our Website:</strong> Head to <a href="https://rawcinemas.vercel.app" className="text-blue-400 hover:underline">rawcinemas.vercel.app</a>.</li>
          <li><strong>Browse the Library:</strong> Explore categories or use the search bar to find your movie.</li>
          <li><strong>Click and Play:</strong> Enjoy your chosen film instantly, without any hassle.</li>
        </ol>
      </section>

      {/* Footer Section */}
      <footer className="text-center py-8 bg-neutral-600 text-white">
        <p className="text-lg mb-4">Stay Connected</p>
        <div className="flex justify-center space-x-6">
          <Link href="https://instagram.com/rawcinemas" target="_blank" className="text-2xl text-neutral-400 hover:text-white transform transition-all hover:scale-110">Instagram</Link>
          <Link href="https://twitter.com/rawcinemas" target="_blank" className="text-2xl text-neutral-400 hover:text-white transform transition-all hover:scale-110">Twitter</Link>
          <Link href="https://facebook.com/rawcinemas" target="_blank" className="text-2xl text-neutral-400 hover:text-white transform transition-all hover:scale-110">Facebook</Link>
        </div>
        <p className="mt-6 text-sm text-neutral-400">&copy; 2025 RAW Cinemas. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
