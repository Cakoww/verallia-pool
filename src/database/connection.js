const knex = require('knex');

const configuration = require('../../knexfile');


const connection = process.env.ENVIRONMENT ? knex(configuration[process.env.ENVIRONMENT]): configuration.development;
//const connection = knex("staging");
//console.log(connection);

module.exports = connection;