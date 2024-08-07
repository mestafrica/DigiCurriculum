import Features from "@/components/features/features";
import PageLayout from "@/components/PageLayout/pageLayout";
import Hero from "@/components/ui/ui/Hero";
import Features from "@/components/features/features";

function Home() {
  return (
    <>
      <PageLayout>
        <Hero />
      </PageLayout>
      <Features />
    </>
  );
}

export default Home;
