import express          from 'express';
import cookieParser     from 'cookie-parser';
import bodyParser       from 'body-parser';
import passport         from 'passport';
import routes           from './routes';
import cookieMiddleware from './middlewares/cookie.middleware';
import queryMiddleware  from './middlewares/query.middleware';
import users            from './models/users';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieMiddleware);
app.use(queryMiddleware);
app.use(passport.initialize());
app.use('/api', routes);


// passport.use(
//     new LocalStrategy({
//         usernameField: 'login',
//         passwordField: 'password',
//         session: false
//     }), (username, password, done) => {
//         const user = users.find((user) => user.name === username);
//
//         if (user === undefined || user.password !== password) {
//             done(null, false, 'Bad login or password.');
//         } else {
//             done(null, user);
//         }
//     }
// );

export default app;
