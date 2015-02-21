describe("Fetcher", function() {
  var testFetcher;
  var NYTbaseUri = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?';
  var queryParams = {
    'q': 'tesla motors',
    'api-key': '8e409c31f37b8c1fc030357315316b03:12:71392175'
  };
  var fullUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=tesla%20motors&api-key=8e409c31f37b8c1fc030357315316b03:12:71392175'

  beforeEach(function() {
    testFetcher = Fetcher(NYTbaseUri);
  });

  afterEach(function() {
    testFetcher = null;
    queryParams = {
      'q': 'tesla motors',
      'api-key': '8e409c31f37b8c1fc030357315316b03:12:71392175'
    };
  })


  describe('on initalization', function() {

    it('should initalize to an object', function() {
      expect(typeof testFetcher === 'object').toEqual(true);
    });

    it('should initalize as a different object (non-singleton)', function() {
      var tempFetcher = Fetcher(NYTbaseUri);
      expect( testFetcher === tempFetcher).toEqual(false);
    });

  });


  describe('on setters and getters', function() {

    it('should set base uri', function() {
      expect(testFetcher.getBaseUri()).toEqual(NYTbaseUri);
    });

    it('should set query parameters using init arg', function() {
      var tempFetcher = Fetcher(NYTbaseUri, queryParams);
      var outParams = tempFetcher.getQueryParams();
      for (var key in outParams) {
        expect(outParams[key]).toEqual(queryParams[key]);
      }
    });

    it('should set query parameters using method', function() {
      var tempFetcher = Fetcher(NYTbaseUri);
      tempFetcher.setQueryParams(queryParams);
      var outParams = tempFetcher.getQueryParams();
      for (var key in outParams) {
        expect(outParams[key]).toEqual(queryParams[key]);
      }
    });

    it('should overide/extend query parameters', function() {
      var altQuerParam = {
        'q': 'elon musk',
        'sort': 'newest' 
      }
      var tempFetcher = Fetcher(NYTbaseUri, queryParams);
      tempFetcher.setQueryParams(altQuerParam);
      var outParams = tempFetcher.getQueryParams();
      for (var key in altQuerParam) {
        expect(outParams[key]).toEqual(altQuerParam[key]);
      }
      expect(outParams['api-key']).toBe(queryParams['api-key'])

    });

    it('should return a complete url', function() {
      testFetcher.setQueryParams(queryParams);
      expect(testFetcher.getFullUrl()).toEqual(fullUrl);
    });

    it('should throw an exception when base uri is not supplied', function() {
      var tempFetcher = Fetcher('');
      expect(function() {
        tempFetcher.getResponse(function(data){})}
        ).toThrow('a base uri must be supplied');
    });


    it('should throw an exception when query param is not supplied', function() {
      var tempFetcher = Fetcher('hello');
      expect(function() {
        tempFetcher.getResponse(function(data){})}
        ).toThrow('query parameters must be supplied');
    });

  });


  describe('on retreiving data from api', function() {

    it('should throw an exception when no callback is supplied', function() {
      testFetcher.setQueryParams(queryParams);
      expect(function() {
        testFetcher.getResponse()}
        ).toThrow('a callback must be passed in as an argument');
    })

    it('should throw an exception when not a function is supplied', function() {
      testFetcher.setQueryParams(queryParams);
      expect(function() {
        testFetcher.getResponse([])}
        ).toThrow('the argument must be a function');
    })




    it('should get response from api call', function() {
      var response;
      testFetcher.setQueryParams(queryParams);
      testFetcher.getResponse(function(data) {
        response = data;
        expect(Object.keys(response).length > 0).toEqual(true);
      });
    });


  });





});