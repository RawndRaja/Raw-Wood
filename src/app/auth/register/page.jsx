'use client'
import { useEffect, useState } from "react"
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import axios from "axios"
import { useRouter } from "next/navigation"

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [terms, setTerms] = useState(false)
  const [confirmPassword, setconfirmPassword] = useState('')
  const [passwordchecker, setpasswordchecker] = useState(false)
  const [ShowConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    FullName: "",
    email: "",
    password: "",
  })
  const router = useRouter()
  const match = () =>{
    if(!formData.password){
        setpasswordchecker(false)
        return
    }
    if(formData.password === confirmPassword){
        setpasswordchecker(true)

    }else{
        setpasswordchecker(false)
  }
}
  useEffect(()=>{
    match();
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!terms) {
      toast.error('Please accept terms and conditions', toastConfig)
      return
    }

    if (!formData.email || !formData.password) {
      toast.error('Please fill all fields', toastConfig)
      return
    }
    if (!passwordchecker) {
        toast.error('Passwords do not match', toastConfig)
        return 
        
    }
    try {
      toast.warning('Creating Account', toastConfig )

      await axios.post("/api/Users/signUp", formData,{
        baseURL: "",
      })
      
      toast.success('Account Created Successfully', toastConfig)
      router.push('/auth/login')
    } catch (error) {
      toast.error('Error logging in', toastConfig)
      console.error('Login error:', error)
    }
  }


  return (
    <div className="min-h-screen bg-neutral-900">
      <title>Sign In Page</title>
      <ToastContainer {...toastConfig} limit={5} zIndex={9999} />

      <div className="flex flex-col items-center justify-center h-full pt-16 mt-10">
        <h1 className="text-4xl font-bold mb-2">Sign Up</h1>

        <form onSubmit={handleLogin} className="w-full flex flex-col h-full max-w-md p-8 space-y-6 sm:border border-white rounded-lg">
       
        <div className="space-y-2">
            <label htmlFor="username">username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={(e)=>{
                setFormData({...formData, username: e.target.value})
              }}
              className="w-full p-3 bg-transparent border border-white rounded-md outline-none"
              placeholder="Username"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e)=>{
                setFormData({...formData, email: e.target.value})
              }}
              className="w-full p-3 bg-transparent border border-white rounded-md outline-none"
              placeholder="Email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="text"
              type="text"
              value={formData.FullName}
              onChange={(e)=>{
                setFormData({...formData, FullName: e.target.value})
              }}
              className="w-full p-3 bg-transparent border border-white rounded-md outline-none"
              placeholder="FullName"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e)=>{
                    setFormData({...formData, password: e.target.value})
                }}
                className="w-full p-3 bg-transparent border border-white rounded-md outline-none pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Confirm Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={ShowConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={
                    (e)=>{
                        setconfirmPassword(e.target.value)
                        match()

                    }
                }
                className="w-full p-3 bg-transparent border border-white rounded-md outline-none pr-10"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!ShowConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {ShowConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div id="error"> { passwordchecker ? null : <div className="text-red-500">Passwords do not match</div>} </div>
          </div>

          <a href="#" className="text-sm text-blue-600 hover:text-xs transition-all mt-20">
            Forget Password?
          </a>

          <div className="space-y-4">

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="bg-white"
              />
              <span className="text-sm">Accept terms and conditions</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-neutral-500 text-white font-semibold rounded-md hover:bg-neutral-800 hover:scale-105 transition-all"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}