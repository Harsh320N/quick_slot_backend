const express = require('express');
const db = require('../db');
const currentUser = require('../middleware/currentUser');
const { isValidDate, isValidHour } = require('../slots');

const router = express.Router();

router.post('/', currentUser, (req, res) => {
  const { venueId, date, startHour } = req.body || {};

  if (!Number.isInteger(venueId)) {
    return res.status(400).json({ error: 'venueId is required' });
  }
  if (!isValidDate(date)) {
    return res.status(400).json({ error: 'date must be YYYY-MM-DD' });
  }
  if (!isValidHour(startHour)) {
    return res.status(400).json({ error: 'startHour is outside opening hours' });
  }

  const venue = db.prepare('SELECT id FROM venues WHERE id = ?').get(venueId);
  if (!venue) {
    return res.status(404).json({ error: 'Venue not found' });
  }

  try {
    const result = db
      .prepare(
        `INSERT INTO bookings (user_id, venue_id, date, start_hour)
         VALUES (?, ?, ?, ?)`
      )
      .run(req.user.id, venueId, date, startHour);

    const booking = db
      .prepare('SELECT * FROM bookings WHERE id = ?')
      .get(result.lastInsertRowid);
    return res.status(201).json(booking);
  } catch (err) {
    // the partial unique index rejects a second active booking on the same
    // slot - whoever loses that race gets a clean 409 instead of a crash.
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'Slot already booked' });
    }
    throw err;
  }
});

module.exports = router;
