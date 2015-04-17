Meteor.startup(function () {
	Session.setDefault({
		"playing": false,
		"selected": null,
		"activeFilter": false		
	});
});

