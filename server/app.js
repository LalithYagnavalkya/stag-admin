const express = require("express");
const cors = require("cors");

const app = express();
const admin = require("./routes/adminRoutes");
const customerRouter = require("./routes/customerRoutes");
const ClientsInfo = require("./models/ClientsInfo");
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors({ credentials: true, origin: true }));

app.use("/api/v1", admin);
app.use("/api/v1", customerRouter);

app.post("/userinfo", cors(corsOptions), async (req, res) => {
  const { data } = req.body;
  const { name, phone, bankaccount, ifsc, branch, photo } = data;
  console.log(req.body);
  console.log("this is register");
  try {
    const result = await ClientsInfo.create({
      name: name,
      phone: phone,
      bankaccount: bankaccount,
      ifsc: ifsc,
      branch: branch,
      photo: photo,
    });
    console.log(result);
    return res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "something went wrong", erro: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Server is working");
});

module.exports = app;
