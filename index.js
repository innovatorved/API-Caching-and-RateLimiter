const express = require("express");
const bcrypt = require("bcrypt");

const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static('public'));

const port = process.env.PUBLIC_PORT || 3003;
const host = process.env.HOST || "http://localhost";

const redis = require("./redis-client");
require("dotenv").config();

app.get("/", (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/hash/:text", async (req, res) => {
    const plainText = req.params.text;
    try {
        const start = new Date();
        var end;
        const value = await redis.get(plainText);
        if(value){
            res.statusCode = 200;
            end = new Date();
            return res.json({
                success: true, 
                text: value ,
                source : "redis -cached",
                timeRefer : end-start
           });
        }

        const hashCodedText = await bcrypt.hash(plainText, 10);

        if(hashCodedText !== undefined){
            end = new Date();
            await redis.set(plainText, hashCodedText);
            res.statusCode = 200;
            return res.json({
                success: true, 
                text: hashCodedText ,
                source : "bcrypt -computed",
                timeRefer : end-start
           });
        }else{
            res.statusCode = 500;
            return res.json({
                success: false, 
                text: "Error",
                source : null
           });
        }

    } catch (error) {
        const msg = error.message;
        res.statusCode = 200;
        return res.json({ 
            success: false, 
            text: msg,
            source: null
        });
    }
});

console.log(`${host}:${port}/`);
app.listen(port);
