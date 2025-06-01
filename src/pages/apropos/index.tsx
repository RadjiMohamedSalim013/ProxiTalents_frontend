
import React from "react";
import PresentationSection from "@/components/apropos/PresentationSection";
import ValeursSection from "@/components/apropos/ValeursSection";
import VisionSection from "@/components/apropos/VisionSection";
import TeamSection from "@/components/apropos/TeamSection";

export default function AproposPage() {
  return (
    <div className="min-h-screen p-8 space-y-20">
      <PresentationSection />
      <ValeursSection />
      <VisionSection />
      <TeamSection />
    </div>
  );
}
