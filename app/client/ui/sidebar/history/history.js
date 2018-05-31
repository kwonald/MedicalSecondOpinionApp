Template.history.onCreated(function(){
	Meteor.subscribe('myrequest');
	Meteor.subscribe('incomingrequest');
});

Template.history.helpers({
	'receive_history':function(){	
		return Requests.find({status:{$in:["Paid"]}});
	},

	'isDeclined':function(){
		return this.status == "Declined";
	}
});