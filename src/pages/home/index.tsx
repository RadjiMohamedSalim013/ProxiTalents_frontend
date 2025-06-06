import HeroSection from '../../components/home/HeroSection';
import AProposSection from '../../components/home/ApercuAproposSection';
import CategoriesServicesSection from '../../components/home/CategoriesServicesSection';
import CommentCaMarcheSection from '../../components/home/CommentCaMarcheSection';
import CallToActionSection from '../../components/home/CallToActionSection';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import JoinCommunitySection from '../../components/home/JoinCommunitySection';





const AccueilPage = () => {
   return (
    <div className="min-h-screen">
      <HeroSection />
      <AProposSection />
      <CategoriesServicesSection />
      <CommentCaMarcheSection />
      <CallToActionSection />
      <TestimonialsSection />
      <JoinCommunitySection/>
    
    </div>
  );
}


export default AccueilPage;
