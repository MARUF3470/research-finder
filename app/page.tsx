import FeatureCards from "@/components/HomeComponents/FeatureCards";
import IntroductionComponent from "@/components/HomeComponents/IntroductionComponent";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <IntroductionComponent/>
      <FeatureCards/>
    </div>
  );
}
