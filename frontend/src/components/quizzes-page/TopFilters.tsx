import { BsGridFill, BsListUl } from "react-icons/bs";
import { FaFire, FaRegClock, FaRobot, FaStar } from "react-icons/fa";
import { MdNewReleases } from "react-icons/md";

const filterOptions = [
  { icon: <FaFire />, label: "Most Popular", active: true },
  { icon: <MdNewReleases />, label: "Newest", active: false },
  { icon: <FaStar />, label: "Top Rated", active: false },
  { icon: <FaRegClock />, label: "Shortest", active: false },
  { icon: <FaRobot />, label: "AI Generated", active: false },
];

const TopFilters = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1 w-full max-w-full">
        {filterOptions.map((opt, i) => (
          <button
            key={i}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 border ${
              opt.active
                ? "bg-(--main-primary) text-white border-(--main-primary-light)"
                : "bg-(--main-tertiary) text-(--text-secondary) border-(--main-tertiary-light) hover:text-(--text-primary-light) hover:border-(--text-secondary-light)"
            }`}
          >
            <span className={opt.active ? "text-white" : "text-(--main-primary-lighter)"}>
              {opt.icon}
            </span>
            {opt.label}
          </button>
        ))}
      </div>

      <div className="hidden lg:flex items-center gap-2 bg-(--main-tertiary) border border-(--main-tertiary-light) rounded-lg p-1 shrink-0">
        <button className="p-1.5 rounded-md bg-(--main-primary)/20 text-(--main-primary-light)">
          <BsGridFill />
        </button>
        <button className="p-1.5 rounded-md text-(--text-secondary) hover:text-(--text-primary-light)">
          <BsListUl />
        </button>
      </div>
    </div>
  );
};

export default TopFilters;