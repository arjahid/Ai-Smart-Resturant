import FeaturedCard from "../../components/FeaturedCard"
import Footer from "../../components/Footer"
import Hero from "../../components/Hero"
import NavBar from "../../components/NavBar"

const Home = () => {
  return (
    <div className="text-center">
        <NavBar></NavBar>
        <Hero></Hero>
     <FeaturedCard></FeaturedCard>

   <Footer></Footer>
    </div>
  )
}

export default Home
