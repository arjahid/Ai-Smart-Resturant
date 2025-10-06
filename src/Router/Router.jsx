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
      }
    ]
  }
])

export default router