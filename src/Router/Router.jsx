import {
  createBrowserRouter,
} from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import MenuCard from '../components/MenuCard'
import AboutUs from '../pages/Home/AboutUs'

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
      }
    ]
  }
])

export default router