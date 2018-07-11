var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* auto generated */
var a = require('./lib/Service');

var b = require('./deploy');

var c = require('./email');

var d = require('./deploy');

var e = require('./email');

module.exports = {
   prod: {
      deploy: cfg => new b(_extends({}, cfg, { endpoint: 'https://f86r0juvaa.execute-api.us-west-2.amazonaws.com/prod', slug: 'deploy' })),
      plans: cfg => new a(_extends({}, cfg, { endpoint: 'https://l7y8vcdf01.execute-api.us-west-2.amazonaws.com/prod', slug: 'plans' })),
      users: cfg => new a(_extends({}, cfg, { endpoint: 'https://xds1htuk84.execute-api.us-west-2.amazonaws.com/prod', slug: 'users' })),
      email: cfg => new c(_extends({}, cfg, { endpoint: 'https://9gvdc17imc.execute-api.us-west-2.amazonaws.com/prod', slug: 'email' })) },
   dev: {
      deploy: cfg => new d(_extends({}, cfg, { endpoint: 'https://qf7gz2uqq2.execute-api.us-west-2.amazonaws.com/dev', slug: 'deploy' })),
      plans: cfg => new a(_extends({}, cfg, { endpoint: 'https://nof8onrfef.execute-api.us-west-2.amazonaws.com/dev', slug: 'plans' })),
      users: cfg => new a(_extends({}, cfg, { endpoint: 'https://3wim9e9xf9.execute-api.us-west-2.amazonaws.com/dev', slug: 'users' })),
      email: cfg => new e(_extends({}, cfg, { endpoint: 'https://wmg82tv0ka.execute-api.us-west-2.amazonaws.com/dev', slug: 'email' })) } };