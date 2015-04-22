Meteor.subscribe("Calls", function onReady() {
	Session.set('callsLoaded', true);
})