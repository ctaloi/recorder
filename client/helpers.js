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

Template.registerHelper('cleanSipNumber', function(sipNumber){
	if (sipNumber.includes("sip:+")) {
		return sipNumber.split('@')[0].split('+')[1]
	} else {
		return sipNumber
	}
});