import SigV4Client from './sigv4client';

function assertIdDefined(id) {
  if( !id || (typeof(id) !== 'string')) {
    throw 'id must be a string in PlansDBClient';
  }
  return id;
}

const headers = {};
const queryParams = {};

class Service
{
  constructor(config) {
    if( typeof(config) === 'undefined' || !config.sessionToken ) {
      throw 'Service requires session based AWS AIM login credentials';
    }

    const { 
      region = 'us-west-2',
      defaultContentType = 'application/json',
      defaultAcceptType = 'application/json',
      endpoint:invokeUrl,
      accessKey,
      sessionToken,
      secretKey,
      slug
    } = config;

    const endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    this.pathComponent = invokeUrl.substring(endpoint.length);


    var sigV4ClientConfig = {
      accessKey,
      secretKey,
      sessionToken,
      serviceName: 'execute-api',
      region,
      endpoint,
      defaultContentType,
      defaultAcceptType,
    };

    this.client = new SigV4Client(sigV4ClientConfig);        

    this.responseHandler = this.responseHandler.bind(this);
    this.errorHandler    = this.errorHandler.bind(this);

    this.slug = slug;
  }
  
  responseHandler(response) {
    return response.data;
  }

  errorHandler(err) {
    const {responseText} = err.request;
    const eobj = JSON.parse(responseText);
    throw new Error(eobj.error);
  }

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