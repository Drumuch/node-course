import express          from 'express';
import cookieParser     from 'cookie-parser';
import routes           from './routes';
import cookieMiddleware from './middlewares/cookie.middleware';
import queryMiddleware  from './middlewares/query.middleware';

const app = express();

app.use(cookieParser());
app.use(cookieMiddleware);
app.use(queryMiddleware);
app.use('/api', routes);


export default app;
