import FeaturedCard from "../../components/FeaturedCard"
import Footer from "../../components/Footer"
import Hero from "../../components/Hero"
import NavBar from "../../components/NavBar"
import AboutUs from "./AboutUs"
import Blog from "./Blog"
import SpecialOffer from "./SpecialOffer"

const Home = () => {
  return (
    <div className="text-center">
        <NavBar></NavBar>
        <Hero></Hero>
     <FeaturedCard></FeaturedCard>
     <SpecialOffer></SpecialOffer>
     <Blog></Blog>
     <AboutUs></AboutUs>

   <Footer></Footer>
    </div>
  )
}

export default Home
