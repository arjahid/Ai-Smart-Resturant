import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar'
import Hero from '../Hero'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 w-11/12 mx-auto flex flex-col">
      <header className="bg-white shadow-sm">
       
        <NavBar></NavBar>
        <Hero></Hero>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 AI Smart Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
