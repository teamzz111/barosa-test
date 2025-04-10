# Test RN + Nest

A collaborative sandwich creation platform where users can create, customize, and collaborate on sandwich ("hoagie") recipes.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [API Documentation](#api-documentation)
- [Setup and Installation](#setup-and-installation)
- [Running the Project](#running-the-project)
- [Tests](#tests)
- [Bonus Features Implemented](#bonus-features-implemented)
- [Future Improvements](#future-improvements)

## Project Overview

Hoagie Hub is a mobile app that allows users to create their own sandwich recipes, browse others' creations, leave comments, and collaborate on recipes with other users. This platform was built as a full-stack technical assessment focusing on RESTful APIs, modular architecture, pagination, and front-end UX.

## Features

- User authentication (signup/login)
- Create, view, update and delete hoagies
- View a paginated list of hoagies with total count
- View hoagie details (name, ingredients, image, creator)
- Comment on hoagies with total comment count displayed
- Add collaborators to hoagies (optional feature)

## Tech Stack

**Frontend:**
- React Native
- TypeScript
- React Navigation
- React Hook Form + Yup validation
- Reanimated 2 for animations
- Axios for API communication
- React Native Vector Icons

**Backend:**
- NestJS
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Class Validator

## Frontend Architecture

### Architecture Overview

The frontend of Hoagie Hub is built with a clean architecture approach to ensure separation of concerns, maintainability, and testability:

1. **Screens Layer** - React components that handle UI rendering and user interaction
2. **Presenters Layer** - Custom hooks that manage state and handle UI logic
3. **Actions Layer** - Functions that handle business logic and errors
4. **Use Cases Layer** - Core application logic
5. **Repository Layer** - Abstracts API communication

This layered approach allows for better code organization and makes it easier to change implementations without affecting the entire codebase.

### Components and Screens

The application features several key screens:

1. **Authentication Screens**
   - Login Screen with form validation
   - Signup Screen with form validation

2. **Hoagie List Screen**
   - Paginated list of hoagies
   - Pull-to-refresh functionality
   - Infinite scroll for loading more items
   - Animated item entry

3. **Hoagie Detail Screen**
   - Hoagie information display
   - Comments section with pagination
   - Add comment functionality
   - Creator and collaborator information

4. **Create Hoagie Screen**
   - Form with validation using React Hook Form and Yup
   - Dynamic ingredient list management
   - Image URL input

5. **Profile Screen**
   - User information
   - List of created hoagies
   - Collaborations

### Design Patterns Used

1. **Presenter Pattern**
   - Implemented as custom React hooks
   - Separates UI logic from rendering
   - Manages component state and data fetching

2. **Repository Pattern**
   - Centralizes API communication
   - Provides a consistent interface for data operations
   - Enables easier testing through dependency injection

3. **Clean Architecture**
   - Clear separation of concerns
   - Dependency rule: inner layers don't depend on outer layers
   - Domain-driven design principles

4. **Strategy Pattern**
   - Used for form validation strategies
   - Allows for flexible validation rules

### Navigation

Navigation is implemented using React Navigation with:

1. **Stack Navigator** for main navigation flow
2. **Tab Navigator** for the main app sections
3. **Custom animations** for smooth transitions
4. **Type safety** with TypeScript for navigation parameters

### State Management

State management is handled through:

1. **Local component state** for UI-specific state
2. **Custom hooks** for shared state logic
3. **Context API** for global state (authentication)

### Form Handling

Forms are managed with:

1. **React Hook Form** for efficient form state management
2. **Yup** for schema validation
3. **Custom error handling** for user feedback

### Animations

The app features rich animations using React Native Reanimated:

1. **List item animations** for smooth entry and exit
2. **Button feedback** with scale animations
3. **Screen transitions** with custom interpolations
4. **Form feedback** animations for error states
5. **Tab bar animations** for improved user experience

### API Integration

API communication is handled through:

1. **Axios instance** with centralized configuration
2. **Interceptors** for error handling and authentication
3. **Repository layer** abstracting API calls
4. **Retry logic** for handling network issues

### Error Handling

The application implements robust error handling:

1. **Graceful degradation** when API calls fail
2. **Retry mechanisms** with exponential backoff
3. **User-friendly error messages**
4. **Error boundaries** to prevent app crashes

## Backend Architecture

### Architecture Overview

The backend of Hoagie Hub is built with a layered architecture pattern to ensure separation of concerns and maintainability:

1. **Controllers Layer** - Handles HTTP requests and responses
2. **Services Layer** - Contains business logic
3. **Repository Layer** - Manages data access and persistence
4. **Models Layer** - Defines data structures and schemas

This architecture follows the Dependency Injection pattern provided by NestJS, making components easy to test and maintain.

### Database Design

The MongoDB database consists of three main collections:

1. **Users** - Stores user information
   - Fields: name, email, password (hashed)
   - Relationships: One-to-many with Hoagies and Comments

2. **Hoagies** - Stores sandwich recipes
   - Fields: name, ingredients (array), picture, creator (reference to User), collaborators (array of User references)
   - Relationships: Many-to-one with User (creator), Many-to-many with User (collaborators), One-to-many with Comments

3. **Comments** - Stores user comments on hoagies
   - Fields: text, user (reference to User), hoagie (reference to Hoagie)
   - Relationships: Many-to-one with User and Hoagie

### Design Patterns Used

1. **Repository Pattern**
   - Abstracts data access logic
   - Provides a consistent interface for database operations
   - Enables easier testing through dependency injection

2. **Service Layer Pattern**
   - Encapsulates business logic
   - Coordinates between controllers and repositories
   - Enforces business rules and validation

3. **DTO Pattern (Data Transfer Objects)**
   - Defines structures for data input and output
   - Enables validation and type safety
   - Separates data representation from domain models

4. **Base Repository Pattern**
   - Provides common CRUD operations for all repositories
   - Reduces code duplication
   - Ensures consistency across data access operations

### Pagination Implementation

The application implements a reusable pagination system through:

1. **PaginationHelper** - A utility class that handles:
   - Creating pagination stages for MongoDB aggregation
   - Generating pagination metadata
   - Providing a consistent interface for paginated results

2. **PaginationDto** - A standardized data transfer object for pagination parameters
   - Validates input parameters
   - Provides default values
   - Enables consistent API behavior

### MongoDB Optimization

The database implementation includes several optimizations:

1. **Indexes** on frequently queried fields
2. **Aggregation Pipelines** for efficient data retrieval with joins
3. **Projections** to limit the data retrieved
4. **Pre-processing** of queries to optimize performance

### Authentication

Authentication is implemented using:

1. **JWT (JSON Web Tokens)** for stateless authentication
2. **bcrypt** for secure password hashing
3. **Guards** to protect routes requiring authentication

## API Documentation

### Authentication Endpoints

```
POST /auth/signup - Register a new user
POST /auth/login - Login with credentials
```

### Hoagie Endpoints

```
GET /hoagies - Get paginated list of hoagies
GET /hoagies/:id - Get a specific hoagie by ID
POST /hoagies - Create a new hoagie
PUT /hoagies/:id - Update a hoagie
DELETE /hoagies/:id - Delete a hoagie
GET /hoagies/user/:userId - Get hoagies created by a specific user
GET /hoagies/collaborations - Get hoagies where user is a collaborator
POST /hoagies/:id/collaborators/:userId - Add a collaborator to a hoagie
DELETE /hoagies/:id/collaborators/:userId - Remove a collaborator
GET /hoagies/:id/collaborators/count - Get collaborator count
```

### Comment Endpoints

```
GET /comments/hoagie/:hoagieId - Get comments for a hoagie
POST /comments - Create a new comment
GET /comments/count/hoagie/:hoagieId - Get comment count for a hoagie
```

## Setup and Installation

1. Install dependencies:
```bash
# Install backend dependencies
cd backend-sandwich
yarn install

# Install frontend dependencies
cd frontend-sandwich
yarn install
```

2. Create a `.env` file in the backend directory with the following variables:
```
DATABASE_URL=mongodb+srv://teamzz111:CVP6ILbOGQDx3CeL@cluster0.mgtqle6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=secret
```

3. Install additional dependencies for the frontend:
```bash
cd frontend-sandwich
npx pod-install # for iOS
```

## Running the Project

### Backend

```bash
cd backend-sandwich
yarn start
```

The backend will be available at http://localhost:3000

### Frontend

```bash
cd frontend-sandwich
yarn
yarn ios
```

## Bonus Features Implemented

### Backend
- Collaborator system for hoagies
- Rate limiting with NestJS Throttler
- Input validation with class-validator
- Enhanced error handling
- Database optimization

### Frontend
- Animations using React Native Reanimated
- Form validation with React Hook Form and Yup
- Infinite scrolling and pagination
- Custom tab bar with animations
- Error handling with retry mechanism
- Type safety with TypeScript throughout the application

## Database 

![fL91IZCn5Dxd58_P57wO2_oKKgbAHKIf59UIJfvj99EKv8srj3s1A_K0tUX6t7a4BzGZc4d9OB0kYhF9c-_xtdlVDvck8swfAXKZIGfXitv-W3CZK1au6a0EVSF74XrSpXrXwHXhmI7UI2qB-VcXGI2W9YcuGCVgYkQGRTQFBp1qQ5q6t6qhM33mpp-ubWB-m_de5Wiw4T1kNvnsEe7Byt1eNg9NEB9IZmE29PUgWNpBCBPC](https://github.com/user-attachments/assets/69b9bb96-a4c1-4612-807f-b974f13c9b60)

## Swagger Docs

![Screenshot 2025-04-10 at 1 39 17 AM](https://github.com/user-attachments/assets/91a09e4c-b348-444c-9a6b-9c741d7c2be3)
![Screenshot 2025-04-10 at 1 40 34 AM](https://github.com/user-attachments/assets/b1b3a8e4-fcf3-461e-bf3c-cc5d4adc8785)
![Screenshot 2025-04-10 at 1 41 04 AM](https://github.com/user-attachments/assets/b00e6ed6-c9f4-48e0-811e-965f72e83c93)

