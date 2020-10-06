const knex = require('knex');

const configuration = require('../../knexfile');

console.log(process.env.ENVIRONMENT);

const connection = knex(process.env.ENVIRONMENT || configuration.development);
//const connection = knex("staging");

module.exports = connection;