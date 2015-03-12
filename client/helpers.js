Template.registerHelper('moment', function(dateToParse){
  return moment(parseInt(dateToParse)).format("LLL");
});

Template.registerHelper('userName', function() {
	if (Meteor.user())
		return Meteor.user().profile.name;
});

Template.registerHelper('cleanSipNumber', function(sipNumber){
	if (sipNumber.includes("sip:+")) {
		res = sipNumber.split('@')[0].split('+')[1];
		console.log("Changing: ", sipNumber, "To: ",  res);
	} else {
		res = sipNumber;
		console.log("No Change Here", res)
	}
	return res;
});
