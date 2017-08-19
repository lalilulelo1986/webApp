//angular.module('App',[]);
angular.module('App', ['ngResource'])
// .factory('Notes', ['$resource', function($resource) {
// return $resource('/notes/:id', null,
//     {
//         'update': { method:'PUT' }
//     });
// }])
.controller('investTableCtrl', ['$scope', '$resource', function($scope, $resource){
	$scope.table1 = {};
    //$scope.table1.elements = ['q','w','e','r','t','y','u','i'];
    $scope.table1.currPage = 1;
    $scope.table1.rowPerPage = 3;

	//http://localhost:3012/artists
	var Artists = $resource('artists');
	Artists.query(function(result) {
		$scope.table1.rowSet = result;
	});

	$scope.checkbox1 = {};
	$scope.checkbox1.title = 'Таблица для инвест проектов';
	$scope.checkbox1.hideTitle = true;
	$scope.checkbox1.elements = [
								{name : "AKM", colapsed: false, nodes : [
																			{name : "project 1", checked : true},
																			{name : "project 3", checked : true}
																		]
								},
							  	{name : "ALM", colapsed: false, nodes : [
							  												{name : "project 2", checked : false}
							  											]
							  	}
							 ];
	//$scope.checkbox1.elements = [[1,2,3],[4,5,6]];
}])
.filter('pagin', function() {
  return function(input, currPage, rowPerPage) {
    return input.filter(function(item, i, arr) {return i >= (currPage - 1) * rowPerPage && i < (currPage) * rowPerPage;});
  }
})
.filter('paginPages', function() {
  return function(input,rowPerPage) {
    return input.filter(function(item, i, arr) {return i < Math.ceil(arr.length/rowPerPage);});
  }
});