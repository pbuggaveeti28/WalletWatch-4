import * as dotenv from 'dotenv';
import {App} from './App';
import mongoose from 'mongoose';
import express, { Express } from 'express';

dotenv.config();
const port = process.env.PORT;
const app: Express = express();
const PORT = 3000;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD||'walletwatch4';
const dbInfo = process.env.DB_INFO||'';
const dbProtocol =process.env.DB_PROTOCOL||'';
const mongoDBConnection = dbProtocol + dbUser + ':' + encodeURIComponent(dbPassword) + process.env.DB_INFO;

let server: any = new App(mongoDBConnection).expressApp;
server.listen(port);
console.log("server running in port " + port);

mongoose
  .connect(mongoDBConnection)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('Error connecting to MongoDB:', error);
  });
