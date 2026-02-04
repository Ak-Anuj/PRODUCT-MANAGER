import { BookA, LogOut, User } from "lucide-react"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { getData } from "@/context/userContext"
import axios from "axios"
import { toast } from "sonner"

const Navbar = () => {
  const { user, setUser } = getData()
  const navigate = useNavigate()
  const accessToken = localStorage.getItem("accessToken")

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (res.data.success) {
        setUser(null)
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        toast.success(res.data.message)
        navigate("/login")
      }
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-3 relative z-50">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-bold text-[#0B2A78]">
          Product <span className="text-orange-500">●</span>
        </h1>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="text-gray-600 hover:text-black">
            Home
          </Link>

          <Link to="/products" className="text-gray-600 hover:text-black">
            Products
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      {user?.username?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-gray-500 text-sm">⌄</span>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/products" className="flex items-center w-full">
                    <BookA className="mr-2 h-4 w-4" />
                    Products
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="text-[#0B2A78] font-semibold">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
