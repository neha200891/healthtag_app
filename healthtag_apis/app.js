const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = 48000;
// const PORT = 2730;
const db = require("./database/util");
const bodyparser = require("body-parser");
//database

app.set("view engine", "ejs");
app.set("views", "views");

//admin routes new
const authRoutes = require("./routes/admin/authRoutes");
const userRoutes = require("./routes/admin/userRoutes");
const productRoutes = require("./routes/admin/productRoutes");
const contentRoutes = require("./routes/admin/contentRoutes");
const supportRoutes = require("./routes/admin/supportRoutes");
const subscriptionRoutes = require("./routes/admin/subscriptionRoutes");
//app routes
const appAuthRoutes = require("./routes/app/authRoutes");
const appUsersRoutes = require("./routes/app/userRoutes");
const appProductRoutes = require("./routes/app/productRouters");
const appSupportRoutes = require("./routes/app/supportRoutes");
const appContentRoutes = require("./routes/app/contentRoutes");
const stripeRoute = require("./routes/app/stripe");
const appSubscriptionRoutes = require("./routes/app/subscriptionRoutes");
app.use("/api/v1/stripe/webhook", bodyparser.raw({ type: "*/*" }));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// app.use(express.json());
// app.use(express.urlencoded({extended:false}));

app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
//send hello message
app.get("/", (req, res) => {
  res.send("hello");
});

//route path admin
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/contents", contentRoutes);
app.use("/api/v1/supports", supportRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);

//route path app
app.use("/api/v1/auth", appAuthRoutes);
app.use("/api/v1/user", appUsersRoutes);
app.use("/api/v1/product", appProductRoutes);
app.use("/api/v1/support", appSupportRoutes);
app.use("/api/v1/stripe", stripeRoute);
app.use("/api/v1/content", appContentRoutes);
app.use("/api/v1/subscription", appSubscriptionRoutes);

app.use((error, req, res, next) => {
  const status = false;
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(statusCode).json({ status: status, message: message, data: data });
});

require("./model/relation").relation();
let server;
db.sync({ force: false })
  .then((result) => {
    server = app.listen(PORT, (e) => {
      console.log("server is listening on " + PORT + " port");
    });
  })
  .catch((err) => {
    console.log(err);
  });
