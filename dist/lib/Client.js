'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sigv4client = require('./sigv4client');

var _sigv4client2 = _interopRequireDefault(_sigv4client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
  function Client(config) {
    _classCallCheck(this, Client);

    if (typeof config === 'undefined' || !config.sessionToken) {
      //throw 'Service requires session based AWS AIM login credentials';
    }

    var _config$region = config.region,
        region = _config$region === undefined ? 'us-west-2' : _config$region,
        _config$defaultConten = config.defaultContentType,
        defaultContentType = _config$defaultConten === undefined ? 'application/json' : _config$defaultConten,
        _config$defaultAccept = config.defaultAcceptType,
        defaultAcceptType = _config$defaultAccept === undefined ? 'application/json' : _config$defaultAccept,
        invokeUrl = config.endpoint,
        accessKey = config.accessKey,
        sessionToken = config.sessionToken,
        secretKey = config.secretKey,
        slug = config.slug;


    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    this.pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
      accessKey: accessKey,
      secretKey: secretKey,
      sessionToken: sessionToken,
      serviceName: 'execute-api',
      region: region,
      endpoint: endpoint,
      defaultContentType: defaultContentType,
      defaultAcceptType: defaultAcceptType
    };

    this.client = new _sigv4client2.default(sigV4ClientConfig);

    this.responseHandler = this.responseHandler.bind(this);
    this.errorHandler = this.errorHandler.bind(this);

    this.slug = slug;
  }

  _createClass(Client, [{
    key: 'responseHandler',
    value: function responseHandler(response) {
      return response.data;
    }
  }, {
    key: 'errorHandler',
    value: function errorHandler(err) {
      var responseText = err.request.responseText;

      var eobj = responseText && JSON.parse(responseText) || { error: err.message };
      throw new Error(eobj.error);
    }
  }]);

  return Client;
}();

module.exports = Client;