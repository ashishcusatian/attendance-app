const redis = require('redis');

const REDIS_PORT = 6379;

const client = redis.createClient(REDIS_PORT);


export const setRedisKeyWithExpiry = async (key, expiryInSecs, value) => {
    client.setex(key, expiryInSecs, value);
}

export const getRedisKey = async (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, data) => {
            if (err)
                throw err;
            resolve(data)
        });
    })
}