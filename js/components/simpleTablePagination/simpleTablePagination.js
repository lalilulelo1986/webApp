
angular.module('App')
.directive('simpleTablePagination', function($resource){
  return {
  	link: function(scope, element, attrs){
      scope.config.rowSet = scope.config.rowSet || [];
      scope.config.currPage = scope.config.currPage || 1;
      scope.config.rowPerPage = scope.config.rowPerPage || 50;
      scope.config.getPages = function(num) {
        console.log(num);
        return new Array(Math.ceil(+num/scope.config.rowPerPage));   
      }
      scope.config.resourceParam = scope.config.resourceParam || {};
      scope.config.resourceParam.limit = scope.config.rowPerPage;
      scope.config.resourceParam.offset = (scope.config.currPage - 1)*scope.config.rowPerPage;
      scope.config.resource = $resource(scope.config.resourceUrl, scope.config.resourceParam);
      scope.config.setCurrPage = function(page){
          scope.config.currPage = page;
          scope.config.resourceParam.offset = (scope.config.currPage - 1)*scope.config.rowPerPage;
          scope.config.resource = $resource(scope.config.resourceUrl, scope.config.resourceParam);
          scope.config.resource.query(function(result){
            scope.config.rowSet = result;
          });
      }
      scope.config.resource.query(function(result){
            scope.config.rowSet = result;
      });
      scope.config.isCurrPage = function(page){
        if (scope.config.currPage == page)
          return true;
        return false;
      }
  	},
    restrict: 'E',
  	scope: {
  		config : '=config'
  	},
  	templateUrl: 'js/components/simpleTablePagination/simpleTablePaginationTemplate.html'
  };
  
});

