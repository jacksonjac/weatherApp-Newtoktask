const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/add", (req, res) => {
  const { country, state, district, city } = req.body;

  const insertQuery =
    "INSERT INTO locations (country, state, district, city) VALUES (?, ?, ?, ?)";

  db.query(insertQuery, [country, state, district, city], (err, result) => {
    if (err) {
      console.error("Error executing insert query", err);
      return res.status(500).send({
        success: false,
        message: "Error adding location",
        error: err.message,
      });
    }

    const insertedId = result.insertId;
    const selectQuery = "SELECT * FROM locations WHERE id = ?";

    db.query(selectQuery, [insertedId], (err, rows) => {
      if (err) {
        console.error("Error executing select query", err);
        return res.status(500).send({
          success: false,
          message: "Error retrieving inserted location",
          error: err.message,
        });
      }

      res.status(200).send({
        success: true,
        message: "Location added successfully",
        data: rows[0],
      });
    });
  });
});

router.get("/", (req, res) => {
  const query = "SELECT * FROM locations";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
});

router.post("/bulk", (req, res) => {
  const locations = req.body; // Expecting an array of location objects

  // Validate data format
  if (!Array.isArray(locations) || locations.length === 0) {
    return res.status(400).send("Invalid data format");
  }

  // Track errors and successful inserts
  let successCount = 0;
  let errors = [];
  let duplicateCities = [];

  // Helper function to check if a city already exists
  const checkCitiesExist = (cities, callback) => {
    db.query(
      "SELECT city FROM locations WHERE city IN (?)",
      [cities],
      (err, results) => {
        if (err) {
          errors.push(`Error checking cities: ${err.message}`);
          callback(err);
        } else {
          const existingCities = results.map((row) => row.city);
          callback(null, existingCities);
        }
      }
    );
  };

  // Helper function to insert a location
  const insertLocation = (loc, callback) => {
    db.query(
      "INSERT INTO locations (country, state, district, city) VALUES (?, ?, ?, ?)",
      [loc.country, loc.state, loc.district, loc.city],
      (err, result) => {
        if (err) {
          errors.push(`Error inserting ${loc.city}: ${err.message}`);
        } else {
          successCount++;
        }
        callback();
      }
    );
  };

  const cities = locations.map((loc) => loc.city);

  checkCitiesExist(cities, (err, existingCities) => {
    if (err) {
      return res.status(500).json({ message: "Error checking cities", errors });
    }

    duplicateCities = cities.filter((city) => existingCities.includes(city));

    if (duplicateCities.length > 0) {
      // Return response with duplicates information
      return res.status(200).json({
        status: false,
        message: "Some cities already exist",
        successCount,
        duplicateCities,
      });
    }

    // Insert non-duplicate locations
    let remaining = locations.length;
    locations.forEach((loc) => {
      insertLocation(loc, () => {
        remaining--;
        if (remaining === 0) {
          // All locations processed
          if (errors.length > 0) {
            console.error("Errors occurred:", errors);
            res.status(500).json({
              message: "Some locations failed to upload",
              successCount,
              errors,
            });
          } else {
            res.status(200).json({
              status: true,
              message: "All locations uploaded successfully",
              successCount,
            });
          }
        }
      });
    });
  });
});

module.exports = router;
