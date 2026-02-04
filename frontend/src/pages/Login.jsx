import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getData } from '@/context/userContext'
import Google from "../assets/googleLogo.png"
import LoginImage from "../assets/loginImage.png"
const API_URL = import.meta.env.VITE_API_URL

const Login = () => {
    const { setUser } = getData()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        setIsLoading(true)

        const res = await axios.post(
            `${API_URL}/user/login`,
            formData,
            {
                headers: { "Content-Type": "application/json" }
            }
        )

        if (res.data.success) {
            navigate('/')
            setUser(res.data.user)
            localStorage.setItem("accessToken", res.data.accessToken)
            toast.success(res.data.message)
        }

    } catch (error) {
        console.log(error)

        if (error.response?.data?.message) {
            toast.error(error.response.data.message)
        } else {
            toast.error("Login failed")
        }

    } finally {
        setIsLoading(false)
    }
   }


    return (
  <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAF9F6]">

    {/* LEFT SIDE */}
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-10">

      <div className="relative w-full max-w-[520px] h-[400px] sm:h-[520px] lg:h-[720px] rounded-3xl overflow-hidden shadow-2xl">

        <img
          src={LoginImage}
          alt="Product marketing visual"
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-6 left-6 text-white text-lg sm:text-xl font-semibold leading-tight">
          Uplist your <br /> product to market
        </div>

      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10 py-10">

      <div className="w-full max-w-md sm:max-w-lg">

        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2A78] mb-6 sm:mb-8 text-center lg:text-left">
          Login to your Product Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

          <div>
            <Label className="text-black font-medium">
              Email or Phone number
            </Label>
            <Input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email or phone number"
              className="mt-2 h-12"
              required
            />
          </div>

          <div>
            <Label className="text-black font-medium">
              Password
            </Label>
            <div className="relative mt-2">
              <Input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="h-12 pr-12"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ?
                  <EyeOff className="w-5 h-5 text-gray-500" /> :
                  <Eye className="w-5 h-5 text-gray-500" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-[#173A8A] hover:bg-[#122E6B] text-white text-base"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : "Login"}
          </Button>

          <Button
            type="button"
            onClick={() => window.open(`${API_URL}/auth/google`, "_self")}
            variant="outline"
            className="w-full h-12 flex items-center justify-center gap-2"
          >
            <img src={Google} alt="Google login" className="w-5" />
            Login with Google
          </Button>

        </form>

        {/* Signup Box */}
        <div className="mt-12 sm:mt-16 border border-gray-200 rounded-xl p-5 sm:p-6 text-center shadow-sm">
          <p className="text-gray-600 text-sm sm:text-base">
            Don't have a Product Account?
          </p>
          <Link
            to="/signup"
            className="text-[#173A8A] font-semibold hover:underline"
          >
            SignUp Here
          </Link>
        </div>

      </div>

    </div>
  </div>
)


}

export default Login
