var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var objection = require('objection');
var _ = require('lodash');
var knex = require('../db/config');
var MyQueryBuilder = require('./QueryBuilder');

objection.Model.knex(knex);

var Model = function (_objection$Model) {
  _inherits(Model, _objection$Model);

  function Model() {
    _classCallCheck(this, Model);

    return _possibleConstructorReturn(this, _objection$Model.apply(this, arguments));
  }

  Model.prototype.$beforeInsert = function $beforeInsert() {
    this.created_at = new Date().toISOString();
  };

  Model.prototype.$beforeValidate = function $beforeValidate(jsonSchema, json, opt) {
    return jsonSchema;
  };

  Model.prototype.$beforeUpdate = function $beforeUpdate() {
    this.updated_at = new Date();
  };

  Model.prototype.$formatDatabaseJson = function $formatDatabaseJson(json) {
    return _.mapKeys(json, function (v, k) {
      return _.snakeCase(k);
    });
  };

  Model.prototype.$parseDatabaseJson = function $parseDatabaseJson(json) {
    return _.mapKeys(json, function (v, k) {
      return _.camelCase(k);
    });
  };

  _createClass(Model, null, [{
    key: 'QueryBuilder',
    get: function get() {
      return MyQueryBuilder;
    }
  }]);

  return Model;
}(objection.Model);

module.exports = Model;
//# sourceMappingURL=Model.js.map