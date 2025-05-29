# CultFit Backend

A robust backend for a fitness center management system, built with **Node.js**, **Express**, **TypeScript**, **Sequelize (MySQL)**, and **Redis**. This project supports user authentication, class scheduling, holiday management, and more, with scalable job processing using BullMQ.

---

## 🚀 Features

- **Express REST API** for all core resources (users, centers, classes, holidays, etc.)
- **TypeScript** for type safety and maintainability
- **Sequelize ORM** with MySQL for relational data modeling
- **BullMQ** for background job processing (class instance scheduling)
- **Zod** for request validation
- **JWT Authentication** and role-based access (admin/user)
- **Winston** logging with correlation IDs for traceability
- **Centralized error handling**
- **Environment-based configuration**
- **Paranoid (soft) deletes** for key models

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MySQL](https://www.mysql.com/) database
- [Redis](https://redis.io/) server (for BullMQ)
- [Git](https://git-scm.com/)

---

## 📦 Installation

```sh
git clone https://github.com/your-username/cultfit-backend.git
cd cultfit-backend

npm install
```

---

## ⚙️ Configuration

1. Copy `.env.example` to `.env` and fill in your environment variables:

```sh
cp .env.example .env
```

2. Update `.env` with your MySQL and JWT credentials.

---

## 🗄️ Database Setup

- Ensure your MySQL server is running and the database specified in `.env` exists.
- The Sequelize models will auto-sync on server start (see `src/server.ts`).

---

## 🚦 Running the Server

### Development

```sh
npm run dev
```

### Production

```sh
npm run build
npm start
```

### BullMQ Worker

To process background jobs (class instance creation):

```sh
npm run worker
```

---

## 🧪 API Endpoints

- **Auth:**  
  - `POST /api/v1/signup` – Register a new user  
  - `POST /api/v1/signin` – Login and receive JWT

- **Centers:**  
  - `GET /api/v1/centers` – List all centers  
  - `POST /api/v1/centers` – Create a center  
  - `PATCH /api/v1/centers/:id` – Update a center  
  - `DELETE /api/v1/centers/:id` – Delete a center

- **Class Schedules:**  
  - `POST /api/v1/classes` – Schedule a class  
  - `GET /api/v1/classes/:id` – Get class schedules for a center

- **Class Types:**  
  - `POST /api/v1/classtypes` – Create a class type

- **Holidays:**  
  - `POST /api/v1/holidays` – Add a holiday  
  - `DELETE /api/v1/holidays/:id` – Remove a holiday

> **Note:** Most endpoints (except `/signup` and `/signin`) require JWT authentication and admin privileges.

---

## 🛡️ Authentication & Authorization

- Use the `Authorization: Bearer <token>` header for protected routes.
- Admin-only routes are enforced via middleware.

---

## 🛠️ Job Queue Dashboard

- BullMQ dashboard available at:  
  [http://localhost:PORT/admin/queues](http://localhost:PORT/admin/queues)

---

## 📝 Project Structure

```
src/
  controllers/    # Route handlers
  dto/            # Data transfer objects (types)
  jobs/           # BullMQ workers and queues
  middlewares/    # Express middlewares (auth, error, etc.)
  models/         # Sequelize models
  repositories/   # DB access logic
  routers/        # Express routers
  services/       # Business logic
  utils/          # Helpers, error classes, etc.
  validators/     # Zod schemas for validation
```

---

## 🧑‍💻 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## 📄 License

MIT

---

## 📬 Contact

For questions, open an issue or contact [your-email@example.com](mailto:your-email@example.com).
