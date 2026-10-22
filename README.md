# Chat App

A full-stack chat application: a Node.js/Express API with token-based authentication and
role-aware middleware, and a Vue 3 front end on top of it.

## Structure

```
backend/          Express API
  controller/     user controller
  models/         Mongoose user model
  middlewares/    auth, admin role check, token validity check
  db/             user seeder
frontend/         Vue 3 client
  src/views/      Auth views (login, register, dashboard)
  src/store/      Vuex modules for auth and API access
```

## Backend

- **Auth** — `middlewares/auth.js` guards protected routes.
- **Roles** — `middlewares/admin.js` restricts admin-only endpoints.
- **Token validity** — `middlewares/checkTokenValidity.js` rejects expired or revoked tokens
  instead of letting them through to the handler.
- **Data** — Mongoose models and a seed script (`db/userSeeder.js`, `seed.js`).

## Frontend

Vue 3 with Vuex for auth state (`store/auth/*`) and a local-storage plugin for session
persistence, plus routing for the auth views and the dashboard.

## Running it

```bash
# API
cd backend
npm install
node index.js

# client
cd frontend
npm install
npm run serve
```

Configuration is read from `backend/.env` — never commit real credentials.
