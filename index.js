const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/usergo', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

//creating middlewares
//to return images, html etx files.
app.use(express.static('public'));
//To take only json input from req.body
app.use(bodyParser.json());
//for routes
app.use('/api',require('./routes/api'));
//for handling error
app.use(function(err,req,res,next){
    res.status(422).send({error: err._message});
});

//listen for request
app.listen(process.env.port || 4000,function(){
    console.log("Listening to request");
}); 