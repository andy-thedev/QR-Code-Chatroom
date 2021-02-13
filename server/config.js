require('dotenv').config();

module.exports = {
    DATABASE: process.env.DATABASE,
    JWT_SECRET: process.env.JWT_SECRET,
}
