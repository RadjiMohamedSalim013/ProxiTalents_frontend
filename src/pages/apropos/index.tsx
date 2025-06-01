import React from "react";
import PresentationSection from "../../components/apropos/PresentationSection";
import ValeursSection from "../../components/apropos/ValeursSection";
import VisionSection from "../../components/apropos/VisionSection";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";


export default function AproposPage() {
  return (
    <div className="min-h-screen ">
        <Header/>
      <PresentationSection />
      <ValeursSection   />
      <VisionSection/>
      <Footer />
    </div>
  );
}
