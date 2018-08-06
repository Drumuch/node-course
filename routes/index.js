import express from 'express';
import jwt from 'jsonwebtoken';
import checkToken from '../middlewares/check-token';
import CONST from '../constants/constants';
import models from '../models';

const routes = express.Router();
const secret = CONST.secret;

routes.get('/products', checkToken, async (req, res) => {
    const products = await models.Products.findAll();
    res.status(200).json(products);
});

routes.post('/products', checkToken, (req, res) => {
    req.body.createdAt = new Date();
    req.body.updatedAt = new Date();
    models.Products.create(req.body);
    res.status(200).json({ product: req.body});
});

routes.get('/products/:id', checkToken, async (req, res) => {
    const product = await models.Products.findById(req.params.id);
    if (product) res.status(200).json(product);
    else res.status(403).json({error: 'Product with id ' + req.params.id + ' doesn\'t exist'});
});

routes.get('/products/:id/reviews', checkToken, async (req, res) => {
    const product = await models.Products.findById(req.params.id);
    if (product) res.status(200).json(product.reviews);
    else res.status(403).json({error: 'Product with id ' + req.params.id + ' doesn\'t exist'});
});

routes.get('/users', checkToken, (req, res) => {
    models.Users.findAll().then(users => {
        res.status(200).json(users);
    })
});

routes.post('/auth', async (req, res) => {
    const reqUser = req.body;
    const userLogin = reqUser.login;
    if (userExist(userLogin) && validPassword(reqUser)) {
        const response = getSuccessAuthResponse();
        response.token = getJWT(reqUser);
        response.data.user = {
            email: userLogin,
            username: reqUser.password
        };
        res.status(200).json(response);
    } else {
        const errorObject = getErrorAuthResponse();
        res.status(404).json(errorObject);
    }
});

async function userExist(userName) {
    const users = await models.Users.findAll();
    const match = users.find((user) => user.name === userName);
    return Boolean(match);
}

async function validPassword(userDetails) {
    const users = await models.Users.findAll();
    const user = users.find((user) => user.name === userDetails.login);
    return user ? user.password === userDetails.password : false;
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