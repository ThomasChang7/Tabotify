import objection from 'objection';
import _ from 'lodash';
import knex from '../db/config';
import MyQueryBuilder from './QueryBuilder'

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

export Model;
