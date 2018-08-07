import app       from './app';
import Cities    from './models/cities';
import Users     from './models/users';
import Products  from './models/product';
import mongoose  from 'mongoose';

const port = process.env.PORT || 8082;
const cities = {
    name: 'Brest',
    country: 'Belarus',
    capital: false,
    location: {
        lat: 52.097621,
        long: 23.734050
    }
};
const users = {
    name: 'Kolya',
    password: '222'
};
const data = [
    {
        name: 'milk',
        price: '10',
        reviews: 'Lorem ipsum'
    },
    {
        name: 'apple',
        price: '2',
        reviews: 'Lorem ipsum upset'
    },
    {
        name: 'pie',
        price: '5',
        reviews: 'Lorem'
    }
];

mongoose.connect('mongodb://a:p@127.0.0.1:32769/admin', {useNewUrlParser: true}).then(
    () => {
        app.listen(port, () => {
            console.log(`App listening on port ${port}!`);
            Cities.create(cities, function (err) {
                if (err) return console.log(err);
            });
            Users.create(users, function (err) {
                if (err) return console.log(err);
            });
            Products.create(data, function (err) {
                if (err) return console.log(err);
            });
        });
    },
    console.log
);
