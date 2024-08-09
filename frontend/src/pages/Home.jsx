import Features from "@/components/features/features";
import PageLayout from "@/components/PageLayout/pageLayout";
import Hero from "@/components/ui/ui/Hero";
import Cards from "@/components/features/cards";
import FAQS from "@/components/features/faqs";
import FeaturesTwo from "@/components/features/featurestwo";

function Home() {
  return (
    <>
      <PageLayout>
        <Hero />
        <Features />
        <FeaturesTwo />
        <Cards />
        <FAQS />
      </PageLayout>
    </>
  );
}

export default Home;
