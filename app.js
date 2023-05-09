var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var createError = require("http-errors");
const express = require("express");

// 引入配置文件
const { APP_PORT } = require("./app/config");
//连接数据库
require("./app/database");
const router = require("./routes");

const app = express();

// 使用json解析和router的顺序不能换！
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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
  res.status(err.status || 500);
  res.render("error");
});

app.listen(APP_PORT, () => {
  console.log(`服务器启动成功 http://localhost:${APP_PORT}`);
});
