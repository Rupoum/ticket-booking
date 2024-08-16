import ComingSoon from "@/components/Home/ComingSoon";
import CurrentlyPlaying from "@/components/Home/CurrentlyPlaying";
import Header2 from "@/components/Home/Header2";
import MainHeader from "@/components/Home/MainHeader";

import { Navbar } from "@/components/Home/Navbar";

export default function Home() {
  return (
    <div className="">
      {/* <Header2 /> */}

      {/* <Navbar /> */}
      <MainHeader />
      <CurrentlyPlaying />

      <ComingSoon />
      {/* <AppleCardsCarouselDemo /> */}
    </div>
  );
}
