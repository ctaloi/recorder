// Only return calls where the userAccountId matches the current user
Meteor.publish("Calls", function () {
	return Calls.find({userAccountId: this.userId});
});