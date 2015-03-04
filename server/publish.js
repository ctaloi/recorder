Meteor.publish("Calls", function () {
	return Calls.find({});
});