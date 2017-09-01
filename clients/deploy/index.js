import Client from '../lib/Client';

const headers = {};
const queryParams = {};

class DeployClient extends Client {

  deploy() {
    return this._get('deploy');
  }

  build() {
    return this._get('build');
  }

  _get(cmd) {

    var request = {
      verb: 'GET',
      path: this.pathComponent + '/' + cmd,
      headers,
      queryParams,
      body: {}
    };
    
    return this.client.makeRequest(request,{})
              .then( this.responseHandler )
              .catch( this.errorHandler );
  }


}

module.exports = DeployClient;