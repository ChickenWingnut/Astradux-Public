import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// Constructor for adding a part(may need to change for database)
function item(name, description) {
  this.name = name;
  this.description = description;
}

let data = {
  title: ["ball", "bananna"],
  description: ["cool ball", "cool bananna"],
};

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Browse Page functionality
app.get("/browse", (req, res) => {
  res.locals = data;
  res.render("browse.ejs");
});
app.post("/additem", (req, res) => {
  res.locals = data;
  data.name.push(req.body.name);
  data.description.push(req.body.description);
  res.render("browse.ejs");
});

// Contact Us page
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.listen(port, (res, req) => {
  console.log("Server Initiated!");
});
