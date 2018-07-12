# bellman

gamechanger labs APIs

Umbrella project for server side APIs used by Gamechanger Labs properties (movement.vote)

## Stages

Each API deploys a 'dev' and a 'prod' stage.

The dev stage has it's own dynamo database and does _not_ require any IAM security which means they are public. Instead there is a single (fake) user id that used for all apis that require auth.

The prod stage require IAM credentials so the API, Lambda functions and Dynamodb tables must reside in the gamechangers labs AWS account

## Server APIs

### Prerequisites

This project requires the [serverless](http://serverless.com) framework. Install:

    npm i -g severless

Make sure your AWS credentials are pointing to the gamechangerlabs AWS account and your region is set to Oregon (us-west-2).
This step is necessary to make the 'prod' stage APIs work properly.

```bash
export AWS_PROFILE=my-gamechangerlabs-credentials-profile
export AWS_REGION=us-west-2
```

### Deploy

There is no "build" step for the server APIs, just deploy.

    npm run deploy-dev
    npm run deploy-prod

### Delete

You can un-deploy (delete) the APIs and all their associated resources (tables, IAM roles, etc.) by using the serverless command `remove`. There is no script for doing this, you can have to do that for each stage of each API

```bash
cd src/plans
serverless remove -s prod
serverless remove -s dev
cd ../src/users
serverless remove -s prod
serverless remove -s dev
#...etc
```

### Add an API

To add an API:

-   create a directory with API name under `src`
-   copy `.gitignore`, `serverless.yml`, `webpack.config.js` from one of the other apis
-   edit `serverless.yml` to spec
-   create source file(s) for the new API
-   if the new API is _not_ a CRUD service then create a directory under `clients` and put an `index.js` with the client interface
-   deploy your API: `serverless deploy -s prod` (or 'dev' for dev stage)

### Workflow

Work on a specific function can be done and then just deploy that. For example, if you're working on the function 'update' you can deploy just that function

    cd src/plans
    serverless deploy function -f update -s dev

Note that that command specificies the stage 'dev'.

To see `console.log` outputs:

    serverless logs -f update -s dev

## Client SDKs

### Build

The client sdks are built _after_ the deployments

    npm run build-clients

### Usage

To call the APIs install this package and call through the client SDKs

    npm i https://github.com/Movement-2016/bellman --save

```javascript
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
```

You can toggle the stage based on environment

```javascript
import bellman from 'bellman';

const stage = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

const getAPI = (name,credentials) => bellman[stage][name](credentials);
```
