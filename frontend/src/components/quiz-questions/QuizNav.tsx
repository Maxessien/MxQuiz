import { QuizQuestionsMod } from "../../../types/types"

const QuizNav = ({gotoNumber, quizzes, currentNumber}: {quizzes: Pick<QuizQuestionsMod, "is_answered">[], gotoNumber: (num: number)=> void, currentNumber: number}) => {
    const answeresPercent = ()=>{
        const answered = quizzes.filter((q)=> q.is_answered)
        return ((answered.length / quizzes.length) * 100).toFixed(0)
    }

  return (
    <aside className="w-full lg:w-72 lg:shrink-0 bg-(--main-tertiary)/50 border border-(--main-tertiary-light) rounded-2xl p-5 sm:p-6 flex flex-col gap-6">
        <header className="flex flex-col gap-4 border-b border-(--main-tertiary-light) pb-6">
            <h3 className="text-lg font-bold text-(--text-primary-light)">
              {`Question ${currentNumber + 1} of ${quizzes.length}`}
            </h3>
            
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs text-(--text-secondary) font-medium">
                  <span>Progress</span>
                  <span>{`${answeresPercent()}%`}</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 bg-(--main-tertiary-light) rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-(--main-primary-light) transition-all duration-300"
                      style={{ width: `${answeresPercent()}%` }}
                    />
                </div>
            </div>
        </header>

        {/* Number grid */}
        <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-2.5">
            {quizzes.map((quiz, i) => (
                <button
                    key={i}
                    onClick={() => gotoNumber(i)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-colors
                        ${i === currentNumber 
                          ? "bg-(--main-primary) text-white border border-(--main-primary-light) shadow-[0_0_15px_-5px_var(--main-primary)]" 
                          : quiz.is_answered 
                            ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                            : "bg-(--main-tertiary) text-(--text-secondary) border border-(--main-tertiary-light) hover:text-(--text-primary-light)"
                        }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    </aside>
  )
}

export default QuizNav