const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/doctor", require("./routes/doctor"));
app.use("/pharmacy", require("./routes/pharmacy"));
app.use("/patient", require("./routes/patient"));

app.get("/", (req, res) => {
  res.send("MediFlow Backend Running");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
