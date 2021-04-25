//jshint esversion: 6


const express = require("express");
const dotenv = require('dotenv');


const app = express();

const request = require("request");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

let menu_id;

//Load config
dotenv.config({ path: './config.env' });


app.get("/reservation", function (req, res) {
  res.sendFile(__dirname + "/reservation.html");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/restaurant.html");
});

app.get("/drinks-menu", function (req, res) {
  res.sendFile(__dirname + "/drinks-menu.html");
});

app.get("/starters-menu", function (req, res) {
  res.sendFile(__dirname + "/starters-menu.html");
});

app.get("/mainCourse-menu", function (req, res) {
  res.sendFile(__dirname + "/mainCourse-menu.html");
});

app.get("/dessert-menu", function (req, res) {
  res.sendFile(__dirname + "/dessert-menu.html");
});

app.get("/gallery", function (req, res) {
  res.sendFile(__dirname + "/photo-gallery.html")
});


app.post("/reservation", function (req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.mail;
  var phoneNumber = req.body.phoneNum;
  // var date = req.body.day + "/" + req.body.month + "/" + req.body.year;
  var Address = req.body.address;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
          ADDRESS: Address,
          PHONE: phoneNumber,
        },
      },
    ],
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: process.env.MAILCHIMP_URL,
    method: "POST",
    headers: {
      Authorization: process.env.MAILCHIMP_AUTH,
    },
    body: jsonData,
  };
  request(options, function (error, response, body) {
    if (error) res.sendFile(__dirname + "/failure.html");
    else {
      if (response.statusCode == 200) res.sendFile(__dirname + "/success.html");
      else res.sendFile(__dirname + "/failure.html");
    }
  });
});


app.post("/failure", function (req, res) {
  res.redirect("/reservation");
});

app.post("/", function (req, res) {
  let id = req.body.button;
  res.redirect("/" + id);
});


app.post("/menu_", function (req, res) {
  menu_id = req.body.button;

  if (menu_id === "home")
    res.redirect("/");
  else {
    res.redirect("/" + menu_id);
  }
});

app.post("/gallery", function (req, res) {
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started at port 3000");
});



// 5cb05a666e484286da19a398c7543fc0-us10

// aab8ba2e53
