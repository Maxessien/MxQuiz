"use client";

interface StatsProps {
  stats: {
    total_quizzes_created: number;
    total_attempts_taken: number;
    average_score: number;
    total_plays_on_user_quizzes: number;
  };
}

const DashboardStats = ({ stats }: StatsProps) => {
  const statCards = [
    {
      title: "Total Quizzes Created",
      value: stats.total_quizzes_created,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      ),
      colorClass: "text-(--main-primary-light)",
      bgClass: "bg-(--main-primary-light)/10",
    },
    {
      title: "Quizzes Taken",
      value: stats.total_attempts_taken,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      ),
      colorClass: "text-[#3b82f6]", // hardcoded standard blue as requested if needed for variety, but we should prefer vars.
      bgClass: "bg-[#3b82f6]/10",
    },
    {
      title: "Average Score",
      value: `${Math.round(stats.average_score)}%`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      ),
      colorClass: "text-[#eab308]", 
      bgClass: "bg-[#eab308]/10",
    },
    {
      title: "Total Uses (My Quizzes)",
      value: stats.total_plays_on_user_quizzes,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      colorClass: "text-[#10b981]",
      bgClass: "bg-[#10b981]/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {statCards.map((stat, idx) => (
        <div key={idx} className="bg-(--main-tertiary) border border-(--main-tertiary-light) rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-(--text-secondary) font-medium text-sm">{stat.title}</h3>
            <div className={`p-2 rounded-lg ${stat.bgClass} ${stat.colorClass}`}>
              {stat.icon}
            </div>
          </div>
          <div className="text-3xl font-bold text-(--text-primary-light)">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;