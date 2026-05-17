# AI Candidate Shortlisting System

A full-stack AI-powered system built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and OpenRouter AI integration for intelligent candidate shortlisting.

## Features

- **Candidate Management**: Add, view, and filter candidates by skills and experience.
- **Intelligent Matching**: Algorithmic matching based on required skills and minimum experience.
- **AI-Based Shortlisting**: Integrates with OpenRouter AI (e.g. OpenAI models) to analyze candidates, provide explanations, and offer an AI score.
- **Beautiful Dashboard**: Built with Tailwind CSS, featuring Recharts for visual analytics (Skill distribution, Experience charts).
- **Dark Mode / Light Mode**: Beautiful glassmorphism UI with seamless theme toggling.
- **Authentication**: JWT-based secure recruiter login system.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Local or Atlas)
- OpenRouter API Key

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables. There is an `.env` file already created, ensure you replace `your_openrouter_api_key_here` with your actual OpenRouter API key:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/candidate-shortlisting
   JWT_SECRET=supersecretjwtkey
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   OPENROUTER_MODEL=openai/gpt-4o-mini
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Dummy Data Integration
To test the system efficiently:
1. Register an account and login.
2. Go to 'Add Candidate' and add a few dummy profiles.
3. Go to 'Job Requirements' to search and use the "AI Deep Analysis" to fetch AI results.

## Deployment
- **Frontend**: Prepared for deployment on Vercel. Run `npm run build` to create a production bundle.
- **Backend**: Can be deployed on Render or Heroku. Make sure to set up the appropriate environment variables.
