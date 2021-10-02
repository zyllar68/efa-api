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

// //connect to db
// mongoose.connect(
//   process.env.MONGODB_URI,
//   { useNewUrlParser: true },
//   () => console.log('connted to DB!')
// );

//Database Connection
require('./startup/db')();

//RUN SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
