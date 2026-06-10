# QuickSlot — Backend (Part A)

REST API for booking sports slots, built with Node.js. The one hard rule:
a slot can never be double-booked.

Stack: Node.js + Express (SQLite added when persistence comes in).

## Setup

```bash
cd server
npm install
npm start         # http://localhost:3000  (npm run dev to auto-reload)
```

Health check:

```bash
curl localhost:3000/health
```

## Endpoints (built incrementally)

- [ ] `GET /venues` — list venues
- [ ] `GET /venues/:id/slots?date=YYYY-MM-DD` — slots for a date, with status
- [ ] `POST /bookings` — book a slot, concurrency-safe
- [ ] `GET /users/:id/bookings` — a user's bookings
- [ ] `DELETE /bookings/:id` — cancel a booking
