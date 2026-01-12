const express = require("express");
const db = require("../db");

const router = express.Router();
// DEBUG: check all orders
router.get("/debug/orders", (req, res) => {
  db.query("SELECT order_id, status FROM orders", (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(rows);
  });
});

/* Track order status */
router.get("/track/:orderId", (req, res) => {
  const orderId = req.params.orderId;

  // 1️⃣ First check orders table
  db.query(
    "SELECT status FROM orders WHERE order_id = ?",
    [orderId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      if (rows.length > 0) {
        // Order exists with status
        return res.json({ status: rows[0].status });
      }

      // 2️⃣ Fallback: check prescriptions table
      db.query(
        "SELECT order_id FROM prescriptions WHERE order_id = ?",
        [orderId],
        (err2, rows2) => {
          if (err2) {
            return res.status(500).json({ error: err2 });
          }

          if (rows2.length > 0) {
            // Prescription exists but pharmacy not processed yet
            return res.json({ status: "Created" });
          }

          // 3️⃣ Not found anywhere
          return res.json({ status: "Invalid Order ID" });
        }
      );
    }
  );
});


/* NEW: Get full prescription details */
router.get("/prescription/:orderId", (req, res) => {
  db.query(
    `SELECT o.patient_name, p.details
     FROM orders o
     JOIN prescriptions p ON o.order_id = p.order_id
     WHERE o.order_id = ?`,
    [req.params.orderId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.json({ error: "Invalid Order ID" });
      }
    }
  );
});

module.exports = router;
