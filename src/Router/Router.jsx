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
import ChefDashboard from '../pages/Dashboard/ChefDashboard'
import OrderCard from '../components/OrderCard'
import Login from '../pages/Login'
import Register from '../pages/Home/Register'

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
        element:<AddMenu></AddMenu>
      },
      {
        path:'cart',
        element:<MenuCartDetails></MenuCartDetails>
      },
      {
        path:'chefdashboard',
        element:<ChefDashboard></ChefDashboard>
      },
      {
        path:'orders',
        element:<OrderCard></OrderCard>
      },
      {
        path:'login',
        element:<Login></Login>
      },
      {
        path:'register',
        element:<Register></Register>
      }
    ]
  }
])

export default router