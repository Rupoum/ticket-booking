import ComingSoon from "@/components/Home/ComingSoon";
import CurrentlyPlaying from "@/components/Home/CurrentlyPlaying";
import Footer from "@/components/Home/Footer";
import Header2 from "@/components/Home/Header2";
import MainHeader from "@/components/Home/MainHeader";

export default function Home() {
  return (
    <div className="">
      {/* <Header2 /> */}

      {/* <Navbar /> */}
      <MainHeader />
      <CurrentlyPlaying />

      <ComingSoon />
      {/* <AppleCardsCarouselDemo /> */}
      <Footer />
    </div>
  );
}
