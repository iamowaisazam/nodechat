const express = require('express');
const app = express();
const http = require('http')
const router = express.Router();
const port = process.env.PORT || 4500;


//routes
var MainRoutes = require('./src/route');
app.use(express.urlencoded({extended:true}));
app.use('/', MainRoutes);
app.listen(port);