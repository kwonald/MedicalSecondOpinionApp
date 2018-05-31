Template.dailySchedule.onCreated(function(){
    Meteor.subscribe('myrequest');
    Meteor.subscribe('incomingrequest');

});

Template.dailySchedule.helpers({
	'sessions':function(){
		return Requests.find({status:'Paid',ended:false});
	},

	'isReady':function(){
		return (parseInt(this.start_sec) - parseInt(Chronos.now()/1000)+28800) < 1800;
	}
});

Template.dailySchedule.events({
	'click #session_start':function(event){
		event.preventDefault();
		if(this.sender._id == Meteor.userId()){
			Session.setPersistent('selected_user',this.doctor);
			Session.setPersistent('session_id',this._id);
   			Session.setPersistent('docs',[]);
		}
		else{
			Session.setPersistent('selected_user',this.sender);
			Session.setPersistent('session_id',this._id);
   			Session.setPersistent('docs',[]);
		}
		window.open('/session');
	},
    'click #demo_start':function(event){
        event.preventDefault();
        window.open('/demo');
    }
});


Tracker.autorun(function(){
		Meteor.call('update_session_status',(parseInt(Chronos.now()/1000)-28800));
});

