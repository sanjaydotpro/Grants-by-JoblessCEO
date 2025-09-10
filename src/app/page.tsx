import Image from "next/image";
import Link from "next/link";
import NavOne from "@/components/navbar/NavOne";
import HeroOne from "@/components/hero/HeroOne";
import DiscoverCards from "@/components/discovery/DiscoverCards";
import { HeroWaitList } from "@/components/hero/HeroWaitList";
import FooterSlim from "@/components/footer/FooterSlim";
import Discover from "./discover/page";
import { HeroTwo } from "@/components/hero/HeroTwo";

export default function Home() {
  return (
    <div>
      <NavOne />
      <HeroTwo />
    </div>
  );
}
