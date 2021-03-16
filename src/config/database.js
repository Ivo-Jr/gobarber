require('dotenv/config');

module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: process.env.DB_NAME,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
