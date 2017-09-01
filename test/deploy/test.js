/* eslint-disable no-console */
var client = require('./dist');

var R = {};
R.RoleSessionName = 'assuming-role-from-builder';
R.RoleArn = 'arn:aws:iam::181472263199:role/Deployer';
 
var AWS = require('aws-sdk');
var sts = new AWS.STS();


sts.assumeRole(R, function(err,response) {

  if( err ) {
    console.log( err );
    return;
  }

  const {
    AccessKeyId: accessKey,
    SecretAccessKey: secretKey,
    SessionToken: sessionToken
  } = response.Credentials;

  const cfg = {
    accessKey,
    secretKey,
    sessionToken
  };

  var api = client.prod.deploy(cfg);

  api.deploy().then( ok => console.log( 'OK', ok ) )
       .catch( err => console.log( 'ERR', err ));
});
