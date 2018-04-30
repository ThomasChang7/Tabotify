const QueryBuilder = require('objection').QueryBuilder;

class MyQueryBuilder extends QueryBuilder {
  upsert(data) {
    let mainQuery;
    return this.runBefore((result, builder) => {
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
    }).runAfter((result, builder) => {
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
  }
}

module.exports = MyQueryBuilder;
