const express = require('express');
const db = require('../db');
const { buildSlots, isValidDate } = require('../slots');

const router = express.Router();

router.get('/', (req, res) => {
  const venues = db.prepare('SELECT * FROM venues ORDER BY id').all();
  res.json(venues);
});

router.get('/:id/slots', (req, res) => {
  const venueId = Number(req.params.id);
  const { date } = req.query;

  if (!isValidDate(date)) {
    return res.status(400).json({ error: 'date query param must be YYYY-MM-DD' });
  }

  const venue = db.prepare('SELECT * FROM venues WHERE id = ?').get(venueId);
  if (!venue) {
    return res.status(404).json({ error: 'Venue not found' });
  }

  const booked = db
    .prepare(
      `SELECT start_hour FROM bookings
       WHERE venue_id = ? AND date = ? AND status = 'active'`
    )
    .all(venueId, date);
  const bookedHours = new Set(booked.map((b) => b.start_hour));

  res.json({
    venue,
    date,
    slots: buildSlots(venueId, date, bookedHours),
  });
});

module.exports = router;
