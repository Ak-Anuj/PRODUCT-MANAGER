import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Home from "./pages/Home"
import Products from "./pages/Products"

import Signup from "./pages/Signup"
import Login from "./pages/Login"
import VerifyEmail from "./pages/VerifyEmail"
import Verify from "./pages/Verify"
import ForgotPassword from "./pages/ForgotPassword"
import VerifyOTP from "./pages/VerifyOTP"
import ChangePassword from "./pages/ChangePassword"
import AuthSuccess from "./pages/AuthSuccess"
import Profile from "./pages/Profile"


import DashboardLayout from "./components/DashboardLayout"
import ProtectedRoute from "./components/ProtectedRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "products",
        element: <Products />
      }
    ]
  },

  // Auth Pages
  { path: "/signup", element: <Signup /> },
  {path: "/profile", element: <Profile /> },

  { path: "/login", element: <Login /> },
  { path: "/verify", element: <VerifyEmail /> },
  { path: "/verify/:token", element: <Verify /> },
  { path: "/auth-success", element: <AuthSuccess /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-otp/:email", element: <VerifyOTP /> },
  { path: "/change-password/:email", element: <ChangePassword /> }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
