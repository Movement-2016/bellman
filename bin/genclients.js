/* eslint-disable no-console */
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var exec = require('child_process').exec;


/**************************************************************

  Generate an index.js that we can export as the client SDK
  for our Lambda APIs.

  The result is a single export with the shape:

    { 
      dev: {
        api1: config => <returns initialized API1 for dev stage>
        ....
      },
      prod: {
        api1: config => <returns initialized API1 for prod stage>
        ....
      }
    }

    Which means websites can:

      import bellman from 'bellman';

      var api1 = bellman.dev.api1( <IAM auth session stuff> );

      ap1.someMethod( someParam )
          .then( ok => ... )
          .catch( err => ... )


  WARNING: this way lies sausage making...

*/
var srcdir    = path.join( __dirname, '../src') + '/';
var clientdir = path.join( __dirname, '../clients' ) + '/';
var spec      = srcdir + '**/*.yml';
var allTasks  = [];


/*
  We have to extract the endpoint from calling 'serverless info'
*/
const endpoint = (apiName,stage) => new Promise( (resolve,reject) => {

  process.chdir( srcdir + apiName  );
  exec( 'serverless info -v -s ' + stage, function (err, stdout, stderr) {
    if( stderr ) {
      reject(stderr);
    } else {
       var m = stdout && stdout.toString().match( /ServiceEndpoint:\s([^\n]+)/ );
       resolve( {endpoint: m && m[1], stage, apiName } );
    }
  });
});

const stages = {
  prod: {},
  dev: {}
};

/*
  Manage require statements
*/
const requires = [];
let tokens = 'abcdefghijklmnopqrstuvwxy';
let token = 0;
const pushReq = name => (requires.push( `var ${tokens[token]} = require('./${name}');\n`), tokens[token++]);
const serviceClass = pushReq('lib/Service');

/*
  Generate the 'export' statement
*/
const genJS = ({endpoint,stage,apiName}) => {
  if( !endpoint ) {
    return;
  }
  const baseclass = fs.existsSync(clientdir + apiName) 
                      ? pushReq(apiName)
                      : serviceClass;

  stages[stage][apiName] = ` cfg => new ${baseclass}({...cfg,endpoint:'${endpoint}',slug:'${apiName}'})`;
};

/*
  Put it all together given a path
*/
const processFile = f => {
  var apiName = path.parse(f).dir.replace( srcdir, '' );
  allTasks.push( endpoint(apiName,'prod')
                    .then( genJS )
                    .then( () => endpoint(apiName,'dev') )
                    .then( genJS )
                  );  
};

/*
  Generate the Javascript
*/
const flatten = obj => {
  if( typeof obj === 'object' ) {
    return `{\n   ` + Object.keys(obj).map( k => `${k}: ` + flatten(obj[k]) ).join(`,\n` ) + '}';
  } else {
    return '' + obj;
  }
};

const template = (requires,stages) => `
/* auto generated */ 
${requires.join('\n')}
module.exports = ${flatten(stages)};
`;

const genReport = () => {
  fs.writeFileSync( clientdir + 'index.js', template(requires,stages) );
  console.log( clientdir + 'index.js written' );
};

/*

*/
glob( spec, (err,files) => {
  files.forEach( processFile );
  Promise.all( allTasks )
    .then( genReport )
    .catch( err => console.log( err ) );
});

