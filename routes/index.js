import express from 'express';
import jwt from 'jsonwebtoken';
import checkToken from '../middlewares/check-token';
import CONST from '../constants/constants';
import Cities    from '../models/cities';
import Users     from '../models/users';
import Products  from '../models/product';

const models = {
    Products: Products,
    Cities: Cities,
    Users: Users
};

const routes = express.Router();
const secret = CONST.secret;

routes.get('/cities', checkToken, (req, res) => {
    models.Cities.find({}, (err, cities) => {
        res.status(200).json(cities);
    });
});

routes.post('/cities', checkToken, (req, res) => {
    models.Cities.create(req.body, (err) => {
        if (err) console.log(err);
        res.status(200).json({ product: req.body});
    });
});

routes.put('/cities/:id', checkToken, (req, res) => {
    models.Cities.updateOne({ _id: req.params.id }, req.body, (err) => {
        if (err) console.log(err);
        res.status(200).json({ city: req.body});
    });
});

routes.delete('/cities/:id', checkToken, (req, res) => {
    models.Cities.deleteOne({ _id: req.params.id }, function (err, city) {
        if (err) return console.log(err);
        res.status(200).json(city);
    });
});

routes.get('/products', checkToken, (req, res) => {
    models.Products.find({}, (err, products) => {
        res.status(200).json(products);
    });
});

routes.post('/products', checkToken, (req, res) => {
    models.Products.create(req.body, (err) => console.log(err));
    res.status(200).json({ product: req.body});
});

routes.get('/products/:id', checkToken, (req, res) => {
    models.Products.find({_id: req.params.id}, (err, product) => {
        if (product) res.status(200).json(product);
        else res.status(403).json({error: 'Product with id ' + req.params.id + ' doesn\'t exist'});
    });
});

routes.delete('/products/:id', checkToken, (req, res) => {
    models.Products.deleteOne({ _id: req.params.id }, function (err, product) {
        if (err) return console.log(err);
        res.status(200).json(product);
    });
});

routes.get('/products/:id/reviews', checkToken, (req, res) => {
    models.Products.find({_id: req.params.id}, (err, product) => {
        if (product) res.status(200).json(product.reviews);
        else res.status(403).json({error: 'Product with id ' + req.params.id + ' doesn\'t exist'});
    });
});

routes.get('/users', checkToken, (req, res) => {
    models.Users.find({}, (err, users) => {
        res.status(200).json(users);
    });
});

routes.delete('/users', checkToken, (req, res) => {
    models.Users.deleteOne({ _id: req.params.id }, function (err, user) {
        if (err) return console.log(err);
        res.status(200).json(user);
    });
});

routes.post('/auth', async (req, res) => {
    const reqUser = req.body;
    const userLogin = reqUser.login;
    models.Users.find({}, (err, users) => {
        if (userExist(userLogin, users) && validPassword(reqUser, users)) {
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

});

function userExist(userName, users) {
    const match = users.find((user) => user.name === userName);
    return Boolean(match);
}

function validPassword(userDetails, users) {
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