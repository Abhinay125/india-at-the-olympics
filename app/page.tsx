import HeroSection from "@/components/hero/HeroSection";
import IntroSection from "@/components/hero/IntroSection";
import MedalStats from "@/components/medals/MedalStats";
import MedalChart from "@/components/charts/MedalChart";
import MedalCategories from "@/components/medals/MedalCategories";
import OlympicTimeline from "@/components/olympics/OlympicTimeline";
import FeaturedAthletes from "@/components/athletes/FeaturedAthletes";
import VideoSection from "@/components/videos/VideoSection";
import WinterSection from "@/components/olympics/WinterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <MedalStats />
      <MedalChart />
      <MedalCategories />
      <OlympicTimeline />
      <FeaturedAthletes />
      <VideoSection />
      <WinterSection />
    </>
  );
}