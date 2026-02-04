import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoginImage from "../assets/loginImage.png"

const ChangePassword = () => {
    const { email } = useParams()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const handleChangePassword = async () => {
        setError("")
        setSuccess("")

        if (!newPassword || !confirmPassword) {
            setError("Please fill in all fields")
            return
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        try {
            setIsLoading(true)
            const res = await axios.post(
                `http://localhost:8000/user/change-password/${email}`,
                { newPassword, confirmPassword }
            )

            setSuccess(res.data.message)
            setTimeout(() => {
                navigate('/login')
            }, 2000)

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong")
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
                        Secure your <br /> account today
                    </div>
                </div>
            </div>

            {/* RIGHT FORM SECTION */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10 py-10">

                <div className="w-full max-w-md sm:max-w-lg">

                    <h2 className="text-3xl font-bold text-[#0B2A78] mb-6">
                        Change Password
                    </h2>

                    <p className="text-gray-500 mb-6">
                        Set a new password for{" "}
                        <span className="font-semibold text-black">{email}</span>
                    </p>

                    {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}

                    {success && (
                        <p className="text-green-600 text-sm mb-4">{success}</p>
                    )}

                    <div className="space-y-6">

                        <Input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="h-12"
                        />

                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="h-12"
                        />

                        <Button
                            className="w-full h-12 bg-[#173A8A] hover:bg-[#122E6B] text-white"
                            disabled={isLoading}
                            onClick={handleChangePassword}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                    Changing...
                                </>
                            ) : "Change Password"}
                        </Button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default ChangePassword
