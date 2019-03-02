var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//global error handling
const errorConfig = require("./configuration/errors");
//configure the engine
const appConfig = require("./configuration/appconfig");
//database conn.
var dev_db = require('./configuration/index');


var app = express();
appConfig.init(app, express);
//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, 'public')));

require('./routes/complaint/index')({app : app});
require('./routes/myleads/index')({app : app});
require('./routes/champ/index')({app : app});
require('./routes/rso/index')({app : app});
require("./routes/catalogue/index")({app : app});
require("./routes/demography/index.js")({app : app});
require("./routes/champ/index.js")({app : app});
require("./routes/scheme/index.js")({app : app});
require("./routes/order/index.js")({app : app});
require('./routes/demography/index.js')({app : app});
require('./routes/common/index.js')({app : app});

app.http = require('./lib/util/http');
app.util = require('./lib/util/parser');
//app.rule = require('./rule/loginrule');
app.invoke = require('./lib/http/invoke');


// // catch 404 and forward to error handler
 app.use(function(req, res, next) {
   next(createError(404));
 });

// require("./routes/compliant/index")({ app: app });
// require("./routes/myleads/index")({ app: app });


require("./routes/champ/index.js", {
  app: app
});
require("./routes/scheme/index.js", {
  app: app
});

errorConfig.init(app);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;
