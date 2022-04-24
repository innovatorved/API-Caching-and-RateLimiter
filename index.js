const express = require("express");
const bcrypt = require('bcrypt');

const path = require('path');
const app = express();

const port = process.env.PUBLIC_PORT || 3003;
const host = "http://localhost";

app.get('/' , (req , res)=>{
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/html')
	res.sendFile(path.join(__dirname+'/index.html'))
});

app.get('/hash/:text/:saltRounds' , (req , res)=>{
    const plainText = req.params.text;
    var hashCodedText = 1;
    try {
        const saltRounds = parseInt(req.params.saltRounds);
        hashCodedText = bcrypt.hashSync(plainText, saltRounds);
    } catch (error) {
        const saltRounds = 1;
        hashCodedText = bcrypt.hashSync(plainText, saltRounds);
    }

    res.statusCode = 200;
    return res.json({success : true , text : hashCodedText});
})

console.log(`visit : ${host}:${port}/`);
app.listen(port);
