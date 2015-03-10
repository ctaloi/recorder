Meteor.methods({
  newCallRecord: function (callRecord) {
    Calls.insert(callRecord);
  },
  newCall: function (callRecord) {
  	console.log("New Call - Return XML");
  },
  getUserAccountId: function (sid) {
  	userAccount = Meteor.users.findOne({"profile.AccountSid": sid})
  	return userAccount;
  }
});
