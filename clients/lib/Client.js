import SigV4Client from './sigv4client';

class Client
{
  constructor(config) {
    if( typeof(config) === 'undefined' || !config.sessionToken ) {
      //throw 'Service requires session based AWS AIM login credentials';
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
    const eobj = responseText && JSON.parse(responseText) || { error: err.message };
    throw new Error(eobj.error);
  }
  
}

module.exports = Client;