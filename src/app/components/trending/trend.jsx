import React from 'react'
import { useSelector } from 'react-redux'
import Scroll from '../ScrollBar/scroll'


export default function Trend() {
    const trendingUrl = useSelector(state => state.RawWoods.bannerData)
    
  return (
    <Scroll data={trendingUrl} heading="Trending Searches" type={'trending'} />
  )
}