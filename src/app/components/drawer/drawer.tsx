"use client"

import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"


import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]

export default function DrawerDemo() {
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="ml-[2vw] w-10 h-10 sm:ml-4   mt-[0] lg:ml-[1vw] lg:mt-[-2vw]"><svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg></Button>
      </DrawerTrigger>
      <DrawerContent className="bg-neutral-900">
      < DrawerTitle className="text-center text-4xl mt-2">Sign In</DrawerTitle>

      <div>
        <div className="flex flex-col justify-center items-center mt-2">
         <form className="flex flex-col justify-center items-center mt-2 gap-3 border border-white px-6 py-8 rounded-lg" onSubmit={(e)=>{e.preventDefault()}}>
          <label htmlFor="">Email</label>
         <input className="outline-none border border-white bg-transparent h-10 w-80 px-3 text-xl rounded-md" placeholder="Email" type="email" />
         <label htmlFor="">Password</label>
         <input className="outline-none border border-white bg-transparent h-10 w-80 px-3 text-xl rounded-md" placeholder="Password" type="password" />
         <div>
      <label htmlFor="">
      <a className="w-32 text-sm text-blue-600 hover:text-xl transition-all " href="">Forget Password ?</a>
      </label>
    </div>
         <div className="flex items-center space-x-2">
          
      <Checkbox className="bg-white -ml-24 lg:-ml-[6.6vw] " id="terms" />
      <label
        htmlFor="terms"
        className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Remember me
      </label>
    </div>
    <div className="flex items-center space-x-2">
          
          <Checkbox className="bg-white" id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>

         <button className=" border-black bg-neutral-500 w-60 rounded-md py-2 mt-2 text-white font-semibold hover:bg-neutral-800 hover:scale-105 transition-all" >Button</button>
         </form>
        </div>
      </div>
      <div className="h-[10vh] lg:h-[10vh]"></div>


      </DrawerContent>
    </Drawer>
  )
}
