const db = require('../db');

// Light auth: the Flutter app does Firebase login and sends the Firebase uid
// as X-User-Id. We trust it and create the user row on first sight so we never
// have to pre-register anyone. X-User-Name is optional, just for a readable name.
function currentUser(req, res, next) {
  const userId = req.header('X-User-Id');
  if (!userId) {
    return res.status(401).json({ error: 'Missing X-User-Id header' });
  }

  const name = req.header('X-User-Name') || 'Player';
  db.prepare('INSERT OR IGNORE INTO users (id, name) VALUES (?, ?)').run(userId, name);

  req.user = { id: userId, name };
  next();
}

module.exports = currentUser;
