
/**
* Checkin service
*/
factories.factory('BookingService', function($http){
	return {
		
		getWeeklyAvailableTickets: function() {
			console.log("SERVICE: calling all tickets...");
			return $http.get('json/availabletickets.json');
		},	
		
		getPrograms: function() {
			console.log("SERVICE: calling all programes...");
			return $http.get('json/programes.json');
		},	
		
		getTicketPrices: function() {
			console.log("SERVICE: calling all ticket prices...");
			return $http.get('json/ticketPrices.json');
		},		
		
		
		getFutureFloorPlan: function() {
			console.log("SERVICE: calling all rooms...");
			return $http.get('json/futurefloorplan.json');
		},	
		
		getFloorPlan: function() {
			console.log("SERVICE: calling all rooms...");
			return $http.get('json/floorplan.json');
		},			
		
		getAllRooms: function() {
			console.log("SERVICE: calling rooms...");
			return $http.get('json/rooms.json');
		},	
	};
});
