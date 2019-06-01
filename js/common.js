/**
 * Convert date to string with format dd/mm/yyyy
 * @param val
 * @returns
 */
function dateToStr(_val){
	theDate = new Date(Date.parse(_val));
	mm = theDate.getMonth()+1;
	dd = theDate.getDate();
	yy = theDate.getFullYear();
	return dd+'/'+mm+'/'+yy;					
}

/**
 * Convert string to date with format dd/mm/yyyy
 * @param val
 * @returns
 */
function strToDate(_val){
	var dateItems = _val.split("/");
	var yy = parseInt(dateItems[2]);
	var mm = parseInt(dateItems[1]);
	var dd = parseInt(dateItems[0]);
	return new Date(yy,mm-1,dd);
}

/**
 * Compare two date
 * @param date1, date2
 * @returns -1, 0, 1
 */
function compareDate(_date1, _date2){
	var yy1 = _date1.getFullYear();
	var mm1 = _date1.getMonth();
	var dd1 = _date1.getDate();
	
	var yy2 = _date2.getFullYear();
	var mm2 = _date2.getMonth();
	var dd2 = _date2.getDate();
	
	if(yy1 != yy2){
		return yy1 - yy2 > 0 ? -1 : 1; 
	}else if(mm1 != mm2){
		return mm1 - mm2 > 0 ? -1 : 1;
	}else if(dd1 != dd2){
		return dd1 - dd2 > 0 ? -1 : 1;
	}else 
		return 0;
}

/**
* return an array of 12 name of month 
*/
function monthsArray(){
	return ['January','February','March','April','May','June','July','August','September','October','November','December'];
}

/**
 * return an array of 7 name of weeks
 */
function weeksArray(){
	return ['周日','周一','周二','周三','周四','周五','周六'];
}

/**
 * return true or false
 */
function isToday(_date){
	var thedate = new Date(_date);
	var today = new Date();
	var yy = thedate.getFullYear();
	var mm = thedate.getMonth();
	var dd = thedate.getDate();
	if(yy==today.getFullYear() && 
			mm==today.getMonth() && 
			dd==today.getDate()){
		return true;
	}
	return false;
}



