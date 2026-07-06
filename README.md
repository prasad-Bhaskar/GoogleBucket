# GoogleBucket

GoogleBucket is a TypeScript Node.js API for uploading image files to Google Drive. It uses Google OAuth 2.0 to authenticate with the Drive API and secures uploads with an API key.

## Features

- Upload image files to Google Drive
- Automatically make uploaded files publicly viewable
- Protect the upload endpoint with a reusable API key
- Google OAuth flow to obtain a refresh token
- Image validation using file signature inspection
- Built with Express, TypeScript, Multer, and Google APIs

## Tech Stack

- Node.js
- Express
- TypeScript
- Google Drive API
- Multer
- dotenv

## Project Structure

- `src/index.ts` - application entry point
- `src/routes/auth.routes.ts` - Google OAuth routes
- `src/routes/upload.routes.ts` - upload route
- `src/controllers/auth.controller.ts` - OAuth handlers
- `src/controllers/upload.controller.ts` - upload handler
- `src/services/drive.service.ts` - Google Drive upload logic
- `src/config/google.ts` - Google API client setup
- `src/middleware/apiKey.ts` - API key validation
- `src/middleware/upload.ts` - Multer file upload config
- `src/middleware/validateImage.ts` - image content validation
- `src/middleware/errorHandler.ts` - centralized error handling
- `src/errors/ApiError.ts` - custom API error class

## Prerequisites

- Node.js 18+ recommended
- Google Cloud project with Google Drive API enabled
- OAuth 2.0 client credentials
- A refresh token for Drive access

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file at the project root with:

```env
PORT=3000
API_KEY=your_api_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
```

## Google OAuth Setup

1. Open the Google Cloud Console.
2. Create or select a project.
3. Enable the Google Drive API.
4. Create OAuth 2.0 credentials.
5. Set the redirect URI to:
   - `http://localhost:3000/auth/google/callback`
6. Start the auth flow in the app and copy the refresh token printed to the console.

## Available Scripts

- `npm run dev` - start the app in development mode with auto-reload
- `npm run build` - compile TypeScript to `dist`
- `npm start` - run the compiled production build

## API Endpoints

### Authentication

- `GET /auth/google`
  - Redirects the browser to Google for consent.

- `GET /auth/google/callback`
  - Exchanges the OAuth authorization code for tokens.
  - Prints the refresh token to the console for use in `.env`.

### File Upload

- `POST /api/upload`
  - Header: `x-api-key: your_api_key_here`
  - Field: `image` as multipart form data

Supported image types:

- `image/jpeg`
- `image/png`
- `image/webp`
- `image/gif`

Maximum file size: 5 MB

Example:

```bash
curl -X POST http://localhost:3000/api/upload \
  -H "x-api-key: your_api_key_here" \
  -F "image=@/path/to/file.jpg"
```

## Response Example

```json
{
  "success": true,
  "data": {
    "id": "drive_file_id",
    "name": "timestamp-file.jpg",
    "webViewLink": "https://drive.google.com/file/d/.../view",
    "webContentLink": "https://drive.google.com/uc?id=...",
    "publicUrl": "https://drive.google.com/uc?id=..."
  }
}
```

## Error Handling

- Missing or invalid `x-api-key` returns `401`/`403`
- Unsupported file type returns `400`
- Missing image returns `400`
- Exceeding 5 MB returns `400`
- Google API or internal errors return `500`

## Notes

- Uploaded files are made publicly readable by anyone with the link.
- The upload endpoint validates file contents using the file signature.
- Keep `API_KEY` and Google credentials secure.

## License

ISC
