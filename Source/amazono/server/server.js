const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");

const app = express();
const PORT = process.env.PORT || 3030;

const db = require("./config").mongoURI;


mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

const userRoutes = require("./routes/acccount");
const mainRoutes = require("./routes/main");
const sellerRoutes = require("./routes/seller");
const productSearchRoutes = require("./routes/product-search");
const answerRoutes = require("./routes/answer");

app.use("/api", mainRoutes);
app.use("/api/accounts", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/search", productSearchRoutes);
app.use("/api/answer", answerRoutes);

// Express will serve up production assets like our main.js/css file
app.use(express.static(__dirname + "/client/dist/AngularAmazono"));

// Epxress will serve up index.html file if don't file the route
const path = require("path");

app.get("*", (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'client', 'dist', 'angular-amazono' ,'index.html'));
  res.sendFile(path.join(__dirname + "/client/dist/AngularAmazono/index.html"));
});

app.listen(PORT);
