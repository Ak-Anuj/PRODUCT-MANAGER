import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Home from "./pages/Home"
import Products from "./pages/Products"

import Signup from "./pages/Signup"
import Login from "./pages/Login"

import Verify from "./pages/Verify"

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
 
  { path: "/auth-success", element: <AuthSuccess /> },
 

  { path: "/login", element: <Login /> },
  
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
