import { FaHome , FaSearch } from 'react-icons/fa';
import { MdConnectedTv } from "react-icons/md";
import { RiMovie2AiLine } from "react-icons/ri";

export const Links = [
    {
        label: 'Home',
        link: '/',
    },
    {
        label: "TV Shows",
        link: "/tv",
    },
    {
        label: 'Movie',
        link: '/movie',
    }
]
export const genres = [
    {
        label: 'Action',
        id: 28
    },
    {
        label: 'Thriller',
        id: 53
    },
    {
        label: 'Drama',
        id: 18
    },
    {
        label: 'Comedy',
        id: 35
    },
    {
        label: 'Horror',
        id: 27
    },
    {
        label: 'Romance',
        id: 10749
    },
    {
        label: 'Sci-Fi',
        id: 878
    },
    {
        label: 'Adventure',
        id: 12
    },
    {
        label: 'Mystery',
        id: 9648
    }
];

export const whiteIconPaths = {
    '/tv': true,
    '/movie': true,
    '/search': true,
    '/genre': true
};

const Constants = [
    {
      label: 'Home',
      link: '/',
      Icon: FaHome,  // Pass component reference, not JSX
      basePath: '/'
    },
    {
      label: "TV Shows",
      link: "/tv?page=1",
      Icon: MdConnectedTv,  // Pass component reference, not JSX
      basePath: '/tv'
    },
    {
      label: 'Movies',
      link: '/movie?page=1',
      Icon: RiMovie2AiLine,  // Pass component reference, not JSX
      basePath: '/movie'
    },
    {
      label: "Search",
      link: '/search',
      Icon: FaSearch,  // Pass component reference, not JSX
      basePath: '/search'
    },
];

export const shouldUseWhiteIcons = (pathname) => {
    const basePath = '/' + pathname.split('/')[1];
    return whiteIconPaths[basePath];
};

export default Constants;