const product = (sequelize, DataTypes) => {
    return sequelize.define('Products', {
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.STRING
        },
        reviews: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });
};

export default product;