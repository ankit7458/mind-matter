var fs = require('fs');
var path = require('path');
const express = require('express');
var multer = require('multer');
const bodyParser = require('body-parser');
const dataBaseConnect = require('./db');

require('dotenv').config();



const app = express();
dataBaseConnect();
app.set('view engine','ejs')
// app.use(express.static('public'))
app.use(express.static(path.resolve('./public')));
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())



app.use('/', require('./routes/auth'));


app.listen(3000 , ()=>{
    console.log("Server is running on port 3000")
})