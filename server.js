// //const express=require('express'),
// cors = require('cors'),
// bodyParser = require('body-parser'),
// mongoose = require('mongoose'),
// mymodel=require('./db/user');
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import mymodel from './db/user';
const app = express();
const router=express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/myDB');
//mongoose.Promise = global.Promise;
const db = mongoose.connection;
console.log(db);
db.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/user')
.get((req, res) => {
    mymodel.find((err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
})
.post((req,res) => {
    console.log(req.body);
    db.collection('users').save(req.body,function(err,res){
    console.log('success', res);
    })
})
.put((req,res) => {
    console.log(res.body);
    db.collection('users').updateOne({"_id":req.body._id},{$set:{"name":req.body.name,"password":req.body.password,"email":req.body.email,"phone":req.body.phone}},function(req,res){
        console.log('Update',res);
    })
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
