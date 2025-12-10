# Nestora — Property Rental & Communication Platform

A full-stack MERN-based real estate rental platform with real-time chat.

Overview

Nestora is a full-featured real estate rental platform where users can search for available rental properties, chat directly with property owners, and manage their own listings. The system is built with a modern React frontend (Vite) and a Node.js + Express backend with MongoDB for persistence. It includes real-time messaging powered by Socket.io and image uploads via Cloudinary.

Key Features

- User Authentication
  - Signup & Login
  - JWT-based auth + cookies
  - Protected routes and role-aware behavior (owner vs renter)

- Property Listings
  - Create, read, update and delete property listings
  - Detailed property pages (title, description, price, beds, baths, type, amenities, location, images, owner, status)

- Advanced Property Filtering
  - Keyword, location, min/max price, bedrooms, bathrooms
  - Backend search supports partial matches and range queries

- Owner Dashboard
  - Add/update properties, upload multiple photos
  - Change property status (Available / Rented)
  - Delete properties and view all owner listings

- Real-Time Chat
  - Socket.io based messaging between tenants and owners
  - Conversation & message models on the backend
  - Auto-create conversations when messages are sent to new owners

- Mobile-first WhatsApp-like Chat UI
  - Chat list and conversation panes
  - Responsive behavior for mobile (chat list -> conversation)

Tech Stack

Frontend:
- React
- Vite
- Tailwind CSS
- ShadCN UI
- Axios
- Socket.io-client
- React Router

Backend:
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Socket.io
- Cloudinary for image uploads

Repository Structure (example)

- /backend - Express API and server
- /frontend - React + Vite application
- /README.md - this file

Getting Started (Local Development)

Prerequisites
- Node.js v16+ and npm/yarn
- MongoDB Atlas or local MongoDB
- Cloudinary account (for image uploads)

1. Clone the repo

   git clone https://github.com/Ishikaza-das/Nestora.git
   cd Nestora

2. Backend

   cd backend
   cp .env.demo .env
   # Edit .env and fill the variables (MONGO_URI, JWT_SECRET, CLOUDINARY_*, FRONTEND_ORIGIN, SOCKET_URL)
   npm install
   npm run dev

   Default: server will run on PORT defined in .env (commonly 5000)

3. Frontend

   cd ../frontend
   cp .env.demo .env
   # Edit .env to point to your backend API and socket server
   npm install
   npm run dev

   Vite dev server will run (commonly on http://localhost:5173)

Environment variables (demo)

Backend (.env.demo)
- MONGO_URI: MongoDB connection string
- PORT: server port
- JWT_SECRET: secret used for signing JWTs
- FRONTEND_ORIGIN: URL of the frontend (CORS)
- CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET: Cloudinary credentials
- SOCKET_PATH or SOCKET_URL: optional socket endpoint or origin

Frontend (.env.demo)
- VITE_API_BASE: Base API URL (e.g. http://localhost:5000/api)
- VITE_SOCKET_URL: Socket server URL (e.g. http://localhost:5000)

Security note

The .env.demo files include example keys and placeholders. Never commit production secrets to source control. Use environment variables in your deployment provider or a secrets manager for production.

Deploying

- Set production environment variables in your hosting provider (Render, Heroku, Vercel, etc.)
- Build the frontend (npm run build) and deploy to static hosting
- Start the backend on a Node host or container with secure env values

Contributing

Contributions and improvements are welcome. Please open issues or PRs with clear descriptions.

License

Specify a license for the project here (MIT, Apache, etc.).
