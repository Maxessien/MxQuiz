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
    <div>
      <div>
        <span>{`Question ${questionIdx + 1}`}</span>
        <button>
          <FaTrash />
        </button>
      </div>
      <section>
        <div>
          <button
            type="button"
            onClick={() =>
              editQuestion(questionIdx, { ...question, type: "mcq" })
            }
          >
            MCQ
          </button>          {/* Theory Questions disabled for now */}
          {/* <button
            onClick={() =>
              editQuestion(questionIdx, { ...question, type: "theory" })
            }
          >
            Theory
          </button> */}
        </div>
        <div>
          <h3>Question</h3>
          <input
            value={question.question_text}
            name="question_text"
            id="q_text"
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
            <h3>Options</h3>
            {question.options.map(({ optionId, value }, idx) => {
              return (
                <div key={optionId}>
                  <button
                    type="button"
                    onClick={() => {
                      editQuestion(questionIdx, {
                        ...question,
                        answer: optionId,
                      });
                    }}
                  >
                    <span></span>
                  </button>                  <input
                    onChange={(e) => {
                      const opts = [...question.options];
                      opts[idx] = { ...opts[idx], value: e.target.value };
                      editQuestion(questionIdx, { ...question, options: opts });
                    }}
                    type="text"
                    value={value}
                  />
                  {question.options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const opts = question.options.filter(
                          (op) => op.optionId !== optionId,
                        );
                        // If deleting the selected answer, reset to first remaining option
                        const newAnswer = question.answer === optionId ? opts[0].optionId : question.answer;
                        editQuestion(questionIdx, {
                          ...question,
                          options: opts,
                          answer: newAnswer,
                        });
                      }}
                    >
                      <FaTrash />
                    </button>
                  )}                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default QuizQuestionForm;
