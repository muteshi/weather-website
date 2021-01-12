const express = require("express");
const hbs = require("hbs");
const path = require("path");
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express configs
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Muteshi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Weather App",
    name: "Muteshi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    msg: "You can get help here",
    title: "Help",
    name: "Muteshi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a valid address",
    });
  }

  geocode(req.query.address, (error, { location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(location, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        address: req.query.address,
        location,
        forecastData,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404-page", {
    title: "Article not found",
    error: "Help article not found",
    name: "Muteshi",
  });
});

app.get("*", (req, res) => {
  res.render("404-page", {
    title: "404 not found",
    error: "Page not found!",
    name: "Muteshi",
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
