import Client from '../lib/Client';

const headers = {};
const queryParams = {};

class DeployClient extends Client {

  deploy() {

    var request = {
      verb: 'GET',
      path: this.pathComponent + '/deploy',
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