'use strict';

const data = [
    {
        name: 'milk',
        price: '10',
        reviews: 'Lorem ipsum',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'apple',
        price: '2',
        reviews: 'Lorem ipsum upset',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'pie',
        price: '5',
        reviews: 'Lorem',
        createdAt: new Date(),
        updatedAt: new Date()
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