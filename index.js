const fileUpload = require('express-fileupload');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

//SET
app.set('port', 8080);
app.set('mongoose-url', 'url')

//USE
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//PUBLIC OPEN 
app.use(`/public`, serveStatic(path.join(process.cwd(), `./public`)));

//mongoose
mongoose.connect(app.get('mongoose-url'), { useNewUrlParser: true, useUnifiedTopology: true }, function () {
    console.info('db connect')
})

//nunjucks
nunjucks.configure("html", {
    autoescape: true,
    express: app,
});

//get
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/html/index.html`)
});

//function
function hex() {
    var strs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < 10; i++) {
        result += strs.charAt(Math.floor(Math.random() * strs.length));
    }
    return result;
}


//listen
app.listen(app.get('port'), function () {
    console.info(`server on ${app.get('port')}!`);
});
