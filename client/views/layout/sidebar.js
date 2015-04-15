// Template.sidebar.rendered = function () {
// 	$('.datepicker').pickadate({
// 		 onStart: function() {
//     console.log('Hello there :)')
//   },
//   onRender: function() {
//     console.log('Whoa.. rendered anew')
//   },
//   onOpen: function() {
//     console.log('Opened up')
//   },
//   onClose: function() {
//     console.log('Closed now')
//   },
//   onStop: function() {
//     console.log('See ya.')
//   },
//   onSet: function(context) {
//     console.log('Just set stuff:', context)
//     Materialize.toast("Activated filter for " + context.select, 2000)
//   },
//     selectMonths: true, // Creates a dropdown to control month
//     selectYears: 2 // Creates a dropdown of 15 years to control year
//   });
// };

Template.sidebar.events({
	'change .datepicker1': function (event) {

		var myDate1 = event.currentTarget.value.valueOf();
		var myDate2 = moment(myDate1).format('YYYY-MM-DD');

		startDate = moment(myDate1).add(1, 'days').format('YYYY-MM-DD')
		stoptDate = moment(myDate2).subtract(1, 'days').format('YYYY-MM-DD')

		Session.set(
			{
				date1: startDate,
				date2: stoptDate
			}
		)
	}
});