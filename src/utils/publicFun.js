export const GetParams = (name) => {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null) return unescape(r[2]); 
    return "";
}
export const getTimes = (date,type) => {
	let newDate = new Date(date);
	let years = newDate.getFullYear();
	let months = newDate.getMonth()+1;
	let days = newDate.getDate();
	let hours = newDate.getHours();
	let minutes = newDate.getMinutes();
	let seconds = newDate.getSeconds();
	if(months<10){
		months = '0' + months;
	}
	if(days<10){
		days = '0' + days;
	}
	if(hours<10){
		hours = '0' + hours;
	}
	if(minutes<10){
		minutes = '0' + minutes;
	}
	if(seconds<10){
		seconds = '0' + seconds;
	}
	if(type == 'day'){
		return years+'-'+months+'-'+days;
	}else if(type == 'minutes'){
		return years+'-'+months+'-'+days+' '+hours+':'+minutes+':'+seconds;
	}else if( type == 'days' ){
		return years+'/'+months+'/'+days;
	}
};
export const fixed = (num) => { 
    return num.toFixed(2);
}
