const { openHour, closeHour } = require('./config');

function pad(n) {
  return String(n).padStart(2, '0');
}

// slots are virtual - we don't store a row per hour, we generate the grid
// for a given date and overlay whatever active bookings exist.
function buildSlots(venueId, date, bookedHours) {
  const slots = [];
  for (let hour = openHour; hour < closeHour; hour++) {
    slots.push({
      id: `${venueId}:${date}:${hour}`,
      venueId,
      date,
      startHour: hour,
      startTime: `${pad(hour)}:00`,
      endTime: `${pad(hour + 1)}:00`,
      status: bookedHours.has(hour) ? 'booked' : 'available',
    });
  }
  return slots;
}

// expects strictly YYYY-MM-DD and a real calendar date
function isValidDate(date) {
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const d = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && date === d.toISOString().slice(0, 10);
}

function isValidHour(hour) {
  return Number.isInteger(hour) && hour >= openHour && hour < closeHour;
}

module.exports = { buildSlots, isValidDate, isValidHour };
