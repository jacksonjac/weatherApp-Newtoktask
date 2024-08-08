const express = require('express');
const router = express.Router();
const multer = require('multer');
const XLSX = require('xlsx');
const db = require('../db');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/excel', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send('No file uploaded');

  const workbook = XLSX.read(file.buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  // Process the data and insert into the database
  data.forEach((row, index) => {
    if (index === 0) return; // Skip header row
    const [country, state, district, city] = row;
    const query = 'INSERT INTO locations (country, state, district, city) VALUES (?, ?, ?, ?)';
    db.query(query, [country, state, district, city], (err, result) => {
      if (err) console.error('Error inserting row:', err);
    });
  });

  res.status(200).send('File processed successfully');
});

module.exports = router;