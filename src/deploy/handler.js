const AWS = require('aws-sdk');
const LambdaFunc = require('../lib/LambdaFunc');
const path = require('path');

const BUCKET_NAME = 'movement.vote';
const BUILD_PROJECT_NAME = 'MovementVote';
const BUILD_PROJECT_REGEX = /^MovementVote/;
const BUILD_BRANCH = '';
const REGION = 'us-west-2';

class StartBuild extends LambdaFunc {
  perform() {
    var codebuild = new AWS.CodeBuild({ region: REGION });

    var params = {
      projectName: BUILD_PROJECT_NAME /* required */,
      sourceVersion: BUILD_BRANCH,
    };

    codebuild
      .startBuild(params)
      .promise()
      .then(this.thenHandler)
      .catch(this.errorHandler);
  }
}

class Deploy extends LambdaFunc {
  perform() {
    var s3 = new AWS.S3({ region: REGION });

    let newBuildFiles;
    let oldBuildFiles;

    s3.listObjects({ Bucket: BUCKET_NAME })
      .promise()
      .then(d => {
        const fileNames = d.Contents.map(c => c.Key);
        newBuildFiles = fileNames.filter(f => BUILD_PROJECT_REGEX.test(f));
        oldBuildFiles = fileNames.filter(f => !BUILD_PROJECT_REGEX.test(f));

        const dparams = {
          Bucket: BUCKET_NAME,
          Delete: {
            Objects: oldBuildFiles.map(Key => ({ Key })),
          },
        };

        return oldBuildFiles.length
          ? s3.deleteObjects(dparams).promise()
          : { msg: 'no files to delete' };
      })
      .then(() => {
        const params = newBuildFiles.map(_calcParams);

        return Promise.all(params.map(copyPromise(s3))).then(results =>
          results.map(({ CopyObjectResult }) => CopyObjectResult)
        );
      })
      .then(this.thenHandler)
      .catch(this.errorHandler);
  }
}

const copyPromise = s3 => p => s3.copyObject(p).promise();

const map = {
  '.svg': 'image/svg+xml',
  '.html': 'text/html',
  '.htm': 'text/html',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.css': 'text/css',
  '.js': 'text/javascript',
};

const _calcParams = key => {
  const args = {
    CopySource: BUCKET_NAME + '/' + key,
    Key: key.replace(BUILD_PROJECT_NAME + '/dist/public/', ''),
    Bucket: BUCKET_NAME,
    ACL: 'public-read',
    ServerSideEncryption: null,
  };

  const ext = path.parse(key).ext;

  if (map[ext]) {
    args.ContentType = map[ext];
    args.Metadata = {};
    args.MetadataDirective = 'REPLACE';
  }

  return args;
};

module.exports = {
  build: new StartBuild().handler,
  deploy: new Deploy().handler,
};
