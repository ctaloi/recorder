Meteor.methods({
  newCallRecord: function (callRecord) {
    Calls.insert(callRecord);
  },
  routeIncomingCall: function (callRecord) {
  	console.log("New Call - Return XML");
  },
  getUserAccountId: function (sid) {
  	userAccount = Meteor.users.findOne({"profile.AccountSid": sid})
    if(typeof userAccount === 'undefined'){
      console.log("-----WARN-------")
      console.log("AccountSID from Twilio does not match a user account")
      return "UNKNOWN";
    }
    else {
  	return userAccount._id;
    }
  },
  getCallFlow: function(callFlowId, sipTo) {
    console.log(this);
  }
});
