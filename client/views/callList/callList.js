Template.callList.helpers({
	callList: function () {

		var dateRange = Session.get("dateRange");
		var activeFilter = Session.get("activeFilter");
		var startDate = dateRange.startDate.valueOf();
		var endDate = dateRange.endDate.valueOf();

		if (activeFilter === "date") {
			var query = Calls.find({createdAt: {$gt:startDate, $lte:endDate} }).fetch()
		} else {
			var query = Calls.find({}).fetch()
		};

		// query = Calls.find({}).fetch()
		calls = _.sortBy(query, "createdAt").reverse();

		return {
			"calls": calls,
			"date1": startDate,
			"date2": endDate

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
	'click a.note': function (event) {
		event.preventDefault();
		var note = ' ';
		Meteor.call('addNote', this._id, note);
		console.log("ID: " + this._id)
	},
	'submit .new-note': function (event) {
		event.preventDefault();
		var note = event.target.note.value;
		Materialize.toast(note, 2000);

		console.log("Note: " + note)
		console.log("ID: " + this._id)

		// Set note to input text
		Meteor.call('addNote', this._id, note);

		// Reset form
		event.target.note.value = "";
		return false;
		}


    // Clear form


    // Prevent default form submit


});
