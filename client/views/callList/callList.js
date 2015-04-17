Template.callList.helpers({
	callList: function () {

		var dateRange = Session.get("dateRange");
		var dateFilter = Session.get("dateFilter");
		var filterFlag = Session.get("filterFlag");

		if (dateFilter) {
			// If date filter is true then
			var startDate = dateRange.startDate.valueOf();
			var endDate = dateRange.endDate.valueOf();
			var query = Calls.find({createdAt: {$gt:startDate, $lte:endDate} }, {sort:{createdAt: -1} } )
			if (filterFlag) {
				// if date filter and filter flag are true then
				var query = Calls.find({createdAt: {$gt:startDate, $lte:endDate}, "checked": true }, {sort:{createdAt: -1} } )
			}
			return {"calls": query}

		} else {
			// if date filter is false and filter flag is true
			if (filterFlag) {
				var query = Calls.find({"checked": true},{sort:{createdAt: -1} })
				return {"calls": query}
			} else {
				var query = Calls.find({},{sort:{createdAt: -1} })
				return {"calls": query}
			}
		}
	},

    selected: function () {
    	var selected = Session.get("selected");
    	var lineId = this._id;

    	var playing = "white grey-text mdi-av-play-arrow";
    	var stopped = "blue mdi-av-stop";

    	// If our line is selected we highlight the line and set the class
    	if (lineId == selected) {
    		return {
    			"statusIcon": stopped,
    			"playerState": "stop",
    			"myClass": "selected"
    			}
    	} else {
    		return {
    			"statusIcon": playing,
    			"playerState": "play",
    			"myClass": ""
    		}
		}
    }
});

var startPlay = function (resource, id) {
	analytics.track("Played Audio")
	myAudio = new Audio(resource);
	myAudio.addEventListener('ended', stopPlay);
	myAudio.addEventListener('play',
		Session.set({
			"playing": true,
			"selected": id,
		}))
	myAudio.play();
};

var stopPlay = function() {
	analytics.track("Stopped Audio")
	Session.set({
		"playing": false,
		"selected": null,
	});
};

Template.callList.events({
	'click a.play': function (event) {
		event.preventDefault();
		// If something is playing already - pause it
		if (Session.get("playing")) {
			myAudio.pause();
			stopPlay();
		}
		resource = event.currentTarget.href
		startPlay(resource, this._id);
	},

	'click a.stop': function (event) {
		event.preventDefault();
		myAudio.pause();
		stopPlay();
	},
	 "click a.flag": function () {
	 	Meteor.call("setChecked", this._id, ! this.checked);
	 }
});
