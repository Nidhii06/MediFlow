const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(rows);
  });
});
router.post("/update", (req, res) => {
  const { orderId, status } = req.body;

  db.query(
    "UPDATE orders SET status = ? WHERE order_id = ?",
    [status, orderId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.json({ success: true });
    }
  );
});

module.exports = router;
