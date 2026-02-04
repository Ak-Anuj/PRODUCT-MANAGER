import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import LoginImage from "../assets/loginImage.png"
const API_URL = import.meta.env.VITE_API_URL

const Signup = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
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
                `${API_URL}/user/register`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/verify")
            }

        } catch (error) {
            //  Proper error handling
            const message =
                error.response?.data?.message ||
                "Registration failed. Please try again."

            toast.error(message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAF9F6]">

            {/* LEFT IMAGE SECTION */}
            <div className="hidden lg:flex w-1/2 items-center justify-center p-10">
                <div className="relative w-[520px] h-[720px] rounded-3xl overflow-hidden shadow-2xl">
                    <img
                        src={LoginImage}
                        alt="Product marketing visual"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-10 left-8 text-white text-xl font-semibold leading-tight">
                        Uplist your <br /> product to market
                    </div>
                </div>
            </div>

            {/* SIGNUP FORM */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10 py-10">
                <div className="w-full max-w-md sm:max-w-lg">

                    <h2 className="text-3xl font-bold text-[#0B2A78] mb-8">
                        Create your Productr Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <Label className="font-medium">Full Name</Label>
                            <Input
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="mt-2 h-12"
                                required
                            />
                        </div>

                        <div>
                            <Label className="font-medium">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="mt-2 h-12"
                                required
                            />
                        </div>

                        <div>
                            <Label className="font-medium">Password</Label>
                            <div className="relative mt-2">
                                <Input
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
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
                            disabled={isLoading}
                            className="w-full h-12 bg-[#173A8A] hover:bg-[#122E6B] text-white text-base"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : "Sign Up"}
                        </Button>

                    </form>

                    {/* LOGIN BOX */}
                    <div className="mt-12 border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                        <p className="text-gray-600">
                            Already have a Product Account?
                        </p>
                        <Link
                            to="/login"
                            className="text-[#173A8A] font-semibold hover:underline"
                        >
                            Login Here
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signup
