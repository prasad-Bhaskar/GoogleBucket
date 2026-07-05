# GoogleBucket

GoogleBucket is a Node.js and Express API for uploading files to Google Drive. It uses Google OAuth 2.0 for authentication and exposes a simple endpoint for uploading images securely with an API key.

## Features

- Upload files to Google Drive
- Make uploaded files publicly viewable
- Protect upload endpoint with an API key
- Google OAuth flow for obtaining a refresh token
- Built with TypeScript and Express

## Tech Stack

- Node.js
- Express
- TypeScript
- Google APIs
- Multer
- dotenv

## Project Structure

- src/index.ts - application entry point
- src/routes/auth.routes.ts - Google OAuth routes
- src/routes/upload.routes.ts - upload route
- src/controllers - request handlers
- src/services/drive.service.ts - Google Drive upload logic
- src/middleware - API key and upload middleware

## Prerequisites

- Node.js 18+ recommended
- A Google Cloud project
- Google Drive API enabled
- OAuth client credentials

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Environment Variables

Create a .env file in the project root with the following values:

```env
PORT=3000
API_KEY=your_api_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
```

## Google Setup

1. Go to the Google Cloud Console.
2. Create a project and enable the Google Drive API.
3. Create OAuth 2.0 credentials.
4. Add the redirect URI:
   - http://localhost:3000/auth/google/callback
5. Run the authentication flow to get a refresh token.

## Running the Server

Development mode:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

The server will start on port 3000 by default.

## API Endpoints

### 1. Google Authentication

- GET /auth/google
  - Redirects to Google OAuth login

- GET /auth/google/callback
  - Exchanges the OAuth code and prints the refresh token to the console

### 2. Upload File

- POST /api/upload
  - Requires header: x-api-key
  - Expects a multipart form field named image

Example:

```bash
curl -X POST http://localhost:3000/api/upload \
  -H "x-api-key: your_api_key_here" \
  -F "image=@/path/to/file.jpg"
```

## Response Example

Successful upload response:

```json
{
  "success": true,
  "data": {
    "id": "drive_file_id",
    "name": "uploaded_file.jpg",
    "webViewLink": "https://drive.google.com/file/d/.../view",
    "webContentLink": "https://drive.google.com/uc?id=...",
    "publicUrl": "https://drive.google.com/uc?id=..."
  }
}
```

## Notes

- The upload endpoint currently accepts files up to 10 MB.
- The uploaded file is made readable by anyone with the link.
- Keep your API key and Google credentials secure.

## License

This project is licensed under ISC.
