const Redis = require('ioredis')

const host = process.env.REDIS_HOST || 'localhost';
const port = process.env.REDIS_PORT || 6379;

const redis = new Redis({
    host : host,
    port : port
})

module.export = redis;