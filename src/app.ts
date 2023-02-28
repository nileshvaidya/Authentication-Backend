
// import { PORT } from './config/index';
import express, { ErrorRequestHandler } from "express";
import createHttpError, { CreateHttpError } from "http-errors";
import morgon from 'morgan';
import exampleRoute from "./routes/exampleRoutes";
import userRoutes from "./routes/user.routes";
import indexRoute from './routes/index.route';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import mongoose, { connect, ConnectOptions } from "mongoose";
import { errorHandler } from './middleware/errorHandler';
import morgan from 'morgan';
import cors from 'cors';
import passport from "passport";
import kPassport from "./middleware/passport";
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
const {MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, MONGO_DBNAME, PORT} = require("./config/index")
// const dbURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
// const dbURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:${MONGO_PORT}/${MONGO_DBNAME}`;
const dbURL = "mongodb://localhost:27017/test";
console.log(dbURL);

const app = express();
//API security
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
kPassport(passport);
// app.use(cors({}));
// set up cors
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use('/', indexRoute);


app.use("/api", exampleRoute);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/user", userRoutes);
app.use(morgan("tiny"));
app.enable("trust proxy");

app.use((req, res, next) => {
  next(createHttpError.NotFound());
})

app.use((error: { status: number; }, req: any, res: { status: (arg0: any) => void; send: (arg0: any) => void; }, next: any) => {
  error.status = error.status || 500
  res.status(error.status);
  res.send(error)
})
app.use(() => {
  throw createHttpError(404, "Route Not Found");
});
const options = {
  //dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
  
};
mongoose.set('strictQuery', true);
const connectWithRetry = () => {

  mongoose
    
    .connect(dbURL, <ConnectOptions>{
      useNewUrlParser:true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to \u{1F4BE}...");
      
      app.listen(PORT, () => {
        console.log(`\u{1F680} Started on Port ${PORT}`);
      });
    
    })
    .catch((e) => {
      // throw createHttpError(501, "Unable to connect database");
      console.log(e.message);
      setTimeout(connectWithRetry, 5000)
    });

}

connectWithRetry();


app.use(errorHandler);