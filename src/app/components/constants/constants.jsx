
import React from 'react'
import { FaHome } from "react-icons/fa";
import { MdConnectedTv } from "react-icons/md";
import { RiMovie2AiLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

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
const Constants = [
    {
        label: 'Home',
        link: '/',
        Icon: <FaHome />,
    },
    {
        label: "TV Shows",
        link: "/tv?page=1",
        Icon: <MdConnectedTv />,

    },
    {
        label: 'Movies',
        link: '/movie?page=1',
        Icon: <RiMovie2AiLine />,

    },  
    {
        label: "Search",
        link: '/search',
        Icon: <FaSearch />,

    }

]
export default Constants