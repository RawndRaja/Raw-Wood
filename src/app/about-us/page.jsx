// pages/about-us.js

import Link from 'next/link';

const AboutUs = () => {
  return (
    <div className="bg-neutral-800 min-h-screen text-white font-sans">
      <div className="h-24"></div>
      {/* Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-neutral-700 to-neutral-800 text-center py-24">
        <div className="absolute inset-0 bg-neutral-600 opacity-10 rounded-full blur-3xl transform scale-125"></div>
        <h1 className="text-6xl font-extrabold tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 drop-shadow-lg">
          About RAW Cinemas
        </h1>
        <p className="mt-6 text-lg opacity-90">
          Your ultimate destination for free online movies
        </p>
      </header>

      {/* What Makes RAW Cinemas Unique */}
      <section className="my-20 px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          What Makes RAW Cinemas Unique
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Extensive Movie Library",
              items: [
                "Blockbusters and classics from Hollywood, Bollywood, and beyond.",
                "Constant updates with the latest releases.",
                "Genres for everyone: Action, comedy, romance, and more.",
              ],
            },
            {
              title: "User-Friendly Streaming",
              items: [
                "Enjoy movies in HD without interruptions.",
                "No sign-up required — start instantly.",
                "Compatible with all your devices.",
              ],
            },
            {
              title: "Community Features",
              items: [
                "Share your reviews and ratings with others.",
                "Create watchlists for your favorite movies.",
                "Personalized recommendations just for you.",
              ],
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-neutral-700 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold mb-4 text-teal-400">
                {feature.title}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-300">
                {feature.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose RAW Cinemas */}
      <section className="py-20 px-6 lg:px-20 bg-neutral-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
          Why Choose RAW Cinemas?
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center">
          {[
            {
              title: "Completely Free",
              description:
                "No subscriptions, no fees — enjoy premium streaming entirely free.",
            },
            {
              title: "Safe & Legal",
              description:
                "All content is legally licensed, ensuring safety and security.",
            },
            {
              title: "Global Access",
              description:
                "Stream from anywhere in the world with just an internet connection.",
            },
          ].map((reason, index) => (
            <div
              key={index}
              className="flex-1 p-6 bg-neutral-800 rounded-xl shadow-md hover:shadow-lg transition-shadow hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-purple-400 mb-4">
                {reason.title}
              </h3>
              <p className="text-neutral-300">{reason.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="my-20 px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          Upcoming Features & Events
        </h2>
        <ul className="list-disc list-inside space-y-6 text-lg text-neutral-300">
          <li>
            <strong>Exclusive Online Screenings:</strong> Premieres and special
            releases only on RAW Cinemas.
          </li>
          <li>
            <strong>Movie Marathons:</strong> Themed events for your favorite
            franchises and genres.
          </li>
          <li>
            <strong>Interactive Features:</strong> Engage with live chats,
            polls, and trivia during screenings.
          </li>
        </ul>
      </section>

      {/* How to Get Started */}
      <section className="py-20 bg-neutral-900 text-center">
        <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500">
          How to Get Started
        </h2>
        <div className="text-lg text-neutral-300">
          <p className="mb-4">
            1. <strong>Visit:</strong> Go to{" "}
            <Link href="https://rawcinemas.netlify.app" legacyBehavior={true}>
              <a className="text-blue-400 underline hover:text-blue-500">
                rawcinemas.netlify.app
              </a>
            </Link>
          </p>
          <p className="mb-4">
            2. <strong>Explore:</strong> Browse through categories or use the
            search bar to find your favorite movies.
          </p>
          <p>
            3. <strong>Watch:</strong> Click and enjoy your movie instantly!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-800 py-10">
        <div className="text-center text-neutral-400">
          <p className="text-lg font-medium">Stay Connected</p>
          <div className="flex justify-center space-x-8 my-6">
            {[
              { name: "Instagram", href: "https://instagram.com/rawcinemas" },
              { name: "Twitter", href: "https://twitter.com/rawcinemas" },
              { name: "Facebook", href: "https://facebook.com/rawcinemas" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-teal-400 transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
          <p className="text-sm">&copy; 2025 RAW Cinemas. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
