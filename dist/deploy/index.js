'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Client2 = require('../lib/Client');

var _Client3 = _interopRequireDefault(_Client2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var headers = {};
var queryParams = {};

var DeployClient = function (_Client) {
  _inherits(DeployClient, _Client);

  function DeployClient() {
    _classCallCheck(this, DeployClient);

    return _possibleConstructorReturn(this, (DeployClient.__proto__ || Object.getPrototypeOf(DeployClient)).apply(this, arguments));
  }

  _createClass(DeployClient, [{
    key: 'deploy',
    value: function deploy() {

      var request = {
        verb: 'GET',
        path: this.pathComponent + '/deploy',
        headers: headers,
        queryParams: queryParams,
        body: {}
      };

      return this.client.makeRequest(request, {}).then(this.responseHandler).catch(this.errorHandler);
    }
  }]);

  return DeployClient;
}(_Client3.default);

module.exports = DeployClient;