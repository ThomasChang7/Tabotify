function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QueryBuilder = require('objection').QueryBuilder;

var MyQueryBuilder = function (_QueryBuilder) {
  _inherits(MyQueryBuilder, _QueryBuilder);

  function MyQueryBuilder() {
    _classCallCheck(this, MyQueryBuilder);

    return _possibleConstructorReturn(this, _QueryBuilder.apply(this, arguments));
  }

  MyQueryBuilder.prototype.upsert = function upsert(data) {
    var mainQuery = void 0;
    return this.runBefore(function (result, builder) {
      if (!builder.context().isMainQuery) {
        // At this point the builder should only contain a bunch of `where*`
        // operations. Store the `where` query for later use in the `runAfter`
        // method. Also mark the query with `isMainQuery: true` so we can
        // skip all this when this function is called for the `mainQuery`.
        mainQuery = builder.clone().context({ isMainQuery: true });
        // Call the `update` method on the original query turning it into an
        // update operation.
        builder.update(data);
      }
      return result;
    }).runAfter(function (result, builder) {
      if (!builder.context().isMainQuery) {
        if (result === 0) {
          return mainQuery.insertAndFetch(data);
        } else {
          // Now we can use the `where` query we saved in the `runBefore`
          // method to fetch the inserted results. It is noteworthy that this
          // query will return the wrong results if the update changed any
          // of the columns the where operates with. This also returns all
          // updated models.
          return mainQuery.first();
        }
      }
      return result;
    });
  };

  return MyQueryBuilder;
}(QueryBuilder);

module.exports = MyQueryBuilder;
//# sourceMappingURL=QueryBuilder.js.map