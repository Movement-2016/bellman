# bellman
gamechanger labs APIs

Umbrella project for server side APIs used by Gamechanger Labs properties (movementvote.org)

## Prerequisites

This project requires the [serverless](serverless.com) framework. Install:

````
npm i -g severless
````

Make sure your AWS credentials are pointing to the gamechangerlabs AWS account and your region is set to Oregon (us-west-2). 
This step is necessary to make the 'prod' stage APIs work properly.
````
export AWS_PROFILE=<name of profile with gamechangerlabs credentials>
export AWS_REGION=us-west-2
````


## Server APIs

There is no "build" step for the server APIs, just deploy. Each API builds a 'dev' and a 'prod' stage. 
````
npm run deploy-dev
npm run deploy-prod
````

## Client SDKs

### Build
The client sdks are built *after* the deployments
````
npm run build-clients
````
### Usage
To call the APIs install this package and call through the client SDKs
````
npm i https://github.com/Movement-2016/bellman --save
````
````javascript
import bellman from 'bellman';

const getPlansAPI = () => {
  
  // after the user is signed with an Identity Pool auth'd signin

  const {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    sessionToken
  } = AWS.config.credentials;

  const cfg = {
    accessKey,
    secretKey,
    sessionToken
  };

  return bellman.prod.plans(cfg);
}

const updateDonationPlan = plan => {
  const planAPI = getPlansAPI();
  
  planAPI.update(plan)
            .then( result => console.log('Updated OK:', result ) )
            .catch( err => console.log( 'Update failed:', err ) )
}
````
