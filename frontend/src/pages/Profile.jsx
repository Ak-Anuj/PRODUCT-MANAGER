import React from "react"
import { getData } from "@/context/userContext"

const Profile = () => {
    const { user } = getData()

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>

            <div className="bg-white shadow rounded-xl p-6 space-y-3">
                <p><strong>Name:</strong> {user?.username}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Verified:</strong> {user?.isVerified ? "Yes" : "No"}</p>
            </div>
        </div>
    )
}

export default Profile
