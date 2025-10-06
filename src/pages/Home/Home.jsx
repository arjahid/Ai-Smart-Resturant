const Home = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Welcome to AI Smart Restaurant
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Experience the future of dining with our AI-powered restaurant management system
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Smart Menu</h3>
          <p className="text-gray-600">AI-curated menu recommendations based on preferences</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Quick Orders</h3>
          <p className="text-gray-600">Fast and efficient ordering system</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
          <p className="text-gray-600">Live order tracking and notifications</p>
        </div>
      </div>
    </div>
  )
}

export default Home
