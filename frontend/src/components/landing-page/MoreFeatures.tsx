import { FaCheckCircle, FaLayerGroup, FaRegNewspaper, FaShareAlt } from "react-icons/fa";
import { MdOutlineAutoAwesome } from "react-icons/md";

const featuresList = [
  {
    icon: <FaRegNewspaper />,
    title: "AI Quiz Generation",
    desc: "Advanced AI creates relevant questions from your materials.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Detailed Explanations",
    desc: "Understand every answer with clear explanations.",
  },
  {
    icon: <FaLayerGroup />,
    title: "Multiple Question Types",
    desc: "MCQ, True/False, Fill in the blanks, and more.",
  },
  {
    icon: <FaShareAlt />,
    title: "Save & Share",
    desc: "Save your quizzes or share them with friends.",
  },
];

const MoreFeatures = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center pt-12 pb-24 z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--main-tertiary-light) bg-(--main-tertiary)/40 text-(--text-secondary) text-xs font-semibold mb-6 uppercase tracking-widest">
        <MdOutlineAutoAwesome className="text-(--main-primary-lighter)" /> Why Max Quiz?
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-(--text-primary-light)">
        Everything you need to excel
      </h2>
      
      <p className="text-(--text-secondary) max-w-2xl text-lg mb-16">
        Powerful features designed to make learning more effective and enjoyable.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl w-full text-left">
        {featuresList.map((feat, i) => (
          <div key={i} className="flex gap-5">
            <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-(--main-tertiary) border border-(--main-tertiary-light) text-xl text-(--main-primary-lighter)">
              {feat.icon}
            </div>
            <div>
              <h4 className="text-lg font-bold text-(--text-primary-light) mb-2">
                {feat.title}
              </h4>
              <p className="text-(--text-secondary) text-sm leading-relaxed">
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreFeatures;