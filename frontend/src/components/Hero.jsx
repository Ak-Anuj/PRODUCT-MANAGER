const Hero = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border">

      <div className="px-6 py-4 border-b">
        <h2 className="text-sm font-medium text-gray-700">
          Products
        </h2>
      </div>

      <div className="px-6 flex gap-6 text-sm">
        <button
          onClick={() => setActiveTab("published")}
          className={`py-3 border-b-2 ${
            activeTab === "published"
              ? "border-blue-600 text-blue-600 font-medium"
              : "border-transparent text-gray-400"
          }`}
        >
          Published
        </button>

        <button
          onClick={() => setActiveTab("unpublished")}
          className={`py-3 border-b-2 ${
            activeTab === "unpublished"
              ? "border-blue-600 text-blue-600 font-medium"
              : "border-transparent text-gray-400"
          }`}
        >
          Unpublished
        </button>
      </div>

    </div>
  )
}

export default Hero
