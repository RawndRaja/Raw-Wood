'use client'
import axios from 'axios';
import React from 'react'
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const logout = async ()=>{
        try {
            const response = await axios.get('/api/Users/logout', {
                url: '/api/Users/logout',
            })
            router.replace('/auth/login');
        } catch (error) {
            console.log(error);
            
        }
        
    }
  return (
    <div>
        <div className="h-24"></div>
        <div>
            <div className='w-screen h-screen flex flex-col justify-center items-center' onSubmit={
                (e) => {
                    e.preventDefault();
                }
            }>
                <div className='flex flex-col gap-8 justify-center items-center'>
                    <h1 className='text-2xl'>Log out Now</h1>
                    <button onClick={
                        logout
                    } className='border border-neutral-400 p-4 bg-neutral-500 hover:bg-neutral-600 transition-all'>Logout Now</button>
                </div>
            </div>
        </div>
    </div>
  )
}
