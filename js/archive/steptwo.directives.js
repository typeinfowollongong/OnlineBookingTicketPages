directives.directive('stepTwoEditor',['StepTwoService', function(StepTwoService, $scope, $location){
	return {
		restrict:
			'AE',
		scope:			   
			{value : '='},
		templateUrl:
			'view/template/step-two-editor-template.htm',
		//require: 'stepOneEditor',
		link:
			function(scope, element, attrs){		
				//scope.value.selectedDate = stepOneEditorCtrl.getSelectedDate();
				scope.value = {};	
				scope.value.tickets = {};
				scope.value.programs = {};
				scope.value.ticketPrices = {};
			    scope.value.booking = [
			        {
		                'programId': "1", 
		                'programName': "Type 1", 
		                'ticketId': "1",
		                'ticketName': "Student",
		                'price': "20",
		                'card': "ID Card",
		                'cardNumber': "111111111111",
			        },
			        {
		                'programId': "2", 
		                'programName': "Type 2", 
		                'ticketId': "2",
		                'ticketName': "Adult",
		                'price': "30",
		                'card': "ID Card",
		                'cardNumber': "2222222222222",
			        }];							
				
			    StepTwoService.getPrograms().then(function(_result){
					scope.value.programs = _result.data;	
				});
				
			    StepTwoService.getTicketPrices().then(function(_result){
					scope.value.ticketPrices = _result.data;	
				});
				
				
				
				scope.addNew = function(personalDetail){
					scope.value.booking.push({ 
		                'programId': "", 
		                'programName': "", 
		                'ticketId': "",
		                'ticketName': "",
		                'price': "",
		                'card': "",
		                'cardNumber': "",
		            });
		        };
				
				
			}
	}
}]);
