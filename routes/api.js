const express = require('express');
const router = express.Router();
const User = require('../models/user');

//get list of user from db
router.get('/user',function(req,res,next){
    User.aggregate().near(
        {
         near: {
             type: "Point", 
             coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
            },
            maxDistance: 100000, 
            spherical: true,
            distanceField: "dis"
        }
    ).then(function(users){
        res.send(users);
    });
});

//add new user to db
router.post('/user',function(req,res,next){
    //var user = new User(req.body);
    //user.save();
    User.create(req.body).then(function(user){
        res.send(user);            
    }).catch(next); 
});

//Update user in db
router.put('/user/:id',function(req,res,next){
    User.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
        User.findOne({_id: req.params.id}).then(function(user){
            res.send(user);
        });
    });
});

//delete user from db
router.delete('/user/:id',function(req,res,next){
    User.findByIdAndRemove({_id: req.params.id}).then(function(user){
        res.send(user);
    });
});

module.exports = router;