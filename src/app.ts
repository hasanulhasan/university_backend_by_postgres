import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';
import routes from './app/routes';

const app: Application = express();
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/v1/', routes);

app.use()

app.use((req: Request, res: Response, next: NextFunction)=> {
  res.send(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not found'
      }
    ]
  })
  next();
})

export default app;