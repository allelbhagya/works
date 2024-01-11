const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Logs = require('./models/Logs')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer();
const cookieParser = require('cookie-parser');
const app = express();


const salt = bcrypt.genSaltSync(10);
const secret = "qddi10eu90ikj1wqmn";

app.use(cors({credentials:true, origin:'http://localhost:3000'}))
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb+srv://bsp:bsp@bsp.liemt4a.mongodb.net/?retryWrites=true&w=majority");

app.post('/register', async(req,res)=>{
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)})
        res.json(userDoc);
    }catch(e){
        res.status(400).json(e);
    } 
})

app.post('/login', async(req,res)=>{
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
        //logged in
        jwt.sign({username, id:userDoc._id }, secret, {}, (err, token)=>{
            if(err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            });
        });
        //res.json();
    }
    else{
        res.status(400).json('wrong credentials');
    }
})

app.get('/profile', (req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info)=>{
        if(err) throw err;
        res.json(info);
    })
})

app.post('/logout', (req,res)=>{
    res.cookie('token', '').json('ok');
})

app.post('/log', upload.none(), async(req, res) => {
    const {time, duration, region, sensorID, stoppage, profile, comment, measure } = req.body;
    const logDoc = await Logs.create({
        time,
        duration, 
        region, 
        sensorID, 
        stoppage, 
        profile, 
        comment, 
        measure
    })
    res.json(logDoc)
});

app.get('/log', async(req,res)=>{
    res.json(await Logs.find());
})

app.listen(4000);
