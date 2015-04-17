Meteor.startup(function () {
	Session.setDefault({
		"playing": false,
		"selected": null,
		"filterFlag": false
	});
});

