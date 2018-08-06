import Sequelize from 'sequelize';

const sequelize = new Sequelize('practicedocker', 'us', 'pass', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

const models = {
    Users: sequelize.import('./users'),
    Products: sequelize.import('./product')
};

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;