import React from "react"
import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { Home, Package, Search, ChevronDown, LogOut, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { getData } from "@/context/userContext"
import axios from "axios"
import { toast } from "sonner"

const API_URL = import.meta.env.VITE_API_URL

const DashboardLayout = () => {
  const { user, setUser } = getData()
  const navigate = useNavigate()
  const accessToken = localStorage.getItem("accessToken")

  const logoutHandler = async () => {
    try {
      await axios.post(
        `${API_URL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      setUser(null)
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")

      toast.success("Logged out successfully")
      navigate("/login")
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  return (
    <div className="flex h-screen bg-[#F6F7FB]">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#0F172A] text-white flex flex-col p-5">
        <div className="text-xl font-bold mb-6">Product</div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            placeholder="Search"
            className="w-full pl-9 pr-3 py-2 rounded-md bg-[#1E293B] text-sm outline-none"
          />
        </div>

        {/* Navigation */}
        <div className="space-y-3 text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive ? "bg-[#1E293B]" : "hover:bg-[#1E293B]"
              }`
            }
          >
            <Home size={18} />
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive ? "bg-[#1E293B]" : "hover:bg-[#1E293B]"
              }`
            }
          >
            <Package size={18} />
            Products
          </NavLink>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="h-14 bg-white shadow-sm flex items-center justify-end px-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar>
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>
                    {user?.username?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown size={18} />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
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
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-8 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
