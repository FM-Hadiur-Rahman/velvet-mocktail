import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import FeaturedDrinks from "../components/home/FeaturedDrinks";
import ExperienceSection from "../components/home/ExperienceSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedDrinks />
      <ExperienceSection />
      <Footer />
    </main>
  );
}
