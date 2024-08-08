import Features from "@/components/features/features";
import PageLayout from "@/components/PageLayout/pageLayout";
import Hero from "@/components/ui/ui/Hero";
import Cards from "@/components/features/cards";
import FAQS from "@/components/features/faqs";

function Home() {
  return (
    <>
      <PageLayout>
        <Hero />
        <Features />
        <Cards />
        <FAQS />
      </PageLayout>
    </>
  );
}

export default Home;
