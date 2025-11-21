# Back-End Service

This is the back-end service for the application. It provides APIs for managing users and issues.

## Features

- User management (add, get all, delete, sign in)
- Issue management (add, get all, get today's issues)

## Installation

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file and add the following environment variables:
   ```
   MYSQL_HOST=
   MYSQL_USER=
   MYSQL_PASSWORD=
   MYSQL_DB_NAME=
   ```
4. Start the server: `npm start`

## Usage

The server will be running at `http://localhost:3000`.

## API Endpoints

- `POST /api/v1/user/add`: Add a new user.
- `POST /api/v1/user/signin`: Sign in a user.
- `POST /api/v1/issue/add`: Add a new issue.
- `POST /api/v1/issue/today`: Get today's issues for a user.
- `GET /api/v1/user/getall`: Get all users.
- `GET /api/v1/issue/getall`: Get all issues.
- `DELETE /api/v1/deleteUser/:id`: Delete a user.
# Back-End Service

This is the back-end service for the application. It provides APIs for managing users and issues.

## Features

- User management (add, get all, delete, sign in)
- Issue management (add, get all, get today's issues)

## Installation

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file and add the following environment variables:
   ```
   MYSQL_HOST=
   MYSQL_USER=
   MYSQL_PASSWORD=
   MYSQL_DB_NAME=
   ```
4. Start the server: `npm start`

## Usage

The server will be running at `http://localhost:3000`.

## API Endpoints

- `POST /api/v1/user/add`: Add a new user.
- `POST /api/v1/user/signin`: Sign in a user.
- `POST /api/v1/issue/add`: Add a new issue.
- `POST /api/v1/issue/today`: Get today's issues for a user.
- `GET /api/v1/user/getall`: Get all users.
- `GET /api/v1/issue/getall`: Get all issues.
- `DELETE /api/v1/deleteUser/:id`: Delete a user.
