const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + '/date.js');

const app = express();

const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let day = date.getDate();

  res.render("list", { listTitle: day, newListItems: items });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work list", newListItems: workItems });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;

  if (req.body.list == "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function (req, res) {
  console.log("server has started on port 3000");
});
