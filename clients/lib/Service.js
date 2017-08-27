import Client from './Client';

function assertIdDefined(id) {
  if( !id || (typeof(id) !== 'string')) {
    throw 'id must be a string in PlansDBClient';
  }
  return id;
}

const headers = {};
const queryParams = {};

class Service extends Client
{
  
  list( body = {}, additionalParams = {} ) {

    var request = {
      verb: 'GET',
      path: this.pathComponent + '/' + this.slug,
      headers,
      queryParams,
      body
    };
        
    return this.client.makeRequest(request, additionalParams)
              .then( this.responseHandler )
              .catch( this.errorHandler );
  }

  create( body, additionalParams = {} ) {

    var request = {
      verb: 'POST',
      path: this.pathComponent + '/' + this.slug,
      headers,
      queryParams,
      body
    };
    
    return this.client.makeRequest(request, additionalParams)
              .then( this.responseHandler )
              .catch( this.errorHandler );
  }

  options( body = {}, additionalParams = {}) {

    var request = {
      verb: 'OPTIONS',
      path: this.pathComponent + '/' + this.slug,
      headers,
      queryParams,
      body
    };
    
    return this.client.makeRequest(request, additionalParams)
              .then( this.responseHandler )
              .catch( this.errorHandler );
  }

  get( id, body, additionalParams = {} ) {

    var request = {
      verb: 'GET',
      path: this.pathComponent + '/' + this.slug + '/' + assertIdDefined(id),
      headers,
      queryParams,
      body
    };
    
    return this.client.makeRequest(request, additionalParams)
              .then( this.responseHandler )
              .catch( this.errorHandler );
  }
  
  
  update(id, body, additionalParams = {}) {

    var request = {
      verb: 'PUT',
      path: this.pathComponent + '/' + this.slug + '/' + assertIdDefined(id),
      headers,
      queryParams,
      body
    };
    
    return this.client.makeRequest(request, additionalParams)
              .then( this.responseHandler )
              .catch( this.errorHandler );
  }
  
  
  delete(id, body, additionalParams = {}) {

    var request = {
      verb: 'DELETE',
      path: this.pathComponent + '/' + this.slug + '/' + assertIdDefined(id),
      headers,
      queryParams,
      body
    };
    
    return this.client.makeRequest(request, additionalParams)
              .then( this.responseHandler )
              .catch( this.errorHandler );
  }
  
  
  optionsId( id, body, additionalParams = {}) {

    var request = {
      verb: 'OPTIONS',
      path: this.pathComponent + '/' + this.slug + '/' + assertIdDefined(id),
      headers,
      queryParams,
      body
    };
    
    return this.client.makeRequest(request, additionalParams)
              .then( this.responseHandler )
              .catch( this.errorHandler );
  }
  
}

module.exports = Service;