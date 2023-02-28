// import  mongoose  from 'mongoose';
// var User = require('../models/User');
// // const {MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, MONGO_DBNAME, PORT} = require("./config/index")
// // const dbURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
// // const dbURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:${MONGO_PORT}/${MONGO_DBNAME}`;
// const dbURL = "mongodb://localhost:27017/runbackDB";
// mongoose.connect(dbURL);

// // mongoose.connect(dbURL);
// const conSuccess = mongoose.connection
// conSuccess.once('open', _ => {
//   console.log('Database connected:', dbURL)
// })

// var users = [
//   new User({
//     name: "test1",
//     email: "test1@gmail.com",
//     password: "aaa",
//     created_on: new Date as any
//   }),
//   new User({
//     name: "test2",
//     email: "test2@gmail.com",
//     password: "aaa",
//     created_on: new Date as any
//   })
// ];

// var done = 0;
// for (var i = 0; i < users.length; i++) {
//   users[i].save(function (err: any, result: any) {
//     console.log("saved");
    
//     done++;
//     if (done === users.length) {
//        exit();
      
//     }
//   });

  

// }
// function exit() {
//   mongoose.disconnect();
// }

import mongoose from 'mongoose';
import User from '../models/user/User.schema';

const seedData = [{
      name: "test1",
      email: "test1@gmail.com",
      password: "aaa",
      created_on: new Date as any
    },
    {
      name: "test2",
      email: "test2@gmail.com",
      password: "aaa",
      created_on: new Date as any
    }
  ];

const seedDb = async (data: any[]) => {
  try {
    await User.create(data);
    console.log('Data seeded successfully');
    mongoose.disconnect();
  } catch (err) {
    console.log('Error while seeding data:', err);
  }
};

const seed = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/runbackDB');
    console.log('Connected to MongoDB');
    seedDb(seedData);
  } catch (err) {
    console.log('Error while connecting to MongoDB:', err);
  }
};
seed();