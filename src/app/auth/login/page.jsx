'use client'
import { useState } from "react"
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  })
  const router = useRouter()

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

    try {
      toast.warning('Logging in', toastConfig )

      await axios.post("/api/Users/login", formData,{
        baseURL: "",
      })
      
      toast.success('Successfully logged in', toastConfig)
      router.push('/')
    } catch (error) {
      toast.error('Error logging in', toastConfig)
      console.error('Login error:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <title>Sign In Page</title>
      <ToastContainer {...toastConfig} limit={5} zIndex={9999} />

      <div className="flex flex-col items-center justify-center h-full pt-16 mt-10">
        <h1 className="text-4xl font-bold mb-2">Sign In</h1>

        <form onSubmit={handleLogin} className="w-full flex flex-col h-full max-w-md p-8 space-y-6 sm:border border-white rounded-lg">
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 bg-transparent border border-white rounded-md outline-none"
              placeholder="Email"
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
                onChange={handleInputChange}
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

          <a href="#" className="text-sm text-blue-600 hover:text-xs transition-all mt-20">
            Forget Password?
          </a>

          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleInputChange}
                className="bg-white"
              />
              <span className="text-sm">Remember me</span>
            </label>

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
            Sign In
          </button>
         <div className="flex flex-row gap-2 flex-grow"> <p>Don't have account?</p>
         <Link className="text-blue-600" href={'/auth/register'}>Create an account</Link></div>
        </form>
      </div>
    </div>
  )
}