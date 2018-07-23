import express          from 'express';
import cookieParser     from 'cookie-parser';
import bodyParser       from 'body-parser';
import passport         from 'passport';
import strategy         from 'passport-local';
import routes           from './routes';
import cookieMiddleware from './middlewares/cookie.middleware';
import queryMiddleware  from './middlewares/query.middleware';
import users            from './models/users';

passport.use(
    new strategy.Strategy({
            usernameField: 'login',
            passwordField: 'password',
            session: false
        }, (username, password, done) => {
            const user = users.find((user) => user.name === username);

            if (user === undefined || user.password !== password) {
                done(null, false, 'Bad login or password.');
            } else {
                done(null, user);
            }
        }
    ));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    users.find((user) => {
        if (user.id === id) cb(null, user);
        else return cb(err);
    });
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieMiddleware);
app.use(queryMiddleware);
app.use(passport.initialize());
app.use('/api', routes);

export default app;
