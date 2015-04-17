// return all of the items that occured on this date

var getDateRange = function(qDate) {

    var startDate = new Date(qDate);
    startDate.setSeconds(0);
    startDate.setHours(0);
    startDate.setMinutes(0);

    var dateMidnight = new Date(startDate);
    dateMidnight.setHours(23);
    dateMidnight.setMinutes(59);
    dateMidnight.setSeconds(59);

    return {
        "startDate": startDate,
        "endDate": dateMidnight
    }
}


Template.sidebar.onRendered(function() {
    this.$('.datepicker1').pickadate({
        format: 'mmmm d, yyyy',
        closeOnSelect: true,
        closeOnClear: false,
        onClose: function() {
            $(document.activeElement).blur()
        }
    });
});

Template.sidebar.events({
    'change .datepicker1': function(event) {
        var myDate1 = event.currentTarget.value.valueOf();

        // If empty tells us the user selected clear (no date)
        if (_.isEmpty(myDate1)) {
        	Session.set({"dateFilter": false})
        } else {
        	range = getDateRange(myDate1)
        	Session.set({
        		"dateRange": range,
        		"dateFilter": true
        	})
        	}
    },
    'click .toggle-flag': function(event) {
        if (Session.get("filterFlag")) {
            Session.set({
                "filterFlag": false
            })
        } else {
            Session.set({
                "filterFlag": true
            })
        };
    },
    'mouseover .picker__clear': function(event) {
    	Session.set("dateFilter", false);
    }
});

Template.sidebar.helpers({
    filterFlag: function() {
        return Session.get("filterFlag");
    }
});
