
angular.module('App')
.directive('simpleTable', function(){
  return {
  	link: function(scope, element, attrs){
      scope.config.rowSet = scope.config.rowSet || [];
      scope.config.currPage = scope.config.currPage || 1;
      scope.config.rowPerPage = scope.config.rowPerPage || 50;
      scope.config.setCurrPage = function(page){
          scope.config.currPage = page;
      }
      scope.config.isCurrPage = function(page){
        if (scope.config.currPage == page)
          return true;
        return false;
      }
      scope.config.log = function(rowSet, rowPerPage){
        alert('rowSet:'+ rowSet + ' rowPerPage:' + rowPerPage);
      }
  	},
    restrict: 'E',
  	scope: {
  		config : '=config'
  	},
  	templateUrl: 'js/components/simpleTable/simpleTableTemplate.html'
  };
  
});

