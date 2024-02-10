
var express = require('express'); /* Import express */
var app = express(); /* The variable app is instancing the function express() */

var routes = require('./routes/mainRoutes.cjs') /* In this line is possible to get the routes in MainRoutes.cjs */
app.use(routes);

app.listen(3000);

/* This file start the server using express in the port 3000, ans use the
routes about the file mainRoutes.cjs */