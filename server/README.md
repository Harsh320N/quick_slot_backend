# QuickSlot — Backend (Part A)

REST API for booking sports slots, built with Node.js. The one hard rule:
a slot can never be double-booked.

Stack: Node.js + Express + SQLite (`better-sqlite3`).

## Setup

```bash
cd server
npm install
npm run seed      # creates the db, seeds venues
npm start         # http://localhost:3000  (npm run dev to auto-reload)
```

Health check:

```bash
curl localhost:3000/health
curl localhost:3000/venues
```

## Endpoints (built incrementally)

- [x] `GET /venues` — list venues
- [x] `GET /venues/:id/slots?date=YYYY-MM-DD` — slots for a date, with status
- [x] `POST /bookings` — book a slot, concurrency-safe
- [x] `GET /users/:id/bookings` — a user's bookings
- [ ] `DELETE /bookings/:id` — cancel a booking
