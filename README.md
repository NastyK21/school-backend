# School Management API

## Overview
The **School Management API** is a RESTful service built with **Node.js, Express.js, and MySQL** to manage school-related data, including school information. It supports CRUD operations and integrates with **Prisma ORM** for database interactions.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **ORM**: Prisma
- **Hosting**: Railway/Render (Optional for deployment)
- **Testing**: Postman

## Features
 Add and retrieve schools
 MySQL database integration using Prisma ORM


---

## Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/NastyK21/school-backend.git
cd school-management-api
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a **.env** file in the root directory and add:
```ini
DATABASE_URL="mysql://root:password@gondola.proxy.rlwy.net:50629/railway"
PORT=5000
```

### 4️⃣ Apply Prisma Database Schema
```sh
npx prisma db push
```

### 5️⃣ Start the Server
```sh
npm start
```
The server runs on `http://localhost:3000`

---

## API Endpoints

### ➤ **1. Add a School**
**Endpoint:** `POST /addSchool`
```json
{
  "name": "National Public School",
  "address": "Indiranagar, Bangalore",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```
_Response:_
```json
{
  "id": 1,
  "name": "National Public School",
  "address": "Indiranagar, Bangalore",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

### ➤ **2. Get All Schools**
**Endpoint:** `GET /listSchools?`
_Response:_
```json
[
  {
    "id": 1,
    "name": "National Public School",
    "address": "Indiranagar, Bangalore",
    "latitude": 12.9716,
    "longitude": 77.5946
  }
]
```

### ➤ **2. Get All Schools**
**Endpoint:** `GET /listSchools?latitude=12.971&longitude=77.4`
_Response:_
```json
[
    {
        "id": 1,
        "name": "National Public School",
        "address": "Indiranagar, Bangalore",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "distance": 21.08647915507841
    },
    {
        "id": 4,
        "name": "Delhi Private School",
        "address": "Mathura Road, New Delhi, India",
        "latitude": 28.613939,
        "longitude": 77.209021,
        "distance": 1739.5277354784866
    },
    {
        "id": 3,
        "name": "Maple Leaf International School",
        "address": "Dhaka, Bangladesh",
        "latitude": 23.8103,
        "longitude": 90.4125,
        "distance": 1824.7120227494445
    }
]




