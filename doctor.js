const express = require("express");
const db = require("../db");

const router = express.Router();

/* Create prescription */
router.post("/prescribe", (req, res) => {
  const orderId = "ORD" + Date.now();
  const { doctor_id, patient_name, details } = req.body;

  db.query(
    "INSERT INTO orders (order_id, doctor_id, patient_name, status) VALUES (?, ?, ?, ?)",
    [orderId, doctor_id, patient_name, "Created"],
    err => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      db.query(
        "INSERT INTO prescriptions (order_id, details) VALUES (?, ?)",
        [orderId, details]
      );

      res.json({ orderId });
    }
  );
});

/* NEW: Doctor prescription history */
router.post("/prescribe", (req, res) => {
  const { doctor_id, patient_name, details } = req.body;

  const orderId = "ORD" + Date.now();

  // 1️⃣ Insert into orders FIRST
  db.query(
    "INSERT INTO orders (order_id, patient_name, status) VALUES (?, ?, 'Created')",
    [orderId, patient_name],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      // 2️⃣ Insert into prescriptions
      db.query(
        "INSERT INTO prescriptions (order_id, doctor_id, details) VALUES (?, ?, ?)",
        [orderId, doctor_id, details],
        (err2) => {
          if (err2) {
            return res.status(500).json({ error: err2 });
          }

          // 3️⃣ Success
          res.json({
            message: "Prescription created successfully",
            orderId: orderId
          });
        }
      );
    }
  );
});

module.exports = router;
