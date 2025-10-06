const express = require('express');
const router = express.Router();
const { getConnection } = require('../event_db');

router.get('/home', (req, res) => {
  const sql = `
    SELECT e.id, e.name, e.purpose, e.start_datetime, e.end_datetime,
           e.city, e.state, e.image_url,
           c.name AS category, o.name AS organization
    FROM events e
    JOIN event_categories c ON e.category_id = c.id
    JOIN organizations o ON e.org_id = o.id
    WHERE e.status = 'active'
    ORDER BY e.start_datetime ASC
  `;
  getConnection().query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.get('/search', (req, res) => {
  const { date, location, category_id } = req.query;

  // default need status is active
  let conditions = ["e.status = 'active'"];
  let params = [];

  // other conditions
  if (date) {
    conditions.push("e.start_datetime <= ? AND (e.end_datetime IS NULL OR e.end_datetime >= ?)");
    params.push(date, date);
  }
  if (location) {
    conditions.push("(e.city LIKE ? OR e.state LIKE ?)");
    params.push(`%${location}%`, `%${location}%`);
  }
  if (category_id) {
    conditions.push("e.category_id = ?");
    params.push(category_id);
  }

  const sql = `
    SELECT e.id, e.name, e.purpose, e.start_datetime, e.end_datetime,
           e.city, e.state, e.image_url,
           c.name AS category, o.name AS organization
    FROM events e
    JOIN event_categories c ON e.category_id = c.id
    JOIN organizations o ON e.org_id = o.id
    WHERE ${conditions.join(" AND ")}
    ORDER BY e.start_datetime ASC
  `;

  getConnection().query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;
