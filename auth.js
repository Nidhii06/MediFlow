const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/doctor", (req, res) => {
  const { doctor_id, password } = req.body;

  db.query(
    "SELECT * FROM doctors WHERE doctor_id = ? AND password = ?",
    [doctor_id, password],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (result.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    }
  );
});

router.post("/pharmacy", (req, res) => {
  const { pharmacist_id, password } = req.body;

  db.query(
    "SELECT * FROM pharmacists WHERE pharmacist_id = ? AND password = ?",
    [pharmacist_id, password],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (result.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    }
  );
});

module.exports = router;
