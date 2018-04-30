const objection = require('objection');
const _ = require('lodash');
const knex = require('../db/config');
const MyQueryBuilder = require('./QueryBuilder');

objection.Model.knex(knex);

class Model extends objection.Model {
  static get QueryBuilder() {
    return MyQueryBuilder;
  }
  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeValidate(jsonSchema, json, opt) {
    return jsonSchema;
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }

  $formatDatabaseJson(json) {
    return _.mapKeys(json, (v, k) => _.snakeCase(k));
  }

  $parseDatabaseJson(json) {
    return _.mapKeys(json, (v, k) => _.camelCase(k));
  }
}
module.exports = Model;
