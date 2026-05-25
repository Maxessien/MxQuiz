import { FaLayerGroup, FaRegCompass, FaRegStar } from "react-icons/fa";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  reviewsCount: number;
}

const QuizTabs = ({ activeTab, setActiveTab, reviewsCount }: Props) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: <FaRegCompass /> },
    { id: "reviews", label: `Reviews (${reviewsCount})`, icon: <FaRegStar /> },
    { id: "related", label: "Related Quizzes", icon: <FaLayerGroup /> }
  ];

  return (
    <div className="flex items-center w-full gap-6 border-b border-(--main-tertiary-light) overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 pb-4 text-sm font-semibold whitespace-nowrap transition-colors relative ${
            activeTab === tab.id
              ? "text-(--main-primary-light)"
              : "text-(--text-secondary) hover:text-(--text-primary-light)"
          }`}
        >
          <span className={activeTab === tab.id ? "text-(--main-primary-light)" : "text-(--text-secondary-light)"}>
            {tab.icon}
          </span>
          {tab.label}
          
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-(--main-primary-light) rounded-t-full shadow-[0_-2px_10px_var(--main-primary)]" />
          )}
        </button>
      ))}
    </div>
  );
};

export default QuizTabs;