import pool from "./../configs/sqlConfig";

export const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      user_id TEXT PRIMARY KEY,

      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      avatar_url TEXT,

      role VARCHAR(20) DEFAULT 'user' CHECK(role IN ('user', 'admin')),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("Users table created successfully");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};

export const createQuizTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS quizzes (
      quiz_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

      title VARCHAR(255) NOT NULL,
      description TEXT,

      author_user_id TEXT NOT NULL REFERENCES users(user_id)
        ON DELETE CASCADE,

      is_ai_generated BOOLEAN DEFAULT FALSE,

      visibility VARCHAR(20) DEFAULT 'public' CHECK(visibility IN ('public', 'private')),

      status VARCHAR(20) DEFAULT 'draft' CHECK(status IN ('draft', 'published')),

      time_limit INTEGER,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("Quizzes table created successfully");
  } catch (error) {
    console.error("Error creating quizzes table:", error);
  }
};

export const createQuestionsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS questions (
      question_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

      quiz_id UUID NOT NULL REFERENCES quizzes(quiz_id)
        ON DELETE CASCADE,

      type VARCHAR(50) NOT NULL CHECK(type IN ('mcq', 'theory')),

      question_text TEXT NOT NULL,

      options JSONB NOT NULL,
      
      answer TEXT NOT NULL,

      explanation TEXT,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("Questions table created successfully");
  } catch (error) {
    console.error("Error creating questions table:", error);
  }
};

export const createQuizAttemptsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS quiz_attempts (
      attempt_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      quiz_id UUID NOT NULL REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
      user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
      chosen_answers JSONB,
      score INTEGER,
      status TEXT CHECK (status IN ('finished', 'unfinished')) DEFAULT 'unfinished',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("Quiz attempts table created successfully");
  } catch (error) {
    console.error("Error creating quiz attempts table:", error);
  }
};

export const createQuizCommentsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS quiz_comments (
      quiz_comment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

      quiz_id UUID NOT NULL REFERENCES quizzes(quiz_id)
          ON DELETE CASCADE,

      user_id TEXT NOT NULL REFERENCES users(user_id)
          ON DELETE CASCADE,

      comment TEXT NOT NULL,

      rating INTEGER CHECK (rating >= 1 AND rating <= 5),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("Quiz comments table created successfully");
  } catch (error) {
    console.error("Error creating quiz comments table:", error);
  }
};

export const createSavedQuizTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS saved_quizzes (
      saved_quiz_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

      user_id TEXT NOT NULL REFERENCES users(user_id)
          ON DELETE CASCADE,

      quiz_id UUID NOT NULL REFERENCES quizzes(quiz_id)
          ON DELETE CASCADE,

      saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      UNIQUE(user_id, quiz_id)
    );
  `;

  try {
    await pool.query(query);
    console.log("Saved quizzes table created successfully");
  } catch (error) {
    console.error("Error creating saved quizzes table:", error);
  }
};


export const createAllTables = async () => {
  console.log("Starting table creation...");
  await createUserTable();
  await createQuizTable();
  await createQuestionsTable();
  await createQuizAttemptsTable();
  await createQuizCommentsTable();
  await createSavedQuizTable();
  console.log("Finished creating all tables.");
};