# Deploy Static Website

A utility Lambda to build/deploy the MovementVote/concierge static website

As of this writing there is no automated/continuous trigger, you manually invoke the /build script to start the process

calling the /build script will start a build in AWS CodeBuild of the concierge project

When that is done, a AWS CloudWatch event will trigger the /deploy script which will move the files already on our s3 bucket to the write place with the righ permissions.

API Gateway -> Lambda -> CodeBuild -> CloudWatch -> Lamba -> S3