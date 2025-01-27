require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dns = require("dns");
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
const urlArray = [];
app.post("/api/shorturl", (req, res) => {
  if (!req.body.url.includes("http")) {
    res.json({ error: "invalid url" });
  } else {
    console.log(`valid ${req.body.url}`);
    const urlJson = {
      original_url: req.body.url,
      short_url: urlArray.length,
    };
    urlArray.push(urlJson);
    console.log(urlArray);
    res.json(urlJson);
  }
});
app.get("/api/shorturl/:index", function (req, res) {
  console.log(`trying to reach /api/shorturl/${req.params.index}`);
  try {
    res.redirect(urlArray[parseInt(req.params.index)].original_url);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
