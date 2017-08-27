class LambdaFunc {
  
  get cognitoId() {
    return this.isProd ? this._event.requestContext.identity.cognitoIdentityId : 'wazzitzface';
  }

  get stage() {
    return this._event.requestContext.stage;
  }
  
  get isProd() {
    return this.stage === 'prod';
  }

  get body() {
    const { body = {} } = this._event;
    return typeof body === 'string' ? JSON.parse(body) : body;
  }

  get queryParams() {
    return this._event.queryStringParameters || {};
  }

  get params() {
    return this._event.pathParameters || {};
  }

  get thenHandler() {
    return result => this.response(result);
  }

  get notFoundHandler() {
    return () => this.response('Resource not found', 404);
  }
  
  get errorHandler() {
    return err => this.response(err,500);
  }

  response(body,statusCode=200) {
    if( statusCode >= 400 ) {                 // eslint-disable-line no-magic-numbers
        console.error( '(promise)', body, this._event );   // eslint-disable-line no-console      
    }

    return this._callback( null, {
      statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify( body )
    });
  }

  get handler() {
    return (event,context,callback) => {
      this._event = event;
      this._context = context;
      this._callback = callback;
      try {
        this.perform();  
      } catch( err ) {
        console.error( '(handler)', err ); // eslint-disable-line no-console
        return this.errorHandler(err);
      }
      
    };
  }

  perform() {
    return this.response(404,{message: 'not found'});
  }
}

module.exports = LambdaFunc;

