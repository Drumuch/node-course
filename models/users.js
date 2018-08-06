const user = (sequelize, DataTypes) => {
    return sequelize.define('Users', {
        name: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.INTEGER
        },
    });
};

export default user;