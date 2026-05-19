import { FaBolt, FaBrain, FaUserGraduate } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { MdOutlineAutoAwesome } from "react-icons/md";
import Button from "../reusable/Button";
import DemoWidget from "./DemoWidget";

const Hero = () => {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between gap-16 mt-10">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-(--main-primary) rounded-full opacity-10 blur-[150px] pointer-events-none -z-10" />

      {/* Left Content */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 w-full max-w-2xl z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--main-primary-light)/30 bg-(--main-primary)/10 text-(--main-primary-lighter) text-xs font-semibold mb-6">
          <MdOutlineAutoAwesome /> AI-Powered • Smart Learning
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-(--text-primary-light)">
          Study Smarter. <br />
          <span className="bg-clip-text text-transparent bg-[linear-gradient(to_right,var(--main-primary-light),var(--main-primary-lighter))]">
            Quiz Better.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-(--text-secondary) mb-10 max-w-xl leading-relaxed">
          Generate quizzes from your lecture notes, PDFs, or audio in seconds.
          Practice, learn, and track your progress anytime, anywhere.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
          <Button size="large" color="primary" className="w-full sm:w-auto">
            Generate Quiz Now <MdOutlineAutoAwesome className="ml-2" />
          </Button>
          <Button
            size="large"
            color="tertiary"
            className="w-full sm:w-auto text-(--text-primary-light)! border-(--text-secondary-light)/40! hover:bg-(--main-tertiary-light)!"
          >
            Explore Quizzes <FiBookOpen className="ml-2" />
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm font-medium text-(--text-secondary)">
          <div className="flex items-center gap-2">
            <FaBrain className="text-(--main-primary-lighter)" /> AI-Powered
          </div>
          <div className="flex items-center gap-2">
            <FaBolt className="text-(--main-primary-lighter)" /> Instant Results
          </div>
          <div className="flex items-center gap-2">
            <FaUserGraduate className="text-(--main-primary-lighter)" /> For Every Student
          </div>
        </div>
      </div>

      {/* Right Content - Interactive Widget */}
      <div className="flex-1 w-full flex justify-center lg:justify-end z-10 perspective-1000">
        <div className="transform lg:rotate-y-[-5deg] lg:rotate-x-[5deg]">
            <DemoWidget />
        </div>
      </div>
    </section>
  );
};

export default Hero;