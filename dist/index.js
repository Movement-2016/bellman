'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* auto generated */
var a = require('./lib/Service');

var b = require('./deploy');

var c = require('./email');

var d = require('./email');

module.exports = {
   prod: {
      deploy: function deploy(c) {
         return new b(_extends({}, c, { endpoint: 'https://f86r0juvaa.execute-api.us-west-2.amazonaws.com/prod', slug: 'deploy' }));
      },
      email: function email(c) {
         return new c(_extends({}, c, { endpoint: 'https://9gvdc17imc.execute-api.us-west-2.amazonaws.com/prod', slug: 'email' }));
      },
      plans: function plans(c) {
         return new a(_extends({}, c, { endpoint: 'https://l7y8vcdf01.execute-api.us-west-2.amazonaws.com/prod', slug: 'plans' }));
      },
      users: function users(c) {
         return new a(_extends({}, c, { endpoint: 'https://xds1htuk84.execute-api.us-west-2.amazonaws.com/prod', slug: 'users' }));
      } },
   dev: {
      users: function users(c) {
         return new a(_extends({}, c, { endpoint: 'https://3wim9e9xf9.execute-api.us-west-2.amazonaws.com/dev', slug: 'users' }));
      },
      email: function email(c) {
         return new d(_extends({}, c, { endpoint: 'https://wmg82tv0ka.execute-api.us-west-2.amazonaws.com/dev', slug: 'email' }));
      },
      plans: function plans(c) {
         return new a(_extends({}, c, { endpoint: 'https://nof8onrfef.execute-api.us-west-2.amazonaws.com/dev', slug: 'plans' }));
      } } };