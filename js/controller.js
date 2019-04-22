
controllers.controller('bookingController', ['StepOneService', function(StepOneService, $scope, $location){

	$scope.value = {};
	$scope.value.weeks = weeksArray();
	$scope.value.theDaysOfWeek = [];
	$scope.value.weeklyTickets = {};
	$scope.value.theDateOfFortnight = [];
	$scope.value.selectedDate = '';

	$scope.value.setWeeklyTickets();	

	$scope.value.setWeeklyTickets = function(){
		var firstDayOfWeek = new Date();
		var lastDayOfWeek = new Date();
		var thedate = new Date();
		var weekstart = thedate.getDate() - thedate.getDay();
		firstDayOfWeek.setDate(weekstart);
		for(i=0; i < 14; i++){
			var currentDate = new Date();
			currentDate.setDate(firstDayOfWeek.getDate() + i);
			// set tickets number 
			var day = {
				"dateOfWeek": dateToStr(currentDate),
				"tickets": "",
			}
			//scope.value.weeklyTickets.push(day);
			$scope.value.theDateOfFortnight.push(dateToStr(currentDate));
		}
		
		$scope.value.firstDayOfWeek = new Date(firstDayOfWeek);
		
		$scope.value.setDaysOfWeek(new Date(firstDayOfWeek));					
	}
	
	$scope.value.setDaysOfWeek = function(_firstDay){
		$scope.value.theDaysOfWeek = [];
		var newday = new Date(_firstDay);
		for(var i=0; i<7; i++){
			var day = newday.getDate();
			$scope.value.theDaysOfWeek.push(day);
			newday = new Date(newday.setDate(day + 1));
		}
	}
					
	$scope.value.isDayOfToday = function(_date){
		return isToday(_date);
	}
	
	// set selected table cell row and column 
	$scope.value.selectCell = function(_row, _col){
		$scope.value.selectedRow = _row;
		$scope.value.selectedColumn = _col;
		//alert(_row + ',' + _col);
		$scope.value.selectedDate = $scope.value.theDateOfFortnight[_row * 7 + _col];
	}
	
	// set selected table cell backtground color
	$scope.value.changeSelectedCellBgColor = function(_row, _col){
		if($scope.value.selectedRow==_row &&
				$scope.value.selectedColumn==_col){
			return "grey";
		}else{
			return "white";
		}
	}					
	
	
}]);

