'use strict';

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

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Products', data);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Products');
    }
};