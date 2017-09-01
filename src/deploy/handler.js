const AWS        = require('aws-sdk');
const LambdaFunc = require('../lib/LambdaFunc');


class StartBuild extends LambdaFunc {
  perform() {
    var codebuild = new AWS.CodeBuild({region: 'us-west-2'});

    var params = {
      projectName: 'MovementVote', /* required */
      sourceVersion: 'normalize'
    };
    
    codebuild.startBuild(params).promise()
      .then( this.thenHandler )
      .catch( this.errorHandler );
  }
}

class Deploy extends LambdaFunc {
  perform() {
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

    }).then( () => {

      const params = newBuildFiles.map( key => ({ Bucket: 'movementvote',
                                                  CopySource: 'movementvote/' + key,
                                                  Key: key.replace('MovementVote/dist/public/', ''),
                                                  ACL: 'public-read',
                                                  ServerSideEncryption: null }) );

      return Promise.all( params.map( p => s3.copyObject( p ).promise() ) ).then( results => results.map( ({CopyObjectResult}) => CopyObjectResult ) );
    })
    .then( this.thenHandler )
    .catch( this.errorHandler );

  }
}

module.exports = {
  build: (new StartBuild()).handler,
  deploy: (new Deploy()).handler
};