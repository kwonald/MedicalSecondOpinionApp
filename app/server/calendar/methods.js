Meteor.methods({
	'add_time':function(time, profile){
		if(Doctors.findOne({doctor_id:this.userId}) == undefined){
			Doctors.insert({doctor_id:this.userId,time:[time],profile,events:[] });
		}
		else{
			Doctors.update({doctor_id:this.userId},{$push:{time:time}});
		}
	},

	'resize_time':function(id,end,end_sec){
		Doctors.update({doctor_id:this.userId, 'time.id':id},{$set:{"time.$.end":end, 'time.$.end_sec':end_sec}});
	},

	// added by alex. 
	//id is the time.id we are removeing this particular event of the mongoDB
	// this is called by timeRemove in fullCalendar.js 
	'delete_time':function(id){
		Doctors.update({}, {$pull:{time:{id:id} }}  );
	},
	// drop time refers to when you pick up an available block and place it somewhere else
	'drop_time':function(id,start,end,start_sec,end_sec){
		Doctors.update({doctor_id:this.userId, 'time.id':id},{$set:{"time.$.end":end,"time.$.start":start,"time.$.end_sec":end_sec,"time.$.start_sec":start_sec}});
	},

	'resize_event':function(id,end,end_sec,endtime){
		Doctors.update({doctor_id:this.userId,'events.id':id},{$set:{'events.$.end':end, 'events.$.end_sec':end_sec}});
		//Requests.update({_id:id},{$set:{end:moment(end).format('h:mm A'),end_sec:end_sec}});
	},

	'drop_event':function(id,start,end,end_sec){
		Doctors.update({doctor_id:this.userId, 'events.id':id},{$set:{'events.$.start':start,'events.$.end':end,'events.$.end_sec':end_sec}});
	},

	'send_request':function(sender,doctor,date,start,end){
		console.log(date + " " + end)
		console.log('from search.js')
		let endtime = parseInt(moment(date + " " + end, 'MMM D, YYYY h:mm a').unix());
		let startime = parseInt(moment(date + " " + start, 'MMM D, YYYY h:mm a').unix());
		Requests.insert({sender:sender, doctor:doctor.profile, date:date, start:start, end:end,status:"New", type:sender.roles[0], end_sec:endtime, start_sec:startime, ended:false});
	},


	// When doctor confirms an appointment this sets the client's status to 'Waiting for Payment'
	'confirm_request':function(id){
		console.log('coming from search.js')
		Requests.update({_id:id},{$set:{status:"Waiting for Payment"}});  // supposed to be Waiting for Payment
	},

	'pay_request':function(request){
		console.log('testing');
		let endtime = parseInt(moment(request.date+ " " + request.end, 'MMM D, YYYY h:mm a').unix());
		let start = moment(request.date+ " " + request.start, 'MMM D, YYYY h:mm a');
		let end = moment(request.date+ " " + request.end, 'MMM D, YYYY h:mm a');
		let event = {
					id:request._id,
					title:request.sender.firstname + " " + request.sender.lastname,
					start:start.format(),
					end:end.format(),
					className:"event-red",
					end_sec:endtime,
					isevent:true
				};
		console.log('PAYMENT GOING THROUGH');
		Requests.update({_id:request._id},{$set:{status:"Paid"}});
		Doctors.update({doctor_id:request.doctor._id, },{$push:{events:event}});
	},

	'cancel_request':function(id){
		Requests.remove({_id:id});
	},

	'decline_request':function(id){
		Requests.update({_id:id},{$set:{status:"Declined"}});
	},
	'update_session_status':function(seconds){
		Requests.update({status:'Paid',ended:false, end_sec:{$lt:seconds}},{$set:{ended:true}},{multi:true});
	},

	"updateRoles": function (targetUserId, roles) {
	    Roles.setUserRoles(targetUserId, roles);
  	},

  	'update_avatar':function(avatar){
  			Meteor.users.update({_id:this.userId},{
			$set:{
				avatar:avatar
			}
		});
  	},

  	'reschedule_request':function(id,date,start,end){
  		let endtime = parseInt(moment(date + " " + end, 'MMM D, YYYY h:mm a').unix());
		let startime = parseInt(moment(date + " " + start, 'MMM D, YYYY h:mm a').unix());
  		Requests.update({_id:id},{$set:{date:date,start:start,end:end,status:"New",end_sec:endtime, start_sec:startime}});
  	},

  	'remove_doctor':function(id){
  		Meteor.users.remove({_id:id});
  	},
  	'remove_patient':function(id){
  		Meteor.users.remove({_id:id});
  	}
});