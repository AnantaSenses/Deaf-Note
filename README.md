# Deaf Note API Documentation

Welcome to the Deaf Note API documentation for the Visignify app. This API allows users to register, log in, manage user details, and perform CRUD operations on notes. The API is deployed and can be accessed through [https://deaf-note-api-3oszvxhtmq-et.a.run.app](https://deaf-note-api-3oszvxhtmq-et.a.run.app).

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Authentication](#authentication)
    - [Register](#register)
    - [Login](#login)

3. [User Operations](#user-operations)
    - [Get User](#get-user)
    - [Update User](#update-user)
    - [Delete User](#delete-user)

4. [Note Operations](#note-operations)
    - [Get All Notes](#get-all-notes)
    - [Get Note by ID](#get-note-by-id)
    - [Create Note](#create-note)
    - [Update Note](#update-note)
    - [Delete Note](#delete-note)

## Tech Stack

1. **JavaScript:** [Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

2. **Express.js:** [Documentation](https://expressjs.com/)

3. **Prisma:** [Documentation](https://www.prisma.io/docs/)

4. **Webpack:** [Documentation](https://webpack.js.org/)

5. **Cloud Run:** [Documentation](https://cloud.google.com/run/docs)

6. **Cloud SQL:** [Documentation](https://cloud.google.com/sql/docs)

## Authentication

### Register

**Endpoint:** `/api/users/register`  
**Method:** `POST`  
**Description:** Register a new user.

#### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Response

```json
{
  "message": "Registration successful",
  "user": {
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2023-12-20T06:45:56.488Z",
    "updated_at": "2023-12-20T06:46:49.608Z"
  },
  "token": "jsonwebtoken"
}
```

### Login

**Endpoint:** `/api/users/login`  
**Method:** `POST`  
**Description:** Log in an existing user.

#### Request

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Response

```json
{
  "message": "Login successful",
  "user": {
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2023-12-20T06:45:56.488Z",
    "updated_at": "2023-12-20T06:46:49.608Z"
  },
  "token": "jsonwebtoken"
}
```

## User Operations

### Get User

**Endpoint:** `/api/users`  
**Method:** `GET`  
**Description:** Get details of the authenticated user.

#### Request Header
```plaintext
Authorization: Bearer jsonwebtoken
```

#### Response

```json
{
  "message": "User found with ID 1",
  "data": {
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2023-12-20T06:45:56.488Z",
    "updated_at": "2023-12-20T06:46:49.608Z"
  }
}
```

### Update User

**Endpoint:** `/api/users`  
**Method:** `PUT`  
**Description:** Update details of the authenticated user.

#### Request Header
```plaintext
Authorization: Bearer jsonwebtoken
```

#### Request

```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "password": "newsecurepassword"
}
```

#### Response

```json
{
  "message": "User updated successfully",
  "user": {
    "user_id": 1,
    "name": "Updated Name",
    "email": "updated@example.com",
    "created_at": "2023-12-20T06:45:56.488Z",
    "updated_at": "2023-12-20T07:05:04.221Z"
  }
}
```

### Delete User

**Endpoint:** `/api/users`  
**Method:** `DELETE`  
**Description:** Delete the authenticated user.

#### Request Header
```plaintext
Authorization: Bearer jsonwebtoken
```

#### Response

```json
{
  "message": "User deleted successfully",
  "user": {
    "user_id": 1,
    "name": "Updated Name",
    "email": "updated@example.com",
    "created_at": "2023-12-20T06:45:56.488Z",
    "updated_at": "2023-12-20T07:05:04.221Z"
  }
}
```

## Note Operations

### Get All Notes

**Endpoint:** `/api/notes`  
**Method:** `GET`  
**Description:** Get all notes for the authenticated user.

#### Request Header
```plaintext
Authorization: Bearer jsonwebtoken
```

#### Response

```json
{
  "notes": [
    {
      "note_id": 1,
      "user_id": 1,
      "content": "Note content 1",
      "created_at": "2023-12-20T06:43:44.363Z",
      "updated_at": "2023-12-20T06:45:06.641Z"
    },
    {
      "note_id": 2,
      "user_id": 1,
      "content": "Note content 2",
      "created_at": "2023-12-20T06:43:44.363Z",
      "updated_at": "2023-12-20T06:45:06.641Z"
    }
  ]
}
```

### Get Note by ID

**Endpoint:** `/api/notes/:noteId`  
**Method:** `GET`  
**Description:** Get a specific note by ID for the authenticated user.

#### Request Header
```plaintext
Authorization: Bearer jsonwebtoken
```

#### Response

```json
{
  "note": {
    "note_id": 1,
    "user_id": 1,
    "content": "Note content 1",
    "created_at": "2023-12-20T06:43:44.363Z",
    "updated_at": "2023-12-20T06:45:06.641Z"
  }
}
```

### Create Note

**Endpoint:** `/api/notes`  
**Method:** `POST`  
**Description:** Create a new note for the authenticated user.

#### Request Header
```plaintext
Authorization: Bearer jsonwebtoken
```

#### Request

```json
{
  "content": "New note content"
}
```

#### Response

```json
{
  "message": "Note created successfully",
  "note": {
    "note_id": 3,
    "user_id": 1,
    "content": "New note content",
    "created_at": "2023-12-20T07:00:19.569Z",
    "updated_at": "2023-12-20T07:00:19.569Z"
  }
}
```

### Update Note

**Endpoint:** `/api/notes/:noteId`  
**Method:** `PUT`  
**Description:** Update a specific note by ID for the authenticated user.

#### Request Header
```plaintext
Authorization: Bearer jsonwebtoken
```

#### Request

```json
{
  "content": "Updated note content"
}
```

#### Response

```json
{
  "message": "Note updated successfully",
  "note": {
    "note_id": 3,
    "user_id": 1,
    "content": "Updated note content",
    "created_at": "2023-12-20T07:00:19.569Z",
    "updated_at": "2023-12-20T07:01:33.866Z"
  }
}
```

### Delete Note

**Endpoint:** `/api/notes/:noteId`  
**Method:** `DELETE`  
**Description:** Delete a specific note by ID for the authenticated user.

#### Request Header
```plaintext
Authorization: Bearer jsonwebtoken
```

#### Response

```json
{
  "message": "Note deleted successfully"
}
```
