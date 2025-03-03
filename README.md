# 🚀 Authentication API

## 📌 Overview

This is an authentication API built using [NestJS](https://nestjs.com/), with authentication and role-based access control implemented using [JWT](https://jwt.io/) and [Passport.js](http://www.passportjs.org/). The API also uses [Prisma ORM](https://www.prisma.io/) to interact with a PostgreSQL database.

### ✨ Features:

- ✅ User authentication with JWT.
- 🔐 Role-based access control (Intern, Engineer, Admin).
- 🔑 Encrypted password storage.
- 🧪 Unit tests for core functionality.
- 🔄 Ongoing development of password recovery feature.

## 🛠️ Technologies Used

- **NestJS**: A progressive Node.js framework.
- **Prisma ORM**: Database management with PostgreSQL.
- **Passport.js**: Authentication middleware.
- **JWT**: Token-based authentication.
- **Bcrypt**: Password hashing and encryption.
- **Validation Pipes**: Ensuring data integrity.
- **Unit Testing**: API reliability.

## ⚡ Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [PostgreSQL](https://www.postgresql.org/)

### Steps

1. Clone this repository:
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the root directory and provide the required database connection details.
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
   JWT_SECRET=your_secret_key
   ```
4. Run database migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Start the application:
   ```sh
   npm run start:dev
   ```

## 📂 Folder Structure

```
project-root/
│── src/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── decorators/
│   │   ├── guards/
│   ├── database/
│   │   ├── prisma.service.ts
│   │   ├── prisma.module.ts
│   ├── users/
│   │   ├── dto/
│   │   ├── user.controller.ts
│   │   ├── user.module.ts
│   │   ├── user.service.ts
│   ├── main.ts
│── test/
│── prisma/
│   ├── schema.prisma
│── package.json
│── tsconfig.json
│── README.md
```

## 🔗 API Endpoints

### 🔑 Authentication Routes

| Method | Endpoint      | Description                            |
| ------ | ------------- | -------------------------------------- |
| POST   | `/auth/login` | Logs in a user and returns a JWT token |

### 👥 User Routes

| Method | Endpoint    | Description                                         |
| ------ | ----------- | --------------------------------------------------- |
| GET    | `/user`     | Retrieves all users (optional role-based filtering) |
| GET    | `/user/:id` | Retrieves a user by ID (Admin only)                 |
| POST   | `/user`     | Creates a new user                                  |
| PATCH  | `/user/:id` | Updates user information                            |
| DELETE | `/user/:id` | Deletes a user                                      |

## 📤 Request & Response Examples

### **🔐 POST /auth/login**
#### **Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
#### **Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
---

### **➕ POST /user** (Public - Create a new user)
#### **Request:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "strongpassword",
  "role": "ENGINEER"
}
```
#### **Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "role": "ENGINEER",
  "createdAt": "2025-03-03T10:00:00.000Z",
  "updatedAt": "2025-03-03T10:00:00.000Z"
}
```
---

### **📥 GET /user** (Retrieve all users)
#### **Request:**  
```http
GET /user
Authorization: Bearer <your_jwt_token>
```
#### **Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "ENGINEER"
  },
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Jane Smith",
    "email": "janesmith@example.com",
    "role": "ADMIN"
  }
]
```

## 🔒 Role-Based Access Control (RBAC)

- **Intern**: Limited access.
- **Engineer**: Access to most features.
- **Admin**: Full access to user management.

## 🧪 Unit Testing

To run the tests:

```sh
npm run test
```

## 🚀 Future Improvements

- Implement password recovery feature.
- Add API documentation using Swagger.
- Enhance logging and error handling.

## 📜 License

This project is licensed under the MIT License.

