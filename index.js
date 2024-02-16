import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/img");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// **** This data point loads up the data for each card
var data = [];

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Browse Page functionality
app.get("/browse", (req, res) => {
  res.render("browse.ejs", { data: data });
});
// Need to add function for validation of files
app.post("/additem", upload.array("image", 4), (req, res) => {
  var album = [];
  req.files.forEach((image) => {
    album.push(image.filename);
  });
  let part = {
    name: req.body.name,
    description: req.body.description,
    image: req.files[0].filename,
    album: album,
  };
  console.log(part.album);
  data.unshift(part);
  console.log(`${part.name} has been submitted!`);
  res.render("browse.ejs", { data: data });
});

// Contact Us page
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.listen(port, (res, req) => {
  console.log("Server Initiated!");
});
