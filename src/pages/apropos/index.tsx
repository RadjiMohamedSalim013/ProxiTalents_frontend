import PresentationSection from "../../components/apropos/PresentationSection";
import ValeursSection from "../../components/apropos/ValeursSection";
import VisionSection from "../../components/apropos/VisionSection";


export default function AproposPage() {
  return (
    <div className="min-h-screen ">
      <PresentationSection />
      <ValeursSection   />
      <VisionSection/>
    </div>
  );
}
