import Model from './Model';

class User extends Model {
  static get tableName() {
    return 'users';
  }
}
