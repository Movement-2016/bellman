/* eslint-disable no-console */
const AWS        = require('aws-sdk');

var s3 = new AWS.S3({ region: 'us-west-2' });
    
let newBuildFiles;
let oldBuildFiles;

s3.listObjects({Bucket:'movementvote'}).promise().then( d => {

  const fileNames = d.Contents.map( c => c.Key );
  newBuildFiles = fileNames.filter( f => /^MovementVote/.test(f) );
  oldBuildFiles = fileNames.filter( f => !/^MovementVote/.test(f) );

  const dparams = {
    Bucket: 'movementvote',
    Delete: { 
      Objects: oldBuildFiles.map( Key => ({ Key }) )
    },
  };

  return oldBuildFiles.length ? s3.deleteObjects( dparams ).promise() : { msg: 'no files to delete'};

}).then( result => {

  console.log( result );

  return Promise.all( newBuildFiles.map( key => {
    const params = { Bucket: 'movementvote',
      CopySource: 'movementvote/' + key,
      Key: key.replace('MovementVote/dist/public/', ''),
      ACL: 'public-read',
      ServerSideEncryption: null };  
    return s3.copyObject( params ).promise();
  }));
}).then( results => console.log( results.map( ({CopyObjectResult}) => CopyObjectResult ) ) )

.catch( err => console.log( err ) );

