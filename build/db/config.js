// store configurations for each environment
var environment = process.env.NODE_ENV || 'development';
var config = require('../../../knexfile')[environment];

module.exports = require('knex')(config);
//# sourceMappingURL=config.js.map