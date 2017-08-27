import Client from '../lib/Client';

const headers = {};
const queryParams = {};

class EmailClient extends Client {


  contact() {
    return this._post(...arguments);
  }

  party() {
    return this._post(...arguments);
  }

  plan() {
    return this._post(...arguments);
  }

  _post( body, additionalParams = {} ) {

    var request = {
      verb: 'POST',
      path: this.pathComponent + '/' + this.slug,
      headers,
      queryParams,
      body
    };
    
    return this.client.makeRequest(request, additionalParams)
              .then( ({ MessageId }) => MessageId )
              .then( this.responseHandler )
              .catch( this.errorHandler );
  }


}

module.exports = EmailClient;