var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import CryptoJS from 'crypto-js';
import axios from 'axios';

const sigV4ClientFactory = config => {
  var AWS_SHA_256 = 'AWS4-HMAC-SHA256';
  var AWS4_REQUEST = 'aws4_request';
  var AWS4 = 'AWS4';
  var X_AMZ_DATE = 'x-amz-date';
  var X_AMZ_SECURITY_TOKEN = 'x-amz-security-token';
  var HOST = 'host';
  var AUTHORIZATION = 'Authorization';

  function assertDefined(object, name) {
    if (object === undefined) {
      throw name + ' must be defined';
    } else {
      return object;
    }
  }

  function hash(value) {
    return CryptoJS.SHA256(value);
  }

  function hexEncode(value) {
    return value.toString(CryptoJS.enc.Hex);
  }

  function hmac(secret, value) {
    return CryptoJS.HmacSHA256(value, secret, { asBytes: true });
  }

  function buildCanonicalRequest(method, path, queryParams, headers, payload) {
    return method + '\n' + buildCanonicalUri(path) + '\n' + buildCanonicalQueryString(queryParams) + '\n' + buildCanonicalHeaders(headers) + '\n' + buildCanonicalSignedHeaders(headers) + '\n' + hexEncode(hash(payload));
  }

  function hashCanonicalRequest(request) {
    return hexEncode(hash(request));
  }

  function buildCanonicalUri(uri) {
    return encodeURI(uri);
  }

  function buildCanonicalQueryString(queryParams) {
    if (Object.keys(queryParams).length < 1) {
      return '';
    }

    var sortedQueryParams = [];
    for (var property in queryParams) {
      if (queryParams.hasOwnProperty(property)) {
        sortedQueryParams.push(property);
      }
    }
    sortedQueryParams.sort();

    var canonicalQueryString = '';
    for (var i = 0; i < sortedQueryParams.length; i++) {
      canonicalQueryString += sortedQueryParams[i] + '=' + fixedEncodeURIComponent(queryParams[sortedQueryParams[i]]) + '&';
    }
    return canonicalQueryString.substr(0, canonicalQueryString.length - 1);
  }

  function fixedEncodeURIComponent(str) {
    const HEX_BASE = 16;
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(HEX_BASE);
    });
  }

  function buildCanonicalHeaders(headers) {
    var canonicalHeaders = '';
    var sortedKeys = [];
    for (var property in headers) {
      if (headers.hasOwnProperty(property)) {
        sortedKeys.push(property);
      }
    }
    sortedKeys.sort();

    for (var i = 0; i < sortedKeys.length; i++) {
      canonicalHeaders += sortedKeys[i].toLowerCase() + ':' + headers[sortedKeys[i]] + '\n';
    }
    return canonicalHeaders;
  }

  function buildCanonicalSignedHeaders(headers) {
    var sortedKeys = [];
    for (var property in headers) {
      if (headers.hasOwnProperty(property)) {
        sortedKeys.push(property.toLowerCase());
      }
    }
    sortedKeys.sort();

    return sortedKeys.join(';');
  }

  function buildStringToSign(datetime, credentialScope, hashedCanonicalRequest) {
    return AWS_SHA_256 + '\n' + datetime + '\n' + credentialScope + '\n' + hashedCanonicalRequest;
  }

  const LEN = 8;

  function buildCredentialScope(datetime, region, service) {
    return datetime.substr(0, LEN) + '/' + region + '/' + service + '/' + AWS4_REQUEST;
  }

  function calculateSigningKey(secretKey, datetime, region, service) {
    return hmac(hmac(hmac(hmac(AWS4 + secretKey, datetime.substr(0, LEN)), region), service), AWS4_REQUEST);
  }

  function calculateSignature(key, stringToSign) {
    return hexEncode(hmac(key, stringToSign));
  }

  function buildAuthorizationHeader(accessKey, credentialScope, headers, signature) {
    return AWS_SHA_256 + ' Credential=' + accessKey + '/' + credentialScope + ', SignedHeaders=' + buildCanonicalSignedHeaders(headers) + ', Signature=' + signature;
  }

  var awsSigV4Client = {};

  awsSigV4Client.accessKey = assertDefined(config.accessKey, 'accessKey');
  awsSigV4Client.secretKey = assertDefined(config.secretKey, 'secretKey');
  awsSigV4Client.sessionToken = config.sessionToken;
  awsSigV4Client.serviceName = assertDefined(config.serviceName, 'serviceName');
  awsSigV4Client.region = assertDefined(config.region, 'region');
  awsSigV4Client.endpoint = assertDefined(config.endpoint, 'endpoint');

  awsSigV4Client.makeRequest = function (request) {
    var verb = assertDefined(request.verb, 'verb');
    var path = assertDefined(request.path, 'path');
    var queryParams = request.queryParams ? _extends({}, request.queryParams) : {};
    var headers = request.headers ? _extends({}, request.headers) : {};
    headers['Content-Type'] && (headers['Content-Type'] = config.defaultContentType);
    headers['Accept'] && (headers['Accept'] = config.defaultAcceptType);

    // override request body and set to empty when signing GET requests
    var body = request.body && verb !== 'GET' ? JSON.stringify(request.body) : '';

    //If there is no body remove the content-type header so it is not included in SigV4 calculation
    if (body === '' || body === undefined || body === null) {
      delete headers['Content-Type'];
    }

    var datetime = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z').replace(/[:\-]|\.\d{3}/g, '');
    headers[X_AMZ_DATE] = datetime;
    let parser = null;
    if (typeof document === 'undefined') {
      var { Url } = require('url');
      parser = new Url(awsSigV4Client.endpoint);
    } else {
      parser = document.createElement('a');
      parser.href = awsSigV4Client.endpoint;
    }
    headers[HOST] = parser.hostname;

    var canonicalRequest = buildCanonicalRequest(verb, path, queryParams, headers, body);
    var hashedCanonicalRequest = hashCanonicalRequest(canonicalRequest);
    var credentialScope = buildCredentialScope(datetime, awsSigV4Client.region, awsSigV4Client.serviceName);
    var stringToSign = buildStringToSign(datetime, credentialScope, hashedCanonicalRequest);
    var signingKey = calculateSigningKey(awsSigV4Client.secretKey, datetime, awsSigV4Client.region, awsSigV4Client.serviceName);
    var signature = calculateSignature(signingKey, stringToSign);
    headers[AUTHORIZATION] = buildAuthorizationHeader(awsSigV4Client.accessKey, credentialScope, headers, signature);
    if (awsSigV4Client.sessionToken !== undefined && awsSigV4Client.sessionToken !== '') {
      headers[X_AMZ_SECURITY_TOKEN] = awsSigV4Client.sessionToken;
    }
    delete headers[HOST];

    var url = config.endpoint + path;
    var queryString = buildCanonicalQueryString(queryParams);
    if (queryString !== '') {
      url += '?' + queryString;
    }

    //Need to re-attach Content-Type if it is not specified at this point
    headers['Content-Type'] && (headers['Content-Type'] = config.defaultContentType);

    var signedRequest = {
      method: verb,
      url: url,
      headers: headers,
      data: body
    };
    return axios(signedRequest);
  };

  return awsSigV4Client;
};

const clientFactory = sigV4ClientConfig => {

  var sigV4Client = sigV4ClientFactory(sigV4ClientConfig);

  const client = {
    makeRequest: (request, additionalParams) => {

      if (request.body === undefined || request.body === '' || request.body === null || Object.keys(request.body).length === 0) {
        request.body = undefined;
      }

      // If the user specified any additional headers or query params that may not have been modeled
      // merge them into the appropriate request properties
      Object.assign(request.headers, additionalParams.headers);
      Object.assign(request.queryParams, additionalParams.queryParams);

      return sigV4Client.makeRequest(request);
    }
  };
  return client;
};

module.exports = clientFactory;