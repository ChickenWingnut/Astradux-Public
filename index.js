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
  // res.locals = data;
  // console.log(data);
  res.render("browse.ejs", { data: data });
});
// ******** BUG: cannot use spaces inside name because it breaks modals!!!! ~~~~ may need to use images as file names so that ids of modals are unique...
app.post("/additem", upload.single("image"), (req, res) => {
  let part = {
    name: req.body.name,
    description: req.body.description,
    image: req.file.filename,
  };
  // partNo is used to identify the part
  const partNo = req.file.filename.substring(0, req.file.filename.length - 4);
  data.push(part);
  res.render("browse.ejs", { data: data });
});

// Contact Us page
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.listen(port, (res, req) => {
  console.log("Server Initiated!");
});
