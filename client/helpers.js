Meteor.startup(function () {
  Session.set('userId', Meteor.userId());
});

Template.registerHelper('moment', function(dateToParse){
  return moment(parseInt(dateToParse)).format("LLL");
});

Template.registerHelper('userName', function() {
	if (Meteor.user())
		return Meteor.user().profile.name;
});