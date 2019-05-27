/**
 * Share service for setting and getting share data from root scope
 * used for sharing data between controllers
 * @param $rootScope
 * @returns
 */
factories.factory('ShareService', function($rootScope){
	var dataScope = {};
	
	return {
		set : function (key, value) {
			dataScope[key] = value;
		},
		
		get : function (key) {
			return dataScope[key];
		}
	}
});

/**
* API service
*/
factories.factory('BookingService', function($http){
	return {		
		getTickets: function(dateStr) {
			console.log("SERVICE: calling all tickets...");
			return $http({
				method	:	'POST',
				url 		: API_URL_ROOT + '/BookingTicketApi.php',
				data 		: {'action':'getTickets', 'data':{'date':dateStr}}, 
				headers : {'Content-Type': 'application/json'}
			})
			.success(function(data) {
				console.log(data);
				return data;
			})
			.error(function(){

			});				
			
		},
		
		getIdCards: function() {
			console.log("SERVICE: calling id cards...");
			/*
			var cardTypes = [];
			cardTypes.push({ 
				'id': '1', 
				'name': '身份证', 
			});		
			return cardTypes;
			*/
			return $http.get('json/idcards.json').success(function(data) {
				console.log(data);
				return data;
			})
			.error(function(){

			});	
		},
		
		getOnlineWindowId: function() {
			console.log("SERVICE: calling online window id...");
			return $http({
				method	:	'POST',
				url 		: API_URL_ROOT + '/BookingTicketApi.php',
				data 		: {'action':'getOnlineWindowId'}, 
				headers : {'Content-Type': 'application/json'}
			})
			.success(function(data) {
				console.log(data);
				return data;
			})
			.error(function(){

			});		
		},		
		
		sendPayment: function() {
			console.log("SERVICE: calling payment gate api to finish the payment ...");
			return $http.get('json/payment.json')
			.success(function(data) {
				console.log(data);
				return data;
			})
			.error(function(){

			});					
		},		
		
		submitBooking: function(orders){
			console.log("SERVICE: calling submitting booking ...");
			return $http({
				method	:	'POST',
				url 		: API_URL_ROOT + '/BookingTicketApi.php',
				data 		: {'action':'submit', 'data': orders}, 
				headers : {'Content-Type': 'application/json'}
			})
			.success(function(data) {
				console.log(data);
				return data;
			})
			.error(function(){

			});				
		},
	};
});
