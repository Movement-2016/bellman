import Client from '../lib/Client';

const headers = {};
const queryParams = {};

class EmailClient extends Client {


  contact() {
    return this._post('contact',...arguments);
  }

  party() {
    return this._post('party',...arguments);
  }

  plan() {
    return this._post('plan',...arguments);
  }

  _post( cmd, body, additionalParams = {} ) {

    var request = {
      verb: 'POST',
      path: this.pathComponent + '/' + cmd,
      headers,
      queryParams,
      body
    };
    
    return this.client.makeRequest(request, additionalParams)
              .then( ({ data: { MessageId }}) => MessageId )
              .then( this.responseHandler )
              .catch( this.errorHandler );
  }


}

module.exports = EmailClient;