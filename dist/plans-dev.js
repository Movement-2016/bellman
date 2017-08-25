'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Service = require('./lib/Service');

var _Service2 = _interopRequireDefault(_Service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (c) {
  return new _Service2.default(_extends({}, c, { endpoint: 'https://nof8onrfef.execute-api.us-west-2.amazonaws.com/dev', slug: 'plans' }));
};