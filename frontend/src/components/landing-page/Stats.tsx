const statsData = [
  { value: "10K+", label: "Quizzes Taken" },
  { value: "5K+", label: "Happy Students" },
  { value: "50K+", label: "Questions Generated" },
  { value: "100+", label: "Universities & Schools" },
];

const Stats = () => {
  return (
    <section className="py-10 px-8 rounded-3xl border border-(--main-tertiary-light) bg-(--main-tertiary)/30 backdrop-blur-md relative z-10 w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-(--main-tertiary-light)/50">
        {statsData.map((stat, i) => (
          <div
            key={i}
            className={`flex flex-col items-center text-center ${
              i === 0 ? "border-l-0" : ""
            } ${i % 2 === 0 ? "border-l-0 md:border-l" : ""}`}
          >
            <h4 className="text-4xl md:text-5xl font-extrabold text-(--main-primary-light) mb-2">
              {stat.value}
            </h4>
            <p className="text-sm font-medium text-(--text-secondary)">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;