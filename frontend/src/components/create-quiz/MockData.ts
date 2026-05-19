import { QuizDetailsProps } from "../../../types/componentTypes";

export const mockQuizDetails: QuizDetailsProps = {
  quiz_id: "q-123456",
  title: "Data Structures Practice Test",
  description: "A comprehensive practice test covering fundamental data structures including arrays, linked lists, stacks, queues, trees, graphs and more.\n\nProvides challenging and diverse question sets to prepare for computer science core modules.",
  author: {
    user_id: "u-1",
    name: "David Okeke",
    avatar_url: "https://i.pravatar.cc/150?u=david", 
  },
  is_ai_generated: false,
  time_limit: 45,
  question_types: ["mcq", "theory"],
  created_at: "2024-05-12T10:00:00Z",
  updated_at: "2024-05-20T14:30:00Z",
  stats: {
    question_count: 40,
    attempts_count: 12400,
    average_score: 72,
    average_rating: 4.6,
    reviews_count: 324,
  },
  reviews: [
    {
      quiz_comment_id: "rc-1",
      user: { user_id: "u-2", name: "Chinedu A.", avatar_url: "https://i.pravatar.cc/150?u=chinedu" },
      comment: "Very well structured and covers all the important topics. Helped me a lot in preparing for my exams.",
      rating: 5,
      created_at: "2024-05-05T08:12:00Z",
    },
    {
      quiz_comment_id: "rc-2",
      user: { user_id: "u-3", name: "Sarah J.", avatar_url: "https://i.pravatar.cc/150?u=sarah" },
      comment: "The questions are challenging and explanations are clear. Highly recommended!",
      rating: 4,
      created_at: "2024-04-20T11:00:00Z",
    },
    {
      quiz_comment_id: "rc-3",
      user: { user_id: "u-4", name: "Michael O.", avatar_url: "https://i.pravatar.cc/150?u=michael" },
      comment: "Good variety of questions. Some questions were tough but that's what makes it great!",
      rating: 5,
      created_at: "2024-04-15T16:45:00Z",
    },
  ],
};