import { GenQuizQuestionsRes } from "@/types/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { v4 } from "uuid";

const QuizQuestionForm = ({
  questionIdx,
  question,
  editQuestion,
  deleteQuestion,
}: {
  questionIdx: number;
  question: GenQuizQuestionsRes;
  editQuestion: (idx: number, value: GenQuizQuestionsRes) => void;
  deleteQuestion: (idx: number) => void;
}) => {
  const [formExpanded, setFormExpanded] = useState(true);

  return (
    <div className="rounded-xl overflow-hidden border border-(--text-secondary-light)/20 bg-(--main-tertiary-light) shadow-sm">
      {/* Question Header Card */}
      <div className="bg-(--main-tertiary) border-b border-(--text-secondary-light)/10 text-base font-bold text-(--text-primary) flex px-4 py-3 justify-between items-center">
        <span
          className="flex justify-start items-center gap-2"
          onClick={() => setFormExpanded(!formExpanded)}
        >
          <span className="tracking-wide text-xs font-semibold uppercase text-(--text-secondary)">
            Question {questionIdx + 1}
          </span>
          <span>
            {formExpanded ? (
              <MdArrowDropUp size={25} />
            ) : (
              <MdArrowDropDown size={25} />
            )}
          </span>
        </span>
        <button
          onClick={() => deleteQuestion(questionIdx)}
          type="button"
          className="p-1.5 rounded-md hover:bg-(--text-errors)/10 text-(--text-errors) transition-colors"
          title="Delete Question"
        >
          <FaTrash className="text-sm" />
        </button>
      </div>

      <AnimatePresence>
        {formExpanded && (
          <motion.section
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.5, ease: "linear" }}
            className="p-4 origin-top space-y-4"
          >
            {/* Toggle Form Format Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
                Question Type
              </label>
              <div className="flex justify-between gap-3 items-center">
                <button
                  type="button"
                  className={`text-sm font-semibold rounded-lg text-center flex-1 py-2.5 transition-all cursor-pointer border-2
                ${
                  question.type === "mcq"
                    ? "border-(--main-primary) bg-(--main-primary)/10 text-(--text-primary-light)"
                    : "border-(--text-secondary-light)/20 bg-transparent text-(--text-secondary) hover:border-(--text-secondary-light)/40"
                }`}
                  onClick={() =>
                    editQuestion(questionIdx, { ...question, type: "mcq" })
                  }
                >
                  Multiple Choice (MCQ)
                </button>
                <button
                  disabled
                  type="button"
                  className="text-sm font-semibold rounded-lg text-center flex-1 py-2.5 border-2 border-dashed border-(--text-secondary-light)/10 opacity-30 cursor-not-allowed text-(--text-secondary)"
                >
                  Theory (Disabled)
                </button>
              </div>
            </div>

            {/* Input: Question Content Box */}
            <div className="space-y-1.5">
              <label
                htmlFor={`q_text_${questionIdx}`}
                className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)"
              >
                Question Prompt
              </label>
              <input
                value={question.question_text}
                name="question_text"
                id={`q_text_${questionIdx}`}
                placeholder="Type your question prompt here..."
                className="w-full text-sm font-medium rounded-lg border-2 bg-(--main-tertiary)/40 px-3 py-2.5 outline-none transition-colors border-(--text-secondary-light)/30 focus:border-(--main-primary) text-(--text-primary)"
                onChange={(e) => {
                  editQuestion(questionIdx, {
                    ...question,
                    question_text: e.target.value,
                  });
                }}
              />
            </div>

            {/* Dynamic MCQ Options Builder Subform */}
            {question.type === "mcq" && (
              <div className="space-y-2 pt-2 border-t border-(--text-secondary-light)/10">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
                    Answer Options
                  </label>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-(--main-primary-light)">
                    Select correct answer
                  </span>
                </div>

                <div className="space-y-2.5">
                  {question.options.map(({ optionId, value }, idx) => {
                    const isSelectedAnswer = question.answer === optionId;
                    return (
                      <div
                        className="w-full flex items-center gap-3 group animate-fadeIn"
                        key={optionId}
                      >
                        {/* Radial Input Selector */}
                        <button
                          type="button"
                          onClick={() =>
                            editQuestion(questionIdx, {
                              ...question,
                              answer: optionId,
                            })
                          }
                          className={`relative flex items-center justify-center rounded-full w-5 h-5 border transition-all shrink-0 cursor-pointer
                        ${
                          isSelectedAnswer
                            ? "border-(--main-primary) bg-(--main-primary)"
                            : "border-(--text-secondary-light)/50 hover:border-(--main-primary-light)"
                        }`}
                        >
                          {isSelectedAnswer && (
                            <span className="w-2 h-2 bg-(--text-primary-light) rounded-full animate-scaleUp"></span>
                          )}
                        </button>

                        {/* Numeric Value Entry Field */}
                        <input
                          onChange={(e) => {
                            const opts = [...question.options];
                            opts[idx] = { ...opts[idx], value: e.target.value };
                            editQuestion(questionIdx, {
                              ...question,
                              options: opts,
                            });
                          }}
                          placeholder={`Option ${idx + 1}`}
                          className={`flex-1 text-sm font-medium rounded-lg border px-3 py-2 outline-none transition-colors text-(--text-primary)
                        ${
                          isSelectedAnswer
                            ? "border-(--main-primary)/50 bg-(--main-primary)/5"
                            : "border-(--text-secondary-light)/20 bg-(--main-tertiary)/20 focus:border-(--main-primary)"
                        }`}
                          type="text"
                          value={value}
                        />

                        {/* Individual Row Action Tool */}
                        {question.options.length > 1 && (
                          <button
                            type="button"
                            className="p-2 rounded-md hover:bg-(--text-errors)/10 text-(--text-errors) transition-colors shrink-0"
                            onClick={() => {
                              const opts = question.options.filter(
                                (op) => op.optionId !== optionId,
                              );
                              const newAnswer =
                                question.answer === optionId
                                  ? opts[0].optionId
                                  : question.answer;
                              editQuestion(questionIdx, {
                                ...question,
                                options: opts,
                                answer: newAnswer,
                              });
                            }}
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Append Option Row Shortcut */}
                {question.options.length < 6 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newOptId = v4();
                      editQuestion(questionIdx, {
                        ...question,
                        options: [
                          ...question.options,
                          { optionId: newOptId, value: "" },
                        ],
                      });
                    }}
                    className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-(--main-primary-light) hover:text-(--main-primary) transition-colors pt-1 cursor-pointer"
                  >
                    <FaPlus className="text-[10px]" /> Add Option
                  </button>
                )}
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizQuestionForm;
