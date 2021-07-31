import IORedis from 'ioredis';

const connection = new IORedis({
    port: 6379,
    host: process.env.REDIS_URL || "localhost"
});

export default connection;
