'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* auto generated */
var a = require('./lib/Service');

var b = require('./deploy');

var c = require('./email');

var d = require('./email');

var e = require('./deploy');

module.exports = {
   prod: {
      plans: function plans(cfg) {
         return new a(_extends({}, cfg, { endpoint: 'https://l7y8vcdf01.execute-api.us-west-2.amazonaws.com/prod', slug: 'plans' }));
      },
      users: function users(cfg) {
         return new a(_extends({}, cfg, { endpoint: 'https://xds1htuk84.execute-api.us-west-2.amazonaws.com/prod', slug: 'users' }));
      },
      deploy: function deploy(cfg) {
         return new b(_extends({}, cfg, { endpoint: 'https://f86r0juvaa.execute-api.us-west-2.amazonaws.com/prod', slug: 'deploy' }));
      },
      email: function email(cfg) {
         return new c(_extends({}, cfg, { endpoint: 'https://9gvdc17imc.execute-api.us-west-2.amazonaws.com/prod', slug: 'email' }));
      } },
   dev: {
      plans: function plans(cfg) {
         return new a(_extends({}, cfg, { endpoint: 'https://nof8onrfef.execute-api.us-west-2.amazonaws.com/dev', slug: 'plans' }));
      },
      email: function email(cfg) {
         return new d(_extends({}, cfg, { endpoint: 'https://wmg82tv0ka.execute-api.us-west-2.amazonaws.com/dev', slug: 'email' }));
      },
      users: function users(cfg) {
         return new a(_extends({}, cfg, { endpoint: 'https://3wim9e9xf9.execute-api.us-west-2.amazonaws.com/dev', slug: 'users' }));
      },
      deploy: function deploy(cfg) {
         return new e(_extends({}, cfg, { endpoint: 'https://qf7gz2uqq2.execute-api.us-west-2.amazonaws.com/dev', slug: 'deploy' }));
      } } };