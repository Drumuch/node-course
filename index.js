import app       from './app';
import models    from './models';

const sequelize = models.sequelize;
const port = process.env.PORT || 3000;

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        app.listen(port, () => {
            console.log(`App listening on port ${port}!`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
