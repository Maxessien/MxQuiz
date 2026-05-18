import pool from './../configs/sqlConfig';


export const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      user_id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      saved_quizzes TEXT[] DEFAULT '{}',
      profile_picture JSONB,
      role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
};

export const createQuizTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS quizzes (
      quiz_id VARCHAR(255) PRIMARY KEY,
      quiz_thumbnail TEXT[],
      question TEXT,
      answer TEXT,
      options JSONB,
      question_type TEXT CHECK (question_type IN ('mcq', 'theory', 'mixed')),
      date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      author_id VARCHAR(255) REFERENCES users(user_id) ON DELETE CASCADE,
      is_ai_generated BOOLEAN DEFAULT FALSE,
      attempts INTEGER DEFAULT 0,
      time BIGINT,
      short_description TEXT,
      tags TEXT[]
    );
  `;

  try {
    await pool.query(query);
    console.log('Quizzes table created successfully');
  } catch (error) {
    console.error('Error creating quizzes table:', error);
  }
};

export const createQuizCommentsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS quiz_comments (
      comment_id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) REFERENCES users(user_id) ON DELETE CASCADE,
      quiz_id VARCHAR(255) REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
      date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      comment TEXT NOT NULL,
      rating INTEGER CHECK (rating >= 1 AND rating <= 5)
    );
  `;

  try {
    await pool.query(query);
    console.log('Quiz comments table created successfully');
  } catch (error) {
    console.error('Error creating quiz comments table:', error);
  }
};

export const createQuizAttemptsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS quiz_attempts (
      attempt_id SERIAL PRIMARY KEY,
      quiz_id VARCHAR(255) REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
      user_id VARCHAR(255) REFERENCES users(user_id) ON DELETE CASCADE,
      chosen_answers JSONB,
      score INTEGER,
      status TEXT CHECK (status IN ('finished', 'unfinished')) DEFAULT 'unfinished'
    );
  `;

  try {
    await pool.query(query);
    console.log('Quiz attempts table created successfully');
  } catch (error) {
    console.error('Error creating quiz attempts table:', error);
  }
};