const express = require("express");
const cors = require("cors");

const app = express();
const admin = require("./routes/adminRoutes");
const customerRouter = require("./routes/customerRoutes");
const ClientsInfo = require("./models/ClientsInfo");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());
// app.use(express.bodyParser({ limit: "50mb" }));
app.use(cors());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://contact-info-five.vercel.app/"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
// app.use(
//   fileUpload({
//     limits: { fileSize: 50 * 1024 * 1024 },
//     useTempFiles: true,
//   })
// );

//stati folder path
// app.use(express.static(path.resolve(__dirname, "public")));

app.use("/api/v1", admin);
app.use("/api/v1", customerRouter);
app.post("/userinfo", (req, res) => {
  const { data } = req.body;
  const { name, phone, bankaccount, ifsc, branch, photo } = data;
  console.log(req.body);
  try {
    const result = ClientsInfo.create({
      name: name,
      phone: phone,
      bankaccount: bankaccount,
      ifsc: ifsc,
      branch: branch,
      photo: photo,
    });
    console.log(result);
    return res.status(200).json({ message: "use created successfully" });
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
