
var Fetcher = function(baseURI, queryParams) {
  var _baseURI = baseURI || '',
      _queryParams = queryParams || {};

  var _fillSpaces = function(string) {
    return string.trim().replace(' ', '%20');
  }

  var _constructQueryParams = function(_queryParams) {
    var queryParamsArr = [];
    for (var param in _queryParams) {
      queryParamsArr.push(param + '=' + _fillSpaces(_queryParams[param]));
    }
    return queryParamsArr.join('&');
  }

  var _constructFullUrl = function() {
    if (!_baseURI) {
      throw new Error('a base uri must be supplied');
    } else if ($.isEmptyObject(_queryParams)) {
      throw new Error('query parameters must be supplied'); 
    } else {
      return _baseURI + _constructQueryParams(_queryParams);      
    }
  }

  var getBaseUri = function() {
    return _baseURI;
  };

  var getQueryParams = function() {
    return _queryParams;
  }

  var setQueryParams = function(queryParams) {
    $.extend(_queryParams, queryParams);
  }

  var getFullUrl = function() {
    return _constructFullUrl();
  }

  var getResponse = function(callback) {
    if (!callback) {
      throw new Error('a callback must be passed in as an argument');
    } else if (typeof callback !== 'function') {
      throw new Error('the argument must be a function');
    } else {
      $.getJSON(getFullUrl(), function(data) {
        callback(data);
      });
    }
  };

  return {
    getBaseUri: getBaseUri,
    getQueryParams: getQueryParams,
    setQueryParams: setQueryParams,
    getFullUrl: getFullUrl,
    getResponse: getResponse

  }

};
