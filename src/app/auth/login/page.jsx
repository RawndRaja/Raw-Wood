'use client'
import { useState } from "react"
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
export default function DrawerDemo() {
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setterms] = useState(false);
    const [Data, setData] = useState({
      email: "",
      password: "",
      remember: false,
    })
  const action = async () => {
    if(!terms) {
      toast.error('Please accept terms and conditions', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      } else {
      if( Data.email === "" || Data.password === "" ){
        toast.error('Please fill all fields', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
      } else {
      toast.success('Logging in', { 
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });}
      }
  }
  
    return (
      <div>
        <div className="z-50">
              <ToastContainer 
              position="top-right"
              autoClose={5000}
              limit={5}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              draggable
              zIndex={9999}
              theme="dark"
              transition={Bounce}
              />
        </div>
  
      <div>
        <div className="bg-neutral-900 flex flex-col justify-center items-center h-screen">
        <h1 className="text-center text-4xl mt-32 items-center font-bold">Sign In</h1>
  
        <div>
          <div className="flex flex-col justify-center items-center mt-2 px-20">
           <form className="flex flex-col justify-center items-center mt-2 gap-3 sm:border border-white px-0 sm:px-6 py-8 rounded-lg" onSubmit={(e)=>{e.preventDefault()}}>
            <label htmlFor="">Email</label>
           <input value={Data.email} onChange={(e)=>{ setData({ ...Data,email: e.target.value })}} className="outline-none border border-white bg-transparent h-10 w-80 px-3 text-xl rounded-md" placeholder="Email" type="email" />
           <label htmlFor="">Password</label>
           <div className="flex flex-row items-center w-auto ml-4">
           <input value={Data.password} onChange={(e)=>{ setData({ ...Data ,password: e.target.value })}} className="outline-none border border-white bg-transparent h-10 w-80 px-3 pr-10 text-xl rounded-md" placeholder="Password" type={showPassword? "text" : "password"} />
           <button onClick={
            ()=>{
              setShowPassword(!showPassword)
            }
           } className="relative -left-8"> {showPassword ? <FaEyeSlash /> : <FaEye />} </button>
           </div>
           <div>
        <label htmlFor="">
        <a className="w-32 text-sm text-blue-600 hover:text-xs transition-all " href="">Forget Password ?</a>
        </label>
      </div>
          
           <div className="flex items-center space-x-2">
            
        <input onClick={
          ()=>{
            setData({ ...Data, remember: !Data.remember })
          }
        } type="checkbox" className="bg-white -ml-24 lg:-ml-[6.1vw] " />
        <label
          htmlFor="terms"
          className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me
        </label>
      </div>
      <div className="flex items-center space-x-2">
            
            <input onChange={
              ()=>{
                setterms(!terms)
              }
            } type="checkbox" className=""/>
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
  
           <button onClick={action} className=" border-black bg-neutral-500 w-60 rounded-md py-2 mt-2 text-white font-semibold hover:bg-neutral-800 hover:scale-105 transition-all" >Sign In</button>
           </form>
          </div>
        </div>
        <div className="h-[1vh] lg:h-[5vh]"></div>
  
  
        </div>
      </div>
      </div>
    )
  }
  