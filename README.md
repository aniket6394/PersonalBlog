# 📝 Personal Blog Admin System

A full-stack blog management application with authentication, CRUD operations, and a clean admin panel. Built to demonstrate real-world backend + frontend integration using modern tools.

---

## 🚀 Features

- 🔐 Admin authentication (JWT-based)
- 📰 View all blogs
- ✏️ Create new blog posts
- 🛠️ Edit existing posts
- 🗑️ Delete blogs
- ⚡ Real-time UI updates using React Query
- 🔄 Automatic cache invalidation after mutations

---

## 🧱 Tech Stack

### Frontend

- React
- React Router
- TanStack Query (React Query)

### Backend

- Node.js
- Express.js
- JWT Authentication
- File-based storage (JSON)

---

## 🔗 API Endpoints

### Public

- `GET /blogs` → Get all blogs
- `GET /blog/:id` → Get single blog
- `POST /login` → Authenticate admin

### Protected (Requires Token)

- `GET /admin` → Get all blogs (admin)
- `POST /admin/blog` → Create blog
- `PUT /admin/blog/:id` → Update blog
- `DELETE /admin/blog/:id` → Delete blog

---

## 🔐 Authentication

- Login with:

  ```
  email: admin@gmail.com
  password: 1234
  ```

- Server returns JWT token
- Token is stored in localStorage
- All admin routes require:

  ```
  Authorization: Bearer <token>
  ```

---

## ⚙️ Installation

### 1. Clone the repo

```
git clone https://github.com/aniket6394/PersonalBlog.git
cd your-repo
```

### 2. Install dependencies

#### Backend

```
cd backend
npm install
node server.js
```

#### Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🧠 How It Works

1. Admin logs in → receives JWT
2. Token stored in localStorage
3. Protected routes verify token
4. React Query handles:
   - fetching data
   - caching
   - mutations
   - refetching after updates

---

## ⚡ Key Concepts Implemented

- RESTful API design
- Authentication middleware
- CRUD operations
- React Query caching strategy
- Protected routes in React
- Form handling (refs)

---

## 🚧 Future Improvements

- 🗄️ Replace JSON storage with MongoDB
- 🔄 Add pagination & search
- 🎨 Improve UI/UX
- 🧠 Add role-based access control
- ## ⚡ Add optimistic updates
