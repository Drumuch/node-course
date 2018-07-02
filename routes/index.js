import express from 'express';

const routes = express.Router();

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

const users = [
    {
        id: 1,
        name: 'Oleh'
    },
    {
        id: 2,
        name: 'Kolya'
    }
];

routes.get('/products', (req, res) => {
    res.status(200).json(data);

});

routes.post('/products', (req, res) => {
    // some logic for creating product and pushing it into db
    const newProduct = req.body;
    res.status(200).json({ product: newProduct});
});

routes.get('/products/:id', (req, res) => {
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

routes.get('/products/:id/reviews', (req, res) => {
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

routes.get('/users', (req, res) => {
    res.status(200).json(users);
});

export default routes;