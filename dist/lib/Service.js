'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Client2 = require('./Client');

var _Client3 = _interopRequireDefault(_Client2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function assertIdDefined(id) {
  if (!id || typeof id !== 'string') {
    throw 'id must be a string in PlansDBClient';
  }
  return id;
}

var headers = {};
var queryParams = {};

var Service = function (_Client) {
  _inherits(Service, _Client);

  function Service() {
    _classCallCheck(this, Service);

    return _possibleConstructorReturn(this, (Service.__proto__ || Object.getPrototypeOf(Service)).apply(this, arguments));
  }

  _createClass(Service, [{
    key: 'list',
    value: function list() {
      var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var additionalParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      var request = {
        verb: 'GET',
        path: this.pathComponent + '/' + this.slug,
        headers: headers,
        queryParams: queryParams,
        body: body
      };

      return this.client.makeRequest(request, additionalParams).then(this.responseHandler).catch(this.errorHandler);
    }
  }, {
    key: 'create',
    value: function create(body) {
      var additionalParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      var request = {
        verb: 'POST',
        path: this.pathComponent + '/' + this.slug,
        headers: headers,
        queryParams: queryParams,
        body: body
      };

      return this.client.makeRequest(request, additionalParams).then(this.responseHandler).catch(this.errorHandler);
    }
  }, {
    key: 'options',
    value: function options() {
      var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var additionalParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      var request = {
        verb: 'OPTIONS',
        path: this.pathComponent + '/' + this.slug,
        headers: headers,
        queryParams: queryParams,
        body: body
      };

      return this.client.makeRequest(request, additionalParams).then(this.responseHandler).catch(this.errorHandler);
    }
  }, {
    key: 'get',
    value: function get(id, body) {
      var additionalParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


      var request = {
        verb: 'GET',
        path: this.pathComponent + '/' + this.slug + '/' + assertIdDefined(id),
        headers: headers,
        queryParams: queryParams,
        body: body
      };

      return this.client.makeRequest(request, additionalParams).then(this.responseHandler).catch(this.errorHandler);
    }
  }, {
    key: 'update',
    value: function update(id, body) {
      var additionalParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


      var request = {
        verb: 'PUT',
        path: this.pathComponent + '/' + this.slug + '/' + assertIdDefined(id),
        headers: headers,
        queryParams: queryParams,
        body: body
      };

      return this.client.makeRequest(request, additionalParams).then(this.responseHandler).catch(this.errorHandler);
    }
  }, {
    key: 'delete',
    value: function _delete(id, body) {
      var additionalParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


      var request = {
        verb: 'DELETE',
        path: this.pathComponent + '/' + this.slug + '/' + assertIdDefined(id),
        headers: headers,
        queryParams: queryParams,
        body: body
      };

      return this.client.makeRequest(request, additionalParams).then(this.responseHandler).catch(this.errorHandler);
    }
  }, {
    key: 'optionsId',
    value: function optionsId(id, body) {
      var additionalParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


      var request = {
        verb: 'OPTIONS',
        path: this.pathComponent + '/' + this.slug + '/' + assertIdDefined(id),
        headers: headers,
        queryParams: queryParams,
        body: body
      };

      return this.client.makeRequest(request, additionalParams).then(this.responseHandler).catch(this.errorHandler);
    }
  }]);

  return Service;
}(_Client3.default);

module.exports = Service;