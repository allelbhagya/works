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
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
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

app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id:userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
  });

  app.get('/profile', async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No token found' });
        }

        const info = await jwt.verify(token, secret);

        res.json(info);
    } catch (error) {
        console.error('Error during profile:', error);
        res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
});




app.post('/logout', (req,res)=>{
    res.cookie('token', '').json('ok');
})

app.post('/log', upload.none(), async(req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async(err, info)=>{
        if(err) throw err;

        const {createdAt, time, duration, region, sensorID, stoppage, profile, comment, measure } = req.body;
        const logCreatedAt = createdAt || new Date().toISOString();

        const logDoc = await Logs.create({
            createdAt: logCreatedAt,
            time,
            duration, 
            region, 
            sensorID, 
            stoppage, 
            profile, 
            comment, 
            measure,
            author:info.id,
        });

        res.json(logDoc);
    });
});


app.get('/log', async(req,res)=>{
    res.json(
        await Logs.find().populate('author', ['username'])
          .sort({createdAt: -1})
      );
})

app.delete('/log/:id', async (req, res) => {
    const logId = req.params.id;
    try {
        const deletedLog = await Logs.findByIdAndDelete(logId);

        if (deletedLog) {
            res.json({ message: 'Log deleted successfully', log: deletedLog });
        } else {
            res.status(404).json({ message: 'Log not found' });
        }
    } catch (error) {
        console.error('Error deleting log:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/log/:id', async (req, res) => {
    try {
      const log = await Logs.findById(req.params.id);
      res.json(log);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching log data' });
    }
  });


  app.put('/log/:id', async (req, res) => {
    const logId = req.params.id;
    const updatedLog = req.body;
  
    try {
      const updatedLogResult = await Logs.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedLogResult);
    } catch (error) {
      console.error('Error updating log:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(4000);
