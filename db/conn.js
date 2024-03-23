const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "lancheVital",
    `${process.env.DB_USER}`,
    `${process.env.DB_SECRET}`,
    {
        host: "localhost",
        dialect: "mysql",
    }
);

try {
    sequelize.authenticate();
    console.log("mysql ok");
} catch (e) {
    console.log(e);
}

module.exports = sequelize;
