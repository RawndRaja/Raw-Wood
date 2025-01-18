
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