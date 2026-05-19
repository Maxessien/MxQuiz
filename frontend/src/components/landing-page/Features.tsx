import { FaBolt, FaChartLine, FaRegFileAlt, FaTrophy } from "react-icons/fa";

const featuresData = [
  {
    icon: <FaRegFileAlt />,
    title: "Generate from Anything",
    desc: "Upload PDFs, lecture slides, or audio files and let AI create quizzes for you.",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: <FaBolt />,
    title: "Instant & Accurate",
    desc: "Get high-quality questions instantly with smart AI that understands your content.",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: <FaChartLine />,
    title: "Track Your Progress",
    desc: "Monitor your performance, see weak areas, and improve consistently.",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
  },
  {
    icon: <FaTrophy />,
    title: "Compete & Rank",
    desc: "Climb the leaderboard, earn badges, and prove your knowledge.",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
  },
];

const Features = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 z-10 relative">
      {featuresData.map((feature, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 p-6 bg-(--main-tertiary)/50 backdrop-blur-sm border border-(--main-tertiary-light) rounded-2xl hover:bg-(--main-tertiary) transition-colors"
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${feature.iconBg} ${feature.iconColor}`}
          >
            {feature.icon}
          </div>
          <div>
            <h4 className="text-lg font-bold text-(--text-primary-light) mb-2">
              {feature.title}
            </h4>
            <p className="text-sm text-(--text-secondary) leading-relaxed">
              {feature.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;