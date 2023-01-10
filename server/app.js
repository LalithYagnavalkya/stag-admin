const express = require("express");
const cors = require("cors");

const app = express();
const admin = require("./routes/adminRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());
app.use(cors());
// app.use(
//   fileUpload({
//     limits: { fileSize: 50 * 1024 * 1024 },
//     useTempFiles: true,
//   })
// );

app.use("/api/v1", admin);

app.get("/", (req, res) => {
  res.send("Server is working");
});

module.exports = app;
