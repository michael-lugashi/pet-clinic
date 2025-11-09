# Pet Clinic

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

- Node.js 17.0 or higher
- MongoDB (local installation or MongoDB Atlas account)

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - **Windows**: MongoDB should start automatically as a service
   - **macOS**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get your connection string from the "Connect" button

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, set up your environment variables:

1. Copy the `env.example` file to `.env.local`:

```bash
cp env.example .env.local
```

2. Update `.env.local` with your MongoDB connection string:

For local MongoDB:

```
MONGODB_URI=mongodb://localhost:27017/pet-clinic
```

For MongoDB Atlas:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/pet-clinic?retryWrites=true&w=majority
```

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/patients](http://localhost:3000/api/patients). This endpoint can be edited in `pages/api/patients.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Database Schema

The application uses MongoDB with Mongoose ODM. The Patient schema includes:

- `clientName` (String, required): Name of the pet owner
- `petName` (String, required): Name of the pet
- `phone` (String, required): Contact phone number
- `petAge` (String, required): Age of the pet (e.g., "5 years")
- `petType` (String, required): Type of pet (Dog, Cat, Bird, Fish, or Other)
- `createdAt` (Date): Automatically generated timestamp
- `updatedAt` (Date): Automatically updated timestamp

## API Endpoints

- `GET /api/patients` - Get all patients
- `GET /api/patients?id={id}` - Get a single patient by ID
- `POST /api/patients` - Create a new patient
- `PUT /api/patients` - Update an existing patient
- `DELETE /api/patients?id={id}` - Delete a patient by ID

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
