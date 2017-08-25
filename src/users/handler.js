import Service from '../lib/RESTService';

class UserTableFunc extends Service {

  get Key() {
    const { email = null } = this.params;
    return { email };
  }

}

module.exports = (new UserTableFunc()).exports;

