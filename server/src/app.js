const express = require('express');
const venues = require('./routes/venues');
const bookings = require('./routes/bookings');
const users = require('./routes/users');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/venues', venues);
app.use('/bookings', bookings);
app.use('/users', users);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

module.exports = app;
