// Only return calls where the userAccountId matches the current user
Meteor.publish("Calls", function () {
	if (!this.userId) {
		return [];
    }
	currentUser = this.userId;
	currentUserSid = Meteor.users.findOne({_id: currentUser})["profile"]["AccountSid"]
	return Calls.find({"AccountSid": currentUserSid})
});