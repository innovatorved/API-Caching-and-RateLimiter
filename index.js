const express = require("express");
const bcrypt = require('bcrypt');

const path = require('path');
const app = express();

app.use(express.json());

const port = process.env.PUBLIC_PORT || 3003;
const host = "http://localhost";

const redis = require('./redis-client');

app.get('/' , (req , res)=>{
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/html')
	res.sendFile(path.join(__dirname+'/index.html'))
});

app.get('/hash/:text' , async(req , res)=>{
    const plainText = req.params.text;
    var hashCodedText = 1;
    try {
        hashCodedText = await bcrypt.hash(plainText , 5);
    } catch (error) {
        hashCodedText = null;
    }

    res.statusCode = 200;
    return res.json({success : true , text : hashCodedText});
})

console.log(`visit : ${host}:${port}/`);
app.listen(port);
