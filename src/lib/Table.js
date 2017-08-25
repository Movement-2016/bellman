import AWS from 'aws-sdk';

class Table {
  constructor( name ) {
    AWS.config.update({region:'us-west-2'});
    this._name = name;
    this._db = new AWS.DynamoDB.DocumentClient();
  }

  update = (Key,fields) => {

      const expr   = ['updatedAt = :updatedAt'];
      const expres = 'SET ' + Object.keys( fields ).reduce( (arr,key) => ( arr.push( `${key} = :${key}`), arr), expr ).join(',');
      const values =          Object.keys( fields ).reduce( (obj,key) => ( obj[':'+key] = fields[key],    obj), {} );

      const params = {
        TableName: this._name,

        Key,
        UpdateExpression: expres,
        ExpressionAttributeValues: { ...values, ':updatedAt': new Date().getTime() },
        ReturnValues: 'ALL_NEW',
      };

      return this._db.update( params ).promise().then( ({Attributes}) => Attributes );
  }

  find = keySpec => {
      let key;
      for(key in keySpec);
      const p = { TableName: this._name,
                  KeyConditionExpression: `${key} = :${key}`,
                  ExpressionAttributeValues: { [`:${key}`]: keySpec[key] }
                };
 
    return this._db.query(p).promise().then( ({Items}) => Items );
  }

  get = Key => this._db.get({ TableName: this._name, Key }).promise().then( ({Item}) => Item )

  list = (params = {}) => this._db.scan({ TableName: this._name, ...params}).promise().then( ({Items}) => Items )

  delete = Key => this._db.delete( { TableName: this._name, 
                                    ReturnValues: 'ALL_OLD',
                                    Key } ).promise().then( ({Attributes}) => Attributes )

  insert = params => this._db.put({ TableName: this._name, Item: { createdAt: new Date().getTime(), ...params}} ).promise().then( () => params )
}

module.exports = Table;