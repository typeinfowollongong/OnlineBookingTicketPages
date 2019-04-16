var directives = angular.module('app.directives', []);
var factories = angular.module('app.factories', []);
var app = angular.module('app', ['ngRoute', 'app.directives', 'app.factories']);

app.config(['$routeProvider', function($routeProvider){
	
	$routeProvider.
	
		when('/stepOne', {
			templateUrl: 'view/StepOneEditor.htm'
		}).	
		
		when('/stepTwo', {
			templateUrl: 'view/StepTwoEditor.htm'
		}).	
	
	
		otherwise({
			redirectTo: '/stepOne'
		});
}]);

