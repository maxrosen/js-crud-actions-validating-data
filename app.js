var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const low = require("lowdb");
const lodashId = require("lodash-id");
const FileSync = require("lowdb/adapters/FileSync");

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('products', 'root', 'secure_password', {
  host: 'localhost',
  dialect: 'mysql'
});

const Products = sequelize.define('catalogs', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT
  },
  quantity: {
    type: DataTypes.INTEGER
  }, 
  color: {
    type: DataTypes.STRING
  }, 
  id: {
    type: DataTypes.STRING,
    allowNull: false, 
    primaryKey: true 
  }, 
  description: {
    type: DataTypes.TEXT
  }
});

async function connectAndSync() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
    console.log(await Products.findAll());
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectAndSync();

const adapter = new FileSync("db.json");
const db = low(adapter);
db._.mixin(lodashId);
db.defaults({ products: [] });

var apiRouter = require("./routes/api")(db);
var clientRouter = require("./routes/client");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(clientRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send();
});

module.exports = app;
