const {REDIS_URL} = require("../config/index")
const RedisClient = require('redis');
const redis = require ('redis');

// import { createClient } from 'redis';
// import createClient
// import {RedisClient, createClient } from 'redis'
type RedisClient = ReturnType<typeof redis.createClient>;

const client:RedisClient = redis.createClient(REDIS_URL);

// const redisClient:RedisClient  = createClient(REDIS_URL);
client.on("error", function (error: any) {
  console.error(error);
  
});

client.on("connect", () => {
  console.log(`\u{1F680} Redis Client connected...`);
});

export const setJWT = (key: string, value: string): Promise<'OK'> => {
  
  return new Promise((resolve, reject) => {
    try {
      return client.set(key, value, (err: Error | null, reply: string) => {
        if (err) { reject(err); } else {
          resolve(reply as 'OK');
        }
    
      });
    } catch (error) {
      reject(error);
    }

  });
};

export const getJWT = (key:string) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Key received...",key);
      
      client.get(key, (err: Error | null, res: string) => {
        if (err) {
          console.log(err);
          return reject(err);
        
        }
        console.log(res);
        return resolve(res);
        
        
      });
    } catch (error) {
      return reject(error);
    }
  });
};

export const deleteJWT = (key:string) => {
  try {
    client.del(key);
  } catch (error) {
    console.log(error);
  }
};