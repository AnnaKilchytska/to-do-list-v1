const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();

const items = ['Buy food', 'Cook food', 'Eat food'];
const workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {




  // let currentDay = today.getDay();
  // let day = "";
  //
  // if (currentDay === 1) {
  //   day = "Monday";
  // } else if (currentDay === 2){
  //   day = "Tuesday";
  // } else if (currentDay === 3) {
  //   day = "Wednesday";
  // } else if (currentDay === 4) {
  //   day = "Thursday";
  // } else if (currentDay === 5) {
  //   day = "Friday";
  // } else if (currentDay === 6) {
  //   day = "Saturday";
  // } else if (currentDay === 0) {
  //   day = "Sunday";
  // } else {
  //   console.log("Error! Current day is " + currentDay + "!");
  // }


  let day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: items
  })

});

app.post('/', function(req, res) {

  console.log(req.body);

  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item)
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }


})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work list",
    newListItems: workItems
  });
})

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/about", function(req, res) {
  res.render("about");
});


app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
