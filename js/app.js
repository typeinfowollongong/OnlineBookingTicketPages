var directives = angular.module('app.directives', []);
var factories = angular.module('app.factories', []);
var controllers = angular.module('app.controllers', []);
var app = angular.module('app', ['ngRoute', 'app.directives', 'app.factories', 'app.controllers']);

app.config(['$routeProvider', function($routeProvider){
	
	$routeProvider.
	
		when('/stepone', {
			templateUrl: 'view/stepone.htm',
			controller : 'bookingCtrl'
		}).	

		when('/steptwo', {
			templateUrl: 'view/steptwo.htm',
			controller : 'orderCtrl'
		}).			
	
		when('/stepthree', {
			templateUrl: 'view/stepthree.htm',
			controller : 'checkCtrl'
		}).			
		
		when('/stepfour', {
			templateUrl: 'view/stepfour.htm',
			controller : 'payCtrl'
		}).	
		
		when('/stepfive', {
			templateUrl: 'view/stepfive.htm',
			controller : 'confirmCtrl'
		}).		
		
		otherwise({
			redirectTo: '/stepone'
		});
}]);

