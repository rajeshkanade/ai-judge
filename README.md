# ⚖️ AI Judge – Mock Trial Decision System

### 🌟 Overview
AI Judge is an intelligent legal assistant that simulates courtroom decision-making.  
Two lawyers (Side A and Side B) present arguments or upload documents, and an AI Judge provides a verdict.  
It supports PDF, DOCX, and text inputs and uses **Google Gemini API** for legal reasoning.

---

### 🧠 Features
- Separate panels for Lawyer 1 and Lawyer 2.
- Upload files or type arguments directly.
- AI-generated analysis for each side.
- Central AI Judge verdict based on both arguments.
- Real-time verdict updates with loading animation.
- MongoDB integration for case history (optional).

---

### ⚙️ Tech Stack
**Frontend:** React, TailwindCSS  
**Backend:** Node.js, Express.js  
**AI API:** Google Gemini 1.5 Flash  
**Database:** MongoDB (Mongoose)

---

### 🚀 Setup Instructions

#### 1️⃣ Backend
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```
PORT=5000
GEMINI_API_KEY=your_api_key_here
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

Start the backend server:
```bash
node server.js
```
or for development with auto-reload:
```bash
npx nodemon server.js
```



#### 2️⃣ Frontend
```bash
cd frontend
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

### 📁 Project Structure

```
ai-judge/
├── backend/
│   ├── controllers/
│   │   ├── lawyer.controller.js      # Handle lawyer arguments
│   │   └── verdict.controller.js     # Generate AI verdicts
│   ├── middlewares/
│   │   └── storage.js                # File upload configuration
│   ├── models/
│   │   └── Argument.js               # MongoDB schema for cases
│   ├── routes/
│   │   └── AIRoutes.js               # API endpoints
│   ├── utils/
│   │   ├── generateFromGemini.js     # Gemini API integration
│   │   └── readFileContent.js        # Extract text from files
│   ├── uploads/                      # Temporary file storage
│   ├── server.js                     # Express app setup
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── JudgePanel/           # Judge verdict display
│   │   │   ├── LawyerPanel/          # Lawyer input interface
│   │   │   
│   │   ├── container/
│   │   │   └── pages/
│   │   │       └── AIJudgeApp/       # Main app interface
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md
```

---

### 🔌 API Endpoints

#### Submit Lawyer Arguments
```
POST /api/arguments/submit
Content-Type: multipart/form-data

Parameters:
- lawyerId: "lawyer_1" or "lawyer_2"
- argument: Text argument (optional)
- document: File upload (optional)
```

#### Generate Verdict
```
POST /api/verdict/generate
Content-Type: application/json

Body:
{
  "argument1": "Lawyer 1's argument",
  "argument2": "Lawyer 2's argument",
  "caseContext": "Case description"
}

Response:
{
  "verdict": "AI Judge's decision",
  "reasoning": "Detailed analysis",
  "winner": "lawyer_1" or "lawyer_2"
}
```

#### Get Case History
```
GET /api/cases/history
```

---

### 📝 How to Use

1. **Open the Application** - Navigate to the AI Judge interface
2. **Select a Case** - Choose or enter case details
3. **Lawyer 1 Submits** - Enter arguments or upload documents
4. **Lawyer 2 Submits** - Enter counter-arguments or upload documents
5. **Request Verdict** - Click "Get Judge's Verdict"
6. **View Result** - Review the AI Judge's analysis and decision

---

### 🛠️ Environment Variables

**Backend (.env)**
```
PORT=5000
GEMINI_API_KEY=<Your Google Gemini API Key>
MONGODB_URI=<Your MongoDB Connection String>
NODE_ENV=development
UPLOAD_FOLDER=./uploads
MAX_FILE_SIZE=10485760
```

---

### 📦 Dependencies

**Backend:**
- Express.js
- Mongoose
- Multer (file uploads)
- Google Generative AI
- dotenv

**Frontend:**
- React
- React Router
- Axios
- TailwindCSS
- Vite

---

### 🔐 Security Notes
- API keys should never be committed to version control
- Use environment variables for sensitive data
- Implement rate limiting on the backend
- Validate all file uploads on the server
- Use HTTPS in production

---

### 🐛 Troubleshooting

**Issue:** Backend not connecting to MongoDB
- **Solution:** Check `MONGODB_URI` in `.env` file and ensure MongoDB is running

**Issue:** Gemini API returns errors
- **Solution:** Verify `GEMINI_API_KEY` is valid and has sufficient quota

**Issue:** File upload fails
- **Solution:** Check file size limits and ensure `uploads/` folder exists and has write permissions

**Issue:** Frontend can't reach backend
- **Solution:** Ensure backend is running on `http://localhost:5000` and CORS is properly configured

---

### 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
```
Deploy the `dist` folder

### Backend Deployment (Heroku/Railway)
```bash
# Update .env with production variables
git push <remote> main
```

---

### 📄 License
MIT License - Feel free to use this project for educational purposes

---

### 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

---

### 📧 Contact & Support
For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

**Last Updated:** November 2025  
**Version:** 1.0.0
