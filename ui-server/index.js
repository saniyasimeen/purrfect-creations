const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Attach middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "./dist")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist", "index.html"));
});

// Start app
app.listen(process.env.PORT || 3000, () => {
  console.log("Web service started");
});
