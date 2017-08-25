import LambdaFunc from '../lib/LambdaFunc';
import Table from '../lib/Table';

class LambdaDynamoRESTService extends LambdaFunc {

  get table() {
    if( !this._table ) {
      this._table = new Table(this.tableName);
    }
    return this._table;
  }

  get exports() {
    return {
      list:   this._lambdaHandler('list'),
      get:    this._lambdaHandler('get'),
      create: this._lambdaHandler('create'),
      remove: this._lambdaHandler('delete'),
      update: this._lambdaHandler('update')
    };
  }

  _lambdaHandler(method) {

    return (event,context,callback) => {

      console.log( [...arguments] );
      console.log( { event, context, callback } );

      this._event = event;
      this._context = context;
      this._callback = callback;
      try {
        this[method]();  
      } catch( err ) {
        console.error( '(handler)', err ); // eslint-disable-line no-console
        return this.errorHandler(err);
      }      
    };
  }

  delete() {
    return this.table.delete( this.Key )
      .then( this.thenHandler )
      .catch( this.errorHandler );
  }

  update() {
    return this.table.update( this.Key, this.body )
      .then( this.thenHandler )
      .catch( this.errorHandler );
  }

  list() {
    return this.table.list()
      .then( this.thenHandler )
      .catch( this.errorHandler );
  }

  get() {
    return this.table.get( this.Key )
      .then( this.thenHandler )
      .catch( this.errorHandler );
  }

  create() {
    return this.table.insert(this.createItem)
      .then( this.thenHandler )
      .catch( this.errorHandler );
  }

  // derivations implement:

  get createItem() {
    return this.body;
  }
  
  get tableName() { 
    return process.env.TABLE_NAME;
  }

  get Key() {
    return {
      key: 'no key found'
    };
  }

}

module.exports = LambdaDynamoRESTService;

