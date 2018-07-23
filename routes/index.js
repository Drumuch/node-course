import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import checkToken from '../middlewares/check-token';
import CONST from '../constants/constants';
import users from '../models/users';

const routes = express.Router();
const secret = CONST.secret;

const data = [
    {
        id: 1,
        name: 'milk',
        price: '10',
        reviews: 'Lorem ipsum'
    },
    {
        id: 2,
        name: 'apple',
        price: '2',
        reviews: 'Lorem ipsum upset'
    },
    {
        id: 3,
        name: 'pie',
        price: '5',
        reviews: 'Lorem'
    }
];

routes.get('/products', checkToken, (req, res) => {
    res.status(200).json(data);

});

routes.post('/products', checkToken, (req, res) => {
    // some logic for creating product and pushing it into db
    const newProduct = req.body;
    res.status(200).json({ product: newProduct});
});

routes.get('/products/:id', checkToken, (req, res) => {
    const product = data.filter((product) => product.id == req.params.id);
    if (product[0]) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(product[0]));
    } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Product with id ' + req.params.id + ' doesn\'t exist');
    }
    res.end();
});

routes.get('/products/:id/reviews', checkToken, (req, res) => {
    const product = data.filter((product) => product.id == req.params.id);
    if (product[0]) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(product[0].reviews));
    } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Product with id ' + req.params.id + ' doesn\'t exist');
    }
    res.end();
});

// routes.get('/users', checkToken, (req, res) => {
//     res.status(200).json(users);
// });

routes.get('/users', passport.authenticate('local', { session: false }), (req, res) => {
    res.status(200).json(users);
});

routes.post('/auth', (req, res) => {
    const body      = req.body;
    const userLogin = body.login;
    if (userExist(userLogin) && validPassword(body)) {
        const response = getSuccessAuthResponse();
        response.token = getJWT(body);
        response.data.user = {
            email: userLogin,
            username: body.password
        };
        res.status(200).json(response);
    } else {
        const errorObject = getErrorAuthResponse();
        res.status(404).json(errorObject);
    }
});

routes.post('/authenticate', passport.authenticate('local', { session: false }), (req, res) => {
    const body      = req.body;
    const userLogin = body.login;
    if (userExist(userLogin) && validPassword(body)) {
        const userDetails = users.map((user) => user.name === userLogin ? user : false).filter((i) => i)[0];
        res.json({
            id: userDetails.id,
            token: userDetails.token
        });
    } else {
        const errorObject = getErrorAuthResponse();
        res.status(404).json(errorObject);
    }
});

function userExist(userName) {
    const match = users.find((user) => user.name === userName);
    return Boolean(match);
}

function validPassword(userDetails) {
    const user = users.find((user) => user.name === userDetails.login);
    return user.password === userDetails.password;
}

function getSuccessAuthResponse() {
    return {
        code: 200,
        message: 'OK',
        data: {
            user: {}
        },
        token: ''
    };
}

function getJWT(user) {
    return jwt.sign(user, secret, { expiresIn: 36000 })
}

function getErrorAuthResponse() {
    return {
        code: 404,
        message: 'Not Found',
    };
}

export default routes;