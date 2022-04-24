const Redis = require("ioredis");
require('dotenv').config();

const host = process.env.REDIS_HOST || "localhost";
const port = process.env.REDIS_PORT || 6379;
const pass = process.env.REDIS_PASSWORD || "";


const redis = new Redis({
    host: host,
    port: port,
    password: pass,
});

module.exports = redis;
