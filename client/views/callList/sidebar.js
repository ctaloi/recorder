// return all of the items that occured on this date

var getDateRange = function (qDate) {

	var startDate = new Date(qDate);
	startDate.setSeconds(0);
	startDate.setHours(0);
	startDate.setMinutes(0);	

	var dateMidnight = new Date(startDate);
	dateMidnight.setHours(23);
	dateMidnight.setMinutes(59);
	dateMidnight.setSeconds(59);

	return {
		"startDate": startDate,
		"endDate": dateMidnight
	}
}


Template.sidebar.helpers({
	placeholder: function () {
		return moment(Session.get("date1")).subtract(1, 'days').format('MMM D, YYYY');
	}
});


Template.sidebar.onRendered(function  () {
	// var today = moment().add(1, 'days').format('YYYY-MM-DD');
	// var yesterday = moment(today).subtract(1, 'days').format('YYYY-MM-DD')

	// Session.set({
	// 	date1: today,
	// 	date2: yesterday
	// })

	this.$('.datepicker1').pickadate({
		format: 'mmmm d, yyyy',
		closeOnSelect: true,
		onClose: function(){
			$(document.activeElement).blur()
		}
	});
});

Template.sidebar.events({
	'change .datepicker1': function (event) {

		var myDate1 = event.currentTarget.value.valueOf();
		range = getDateRange(myDate1)

		Session.set({
			"dateRange": range
		})
	}
});