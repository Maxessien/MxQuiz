import Features from "@/src/components/landing-page/Features";
import Hero from "@/src/components/landing-page/Hero";
import MoreFeatures from "@/src/components/landing-page/MoreFeatures";
import PublicAppLayout from "@/src/components/layouts/PublicAppLayout";

const LandingPage = () => {
  return (
    <PublicAppLayout>
      <div className="flex flex-col items-center w-full min-h-screen text-(--text-primary) overflow-hidden font-sans">
        <div className="w-full max-w-7xl px-6 md:px-12 py-16 flex flex-col gap-24">
          <Hero />
          <Features />
          {/* <Stats /> */}
          <MoreFeatures />
        </div>
      </div>
    </PublicAppLayout>
  );
};

export default LandingPage;
