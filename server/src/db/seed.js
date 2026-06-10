const db = require('./index');

const venues = [
  { name: 'Smash Arena', sport: 'Badminton', location: 'Koramangala' },
  { name: 'Baseline Courts', sport: 'Badminton', location: 'Indiranagar' },
  { name: 'Green Turf Park', sport: 'Football', location: 'HSR Layout' },
  { name: 'Powerplay Grounds', sport: 'Cricket', location: 'Whitefield' },
];

const seed = db.transaction(() => {
  db.prepare('DELETE FROM venues').run();
  const insert = db.prepare(
    'INSERT INTO venues (name, sport, location) VALUES (?, ?, ?)'
  );
  for (const v of venues) insert.run(v.name, v.sport, v.location);
});

seed();

console.log(`Seeded ${venues.length} venues.`);
