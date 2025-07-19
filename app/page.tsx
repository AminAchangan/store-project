import NewArrival from "@/components/NewArrival";
import HeroSection from "@/components/HeroSection";
import BrandCollection from "@/components/BrandCollection";
import HomeCollection from "@/components/HomeCollection";
import BestSeller from "@/components/BestSeller";
import PromotionSection from "@/components/PromotionSection";
import FeatureCards from "@/components/FeatureCards";
import NewsFeed from "@/components/NewsFeed";
import NewsLetter from "@/components/NewsLetter";

function Home() {
  return (
    <div>
      <HeroSection />
      <BrandCollection />
      <NewArrival />
      <HomeCollection />
      <BestSeller />
      <PromotionSection />
      <FeatureCards />
      <NewsFeed />
      <NewsLetter />
    </div>
  );
}

export default Home;
