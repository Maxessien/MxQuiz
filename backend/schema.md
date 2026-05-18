# DB SCHEMAS

## User Schema
- Name
- Email
- User ID
- Saved Quizzes
- role

## Quiz Schema
- Quiz ID
- Quiz Thumbnail
- Question
- Answer
- Option
- Question type
- Date Added
- Author ID (rel User Schema-User ID)
- Is AI Generated
- Attempts
- Time
- Short description
- Tags

## Quiz Comments Shema
- User ID
- Quiz ID
- Date Added
- Comment
- Rating

## Quiz Attempts Schema
- Quiz ID
- User ID
- Chosen Answers
- Score
- Status