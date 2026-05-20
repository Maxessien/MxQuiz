import QuizQuestions from "@/src/components/quiz-questions";
import { QuizQuestionsMod } from "@/types/types";



// Mock data strictly mapped from schema interfaces
const mockQuestions: QuizQuestionsMod[] = [
  {
    question_id: "q_1",
    title: "Data Structures Practice Test",
    time_limit: 45,
    question_text: "Which of the following data structures is best suited for implementing a LIFO (Last In, First Out) behavior?",
    options: [
      { option_id: "A", value: "Queue" },
      { option_id: "B", value: "Stack" },
      { option_id: "C", value: "Tree" },
      { option_id: "D", value: "Graph" }
    ],
    is_answered: false,
    answer: ""
  },
  {
    question_id: "q_2",
    title: "Data Structures Practice Test",
    time_limit: 45,
    question_text: "What is the worst-case time complexity of accessing an element in an unsorted Array?",
    options: [
      { option_id: "A", value: "O(1)" },
      { option_id: "B", value: "O(log n)" },
      { option_id: "C", value: "O(n)" },
      { option_id: "D", value: "O(n^2)" }
    ],
    is_answered: false,
    answer: ""
  },
  {
    question_id: "q_3",
    title: "Data Structures Practice Test",
    time_limit: 45,
    question_text: "In a binary search tree, which traversal visits nodes in ascending order?",
    options: [
      { option_id: "A", value: "Pre-order traversal" },
      { option_id: "B", value: "In-order traversal" },
      { option_id: "C", value: "Post-order traversal" },
      { option_id: "D", value: "Level-order traversal" }
    ],
    is_answered: false,
    answer: ""
  }
];

const QuizQuestionPage = () => {
  return (
    <QuizQuestions q={mockQuestions} />
  )
}

export default QuizQuestionPage