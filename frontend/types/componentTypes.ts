
export interface UserAuthor {
  user_id: string;
  name: string;
  avatar_url?: string;
}

export interface QuizCardProps {
  quiz_id: string;
  title: string;
  description?: string;
  author: UserAuthor;
  is_ai_generated: boolean;
  time_limit: number | null; // in minutes
  question_count: number;
  average_rating?: number; // Aggregated from quiz_comments
  attempts_count?: number; // Aggregated from quiz_attempts
  created_at: string;
}

export interface ReviewProps {
  quiz_comment_id: string;
  user: UserAuthor;
  comment: string;
  rating: number;
  created_at: string;
}

export interface QuizDetailsProps {
  quiz_id: string;
  title: string;
  description: string;
  author: UserAuthor;
  is_ai_generated: boolean;
  time_limit: number | null;
  question_types: string[];
  created_at: string;
  updated_at: string;
  stats: {
    question_count: number;
    attempts_count: number;
    average_score: number | null;
    average_rating: number;
    reviews_count: number;
  };
  reviews: ReviewProps[];
}
