Meteor.startup(function () {
	Session.setDefault({
		"playing": false,
		"selected": null,
		"date1": null,
		"date2": null
	});
});

