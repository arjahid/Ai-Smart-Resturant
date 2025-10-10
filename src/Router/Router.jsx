import {
  createBrowserRouter,
} from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import MenuCard from '../components/MenuCard'
import AboutUs from '../pages/Home/AboutUs'
import Blog from '../pages/Home/Blog'
import SpecialOffer from '../pages/Home/SpecialOffer'
import AddMenu from '../pages/AddMenu'
import MenuCartDetails from '../pages/MenuCartDetails'
import ChefDashboard from '../pages/Dashboard/Dashboard'
import OrderCard from '../components/OrderCard'
import Login from '../pages/Login'
import Register from '../pages/Home/Register'
import Profile from '../pages/Profile'
import PrivateRouter from './PrivateRouter'
import Dashboard from '../pages/Dashboard/Dashboard'
import ChefRouter from './ChefRouter'
import AdminDashboard from '../pages/Dashboard/AdminDashboard' // added
import User from '../pages/Dashboard/Admin/User'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path:'menu',
        element: <MenuCard></MenuCard>
      },
      {
        path: 'about',
        element: <AboutUs />
      },
      {
        path: 'blog',
        element: <Blog />
      },
      {
        path: 'offers',
        element: <SpecialOffer />
      },
      {
        path:'addmenu',
        // element:<ChefRouter><PrivateRouter><AddMenu></AddMenu></PrivateRouter></ChefRouter>
        element:<ChefRouter><AddMenu></AddMenu></ChefRouter>
      },
      {
        path:'cart',
        element:<PrivateRouter><MenuCartDetails></MenuCartDetails></PrivateRouter>
      },
    
      {
        path:'orders',
        element:<PrivateRouter><OrderCard></OrderCard></PrivateRouter>
      },
      {
        path:'login',
        element:<Login></Login>
      },
      {
        path:'register',
        element:<Register></Register>
      },
      {
        path:'profile',
        element:<PrivateRouter><Profile></Profile></PrivateRouter>
      },
      {
        path:'dashboard',
        element:<PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
      },

      // admin parent route with nested children (renders into AdminDashboard's <Outlet />)
      {
        path: 'admin',
        element: (
          <PrivateRouter>
            <AdminDashboard />
          </PrivateRouter>
        ),
        children: [
          { index: true, element: <div className="p-4">Welcome to Admin Dashboard</div> },
          { path: 'users', element: <div className="p-4">Admin — Users management (replace with real component)<User></User></div> },
          { path: 'orders', element: <div className="p-4">Admin — Orders management (replace with real component)</div> },
          { path: 'reports', element: <div className="p-4">Admin — Reports (replace with real component)</div> },
        ]
      }
    ]
  }
])

export default router