# Deploy Static Website

A utility Lambda to remote build and deploy the MovementVote/concierge static website.

You manually invoke the 'build' Lambda script to start the process.

    Local script ->  
      API Gateway  ('/build') -> 
      Lambda       ('deploy-prod-build') -> 
      CodeBuild    ('MovementVote') -> 
      CloudWatch   ('TriggerDeployAfterBuild') -> 
      Lamba        ('deploy-prod-deploy') ->
      S3           ('movementvote')

Several things need to be in place in order to trigger the remote build and deploy Lambda build scripts from a command line like `npm run deploy`

## Remote Build Project 
There is a CodeBuild project called [MovementVote](https://us-west-2.console.aws.amazon.com/codebuild/home?region=us-west-2#/projects/MovementVote/view)
```json
{
    "projectsNotFound": [], 
    "projects": [
        {
            "name": "MovementVote", 
            "serviceRole": "arn:aws:iam::181472263199:role/service-role/code-build-MovementVote-service-role", 
            "tags": [], 
            "artifacts": {
                "packaging": "NONE", 
                "name": "MovementVote", 
                "namespaceType": "NONE", 
                "location": "movementvote", 
                "path": "/", 
                "type": "S3"
            }, 
            "lastModified": 1504239117.157, 
            "timeoutInMinutes": 60, 
            "created": 1504227315.347, 
            "environment": {
                "computeType": "BUILD_GENERAL1_SMALL", 
                "image": "aws/codebuild/nodejs:6.3.1", 
                "type": "LINUX_CONTAINER", 
                "environmentVariables": []
            }, 
            "source": {
                "buildspec": "", 
                "type": "GITHUB", 
                "location": "https://github.com/Movement-2016/concierge.git", 
                "auth": {
                    "type": "OAUTH"
                }
            }, 
            "encryptionKey": "arn:aws:kms:us-west-2:181472263199:alias/aws/s3", 
            "arn": "arn:aws:codebuild:us-west-2:181472263199:project/MovementVote"
        }
    ]
}
```
The build rules are in the [buildspec.yml](https://github.com/Movement-2016/concierge/blob/master/buildspec.yml) in the `concierge` project.

## Role (for Triggering Build)

There needs to be am IAM role that can be used to during the invocation. The policy needs permission to invoke an API Gateway.  AWS has a policy for that: `arn:aws:iam::aws:policy/AmazonAPIGatewayInvokeFullAccess` 

There must also be a 'Trust Relationship' on that policy that allows assuming the role of the account.

It has to look like this:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::181472263199:root"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```
Replace the number with the appropriate account number that hosts the Lambda scripts.

The name of this role in the GC account is [Deployer](https://console.aws.amazon.com/iam/home?region=us-west-2#/roles/Deployer)

## Automatic Deploy Trigger 

The build happens asynchronosly. It finishes long after our 'build' Lambda script is done running. There needs to be a CloudWatch trigger that watches for the end of the build and then triggers our 'deploy' Lambda script.

In the GC account the trigger is called [TriggerDeployAfterBuild](https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#rules:name=TriggerDeployAfterBuild) and looks like this:
```json
{
  "source": [
    "aws.codebuild"
  ],
  "detail-type": [
    "CodeBuild Build Phase Change"
  ],
  "detail": {
    "completed-phase": [
      "FINALIZING"
    ]
  }
}
```
In the 'resource' field is the name of the 'deploy' Lambda script.

## AWS Configure

Use the AWS command line tools to create a profile that gives you developer access to the GC Labs AWS account.
```
aws configure [--profile profile-name]
```
If this is not your default profile, make sure the profile is exported into your environment
```bash
export AWS_PROFILE=profile-name
```

## Local Script
Finally, the last step is the create a local script that will assume the proper role and invoke the 'build' Lambda.

```javascript
/* bin/deploy.js */
var client = require('bellman');

var AWS = require('aws-sdk');
var sts = new AWS.STS();

var R = {};
R.RoleSessionName = 'assuming-role-from-builder';
R.RoleArn = 'arn:aws:iam::181472263199:role/Deployer';
 
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

  api.build()
       .then( ok => console.log( 'OK', ok ) )
       .catch( err => console.log( 'ERR', err ));
});
```
Invoke the script in your local terminal
```bash
node bin/deploy
```

