
function refresh(doc){
    $('#fullCalendar').fullCalendar( 'removeEvents');
    $('#fullCalendar').fullCalendar('addEventSource',doc?doc.time:Doctors.findOne({doctor_id:Meteor.userId()}).time);
    $('#fullCalendar').fullCalendar('addEventSource',doc?doc.events:Doctors.findOne({doctor_id:Meteor.userId()}).events);
}

Template.calendar.events({
	'click #calendar_refresh':function(event){
		event.preventDefault();
	    refresh();
	},

	'click #add_event_modal_show':function(event){
		event.preventDefault();
		$('#add_event').modal('show');
	},

    'click .add_event_confirm':function(event){
        event.preventDefault();
        let title = $('#add_event_title').val();
        let start = $('#add_event_start').val();
        let end = $('#add_event_end').val();
        let price = $('#add_event_price').val();
        let events = {title:title,start:start,end:end,className:'event-rose'};
        Meteor.call('add_event',events);
        console.log(title,start,end,price);
        console.log("!23");
    }
});



Template.calendar.onRendered(function(){
    $('.perfect-scrollbar-off').removeClass('nav-open');
    porton.initFullCalendar();
    porton.initFormExtendedDatetimepickers();
    Meteor.subscribe('doctortime');
    Tracker.autorun(function(){
        var doc=Doctors.findOne({doctor_id:Meteor.userId()});
        if(doc){
            refresh(doc);
        }
    });
})


