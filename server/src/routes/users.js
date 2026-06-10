const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/:id/bookings', (req, res) => {
  const bookings = db
    .prepare(
      `SELECT b.id, b.venue_id, b.date, b.start_hour, b.status, b.created_at,
              v.name AS venue_name, v.sport, v.location
       FROM bookings b
       JOIN venues v ON v.id = b.venue_id
       WHERE b.user_id = ? AND b.status = 'active'
       ORDER BY b.date, b.start_hour`
    )
    .all(req.params.id);

  res.json(bookings);
});

module.exports = router;
