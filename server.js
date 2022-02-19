const path = require("path");

const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(cors());

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

// Route To Load Index.html page to browser
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const upload = multer({ storage: fileStorageEngine });

app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("Single FIle upload success");
});

app.post("/multiplefiles", upload.array("images", 2), (req, res) => {
  console.log(req.files);
  res.send("send multiple files upload success");
});

app.listen(3030);
