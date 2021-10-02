var cors = require('cors');
const express = require('express'); 

module.exports = function (app) {
  app.use(express.urlencoded({extended: true})); 
  app.use(express.json());
  app.use(
    cors({
      origin: true,
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
    })
  );
};
