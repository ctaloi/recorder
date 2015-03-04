Template.home.helpers({
	callList: function () {
		return Calls.find({});
	},
	log: function () {
		console.log(this);
  	}
});

