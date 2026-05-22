import { GenQuizQuestionsRes } from "@/types/types";
import { FaTrash } from "react-icons/fa";

const QuizQuestionForm = ({
  questionIdx,
  question,
  editQuestion,
}: {
  questionIdx: number;
  question: GenQuizQuestionsRes;
  editQuestion: (idx: number, value: GenQuizQuestionsRes) => void;
}) => {
  return (
    <div className="rounded-md overflow-hidden border-2 border-(--text-secondary-light)">
      <div className="bg-(--text-secondary-light) text-lg font-medium flex px-3 py-2 justify-between items-center">
        <span>{`Question ${questionIdx + 1}`}</span>
        <button className="text-red-600">
          <FaTrash />
        </button>
      </div>
      <section className="px-3 py-2">
        <div className="flex justify-between gap-2 items-center">
          <button
            type="button"
            className={`text-lg font-medium rounded-md ${question.type === "mcq" ? "border-2 bg-(--main-tertiary) border-(--main-primary)" : "border-(--text-secondary-light)"} text-center flex-1 px-2 py-3`}
            onClick={() =>
              editQuestion(questionIdx, { ...question, type: "mcq" })
            }
          >
            MCQ
          </button>{" "}
          {/* Theory Questions disabled for now */}
          <button
            disabled
            type="button"
            className={`text-lg font-medium rounded-md ${question.type === "mcq" ? "border-2 bg-(--main-tertiary) border-(--main-primary)" : "border-(--text-secondary-light)"} text-center flex-1 px-2 py-3`}
            onClick={() =>
              editQuestion(questionIdx, { ...question, type: "theory" })
            }
          >
            Theory
          </button>
        </div>
        <div>
          <h3 className="text-lg font-medium">Question</h3>
          <input
            value={question.question_text}
            name="question_text"
            id="q_text"
            className="font-medium w-full max-w-lg text-base rounded-md border-2 px-2 py-2 focus:border-(--main-primary) border-(--text-secondary-light)"
            onChange={(e) => {
              editQuestion(questionIdx, {
                ...question,
                question_text: e.target.value,
              });
            }}
          ></input>
        </div>
        {question.type === "mcq" && (
          <div>
            <h3 className="text-lg font-medium">Options</h3>
            {question.options.map(({ optionId, value }, idx) => {
              return (
                <div className="w-full flex justify-start items-center gap-2" key={optionId}>
                  <button
                    type="button"
                    onClick={() => {
                      editQuestion(questionIdx, {
                        ...question,
                        answer: optionId,
                      });
                    }}
                    className="p-2 rounded-full w-7 aspect-square bg-(--text-secondary)"
                  >
                    {question.answer === optionId && <span className="w-full h-full bg-(--main-primary) rounded-full"></span>}
                  </button>{" "}
                  <input
                    onChange={(e) => {
                      const opts = [...question.options];
                      opts[idx] = { ...opts[idx], value: e.target.value };
                      editQuestion(questionIdx, { ...question, options: opts });
                    }}
                    className="font-medium flex-1 max-w-xl text-base rounded-md border-2 px-2 py-2 focus:border-(--main-primary) border-(--text-secondary-light)"
                    type="text"
                    value={value}
                  />
                  {question.options.length > 1 && (
                    <button
                      type="button"
                      className="text-lg font-medium text-red-600"
                      onClick={() => {
                        const opts = question.options.filter(
                          (op) => op.optionId !== optionId,
                        );
                        // If deleting the selected answer, reset to first remaining option
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
                      <FaTrash />
                    </button>
                  )}{" "}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default QuizQuestionForm;
