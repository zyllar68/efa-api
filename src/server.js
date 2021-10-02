const mongoose = require('mongoose');
require('dotenv/config');
const usersRoute = require('./routes/users.routes');
const parcelsRoute = require("./routes/parcels.route");
const express = require('express');  
const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use('/parcels', parcelsRoute);
app.use('/users', usersRoute);

//connect to db
mongoose.connect(
  process.env.LOCAL,
  { useNewUrlParser: true },
  () => console.log('connted to DB!')
);

//RUN SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
