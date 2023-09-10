# Library Management

basic API and UI for manage authors and books

## Technology Stack

- **Frontend:**

  - React with TypeScript

- **Backend:**
  - Node.js with Express and TypeScript
  - Database: SQLite

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js 18 (Recommended)
- Yarn package manager (Recommended)

## Getting Started

Follow these steps to get your project up and running.

### Backend

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   yarn OR npm install
   ```

2. Create a .env file in the backend folder and add the following content:

   ```
   PORT=5000
   ```

3. Seed the database:

   ```
   yarn run seed
   ```

4. Start the backend server:

   ```
   yarn run dev
   ```

5. To run test cases::

   ```
   yarn run test (stop the server first)
   ```

### Frontend

1. Navigate to the frontend folder:

   ```
   cd frontend
   yarn OR npm install
   ```

2. Create a .env.local file in the frontend folder and add the following
   content:

   ```
   VITE_API_URL_V1="http://localhost:5000/api/v1"
   ```

3. Start the frontend:

   ```
   yarn run dev
   ```
