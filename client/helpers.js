Template.registerHelper('moment', function(dateToParse){
  return moment(parseInt(dateToParse)).format("LLL");
});

Template.registerHelper('userName', function() {
	if (Meteor.user())
		return Meteor.user().profile.name;
});

Template.registerHelper('cleanSipNumber', function(sipNumber){
	if (sipNumber.length > 20) {
		phone = sipNumber.split('@')[0].split('+')[1];
		res = "(" + phone.substr(1, 3) + ") " + phone.substr(4, 3) + '-' + phone.substr(7,4);
		// console.log("Changing: ", sipNumber, "To: ",  res);
	} else {
		res = sipNumber;
		// console.log("No Change Here", res)
	}
	return res;
});


Template.registerHelper('fromSeconds', function(sec){
	var d=new Date(0,0,0);
	d.setSeconds(+sec);
	return (d.getHours() ? d.getHours()+':' : '')+d.getMinutes()+':'+d.getSeconds();
	});