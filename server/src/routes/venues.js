const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const venues = db.prepare('SELECT * FROM venues ORDER BY id').all();
  res.json(venues);
});

module.exports = router;
