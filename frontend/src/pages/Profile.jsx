import React from "react"
import { getData } from "@/context/userContext"

const Profile = () => {
    const { user } = getData()

    return (
        <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8">

            <h1 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                My Profile
            </h1>

            <div className="bg-white shadow rounded-xl p-4 sm:p-6 space-y-3 max-w-2xl">

                <p className="text-sm sm:text-base">
                    <strong>Name:</strong> {user?.username}
                </p>

                <p className="text-sm sm:text-base">
                    <strong>Email:</strong> {user?.email}
                </p>

                <p className="text-sm sm:text-base">
                    <strong>Verified:</strong> {user?.isVerified ? "Yes" : "No"}
                </p>

            </div>

        </div>
    )
}

export default Profile
