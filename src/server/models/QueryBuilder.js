import { QueryBuilder } from 'objection';

class MyQueryBuilder extends QueryBuilder {
  upsert(model) {
    if (model.id) {
      return this.update(model).where('id', model.id);
    } else {
      return this.insert(model);
    }
  }
}

export MyQueryBuilder;