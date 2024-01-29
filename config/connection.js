// import sequelize and dotenv for configuration
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;


// if the Jawsdb url exists, jawsdb will be used to host this database
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        prcess.env.DB_NAME,
        prcess.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize;