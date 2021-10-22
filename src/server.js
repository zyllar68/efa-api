const mongoose = require('mongoose');
require('dotenv/config');
const usersRoute = require('./routes/users.routes');
const parcelsRoute = require("./routes/parcels.route");
const express = require('express');  
const app = express();

//Middleware
require('./startup/middleware')(app);


app.use('/parcels', parcelsRoute);
app.use('/users', usersRoute);

//Database Connection
require('./startup/db')();

//ERROR HANDLER
app.use(require('./_utils/error_handler'));

//RUN SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
