- Fullstack Project Deployment - MetaPhoto Viewer
This project demonstrates a fullstack application with separate frontend and backend directories.

Frontend: React application
Backend: Node.js/Express API
Deployment: Render.com with CI/CD pipeline
- Project Structure
.
├── backend             # Node.js/Express backend
│   ├── routes          # API routes
│   ├── server.js       # Main server file
│   ├── photos.js       # Photo API with pagination and filtering
│   └── package.json    # Backend dependencies
│
├── frontend            # React frontend
│   ├── src             # React source code
│   ├── public          # Static files
│   ├── App.js          # Main app component
│   └── package.json    # Frontend dependencies
│
└── README.md           # Project documentation
- Deployment Commands
- Build Command
npm install
- Pre-Deploy Command
# Not required, but optionally can run tests or linting
- Start Command
npm run start

- Render.com Configuration
- Backend Service
Root Directory: backend
Build Command: cd backend && npm install
Start Command: cd backend && npm start
Environment Variables:
PORT=5000

- Frontend Service (If deployed separately)
Root Directory: frontend
Build Command: cd frontend && npm install && npm run build
Start Command: serve -s build

- Deployment Steps
Push to GitHub repository.
Link the repository to Render.com.
Configure build and start commands as described.
Enable Auto-Deploy for CI/CD.
Monitor the logs for any build or runtime errors.
Test the application on the provided Render.com URLs.

- API Endpoint Test
https://meta-photo-api-john-rocha.onrender.com/externalapi/photos?limit=25&offset=0
- Frontend Access
https://meta-photo-api-john-rocha.onrender.com
- Troubleshooting
ERR_NAME_NOT_RESOLVED: Verify the backend URL in App.js and environment variables.
CORS Errors: Ensure CORS is configured correctly in server.js:
const cors = require('cors');
app.use(cors({
    origin: 'https://meta-photo-api-john-rocha.onrender.com',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization'
}));
API Not Showing Correct Limit: Check limit and offset parameters in both the frontend API request and backend pagination logic.
- Future Improvements
Implement authentication for secure access.
Add unit and integration tests.
Enhance error handling in both frontend and backend.
