let globalTime;
let globalEvent;

Template.search.events({
	'click #check_availability_modal':function(event){
		event.preventDefault();
		$('#staticCalendar').fullCalendar( 'removeEvents');
		$('#check_availability').modal('show');
		Session.set('selected_doctor',this);
		$('#staticCalendar').fullCalendar({
			header: {
				left: 'month,agendaWeek',
				center: 'title',
				right: 'prev,next,today'
			},
			defaultView:'agendaWeek',
			defaultDate: new Date()
		});
		$('#staticCalendar').fullCalendar('addEventSource',
			this.time);
		
		$('#staticCalendar').fullCalendar('addEventSource',
			this.events);
		
		// These are set so that we can use these times to restrict request times in request_confirm
		globalTime = this.time;
		globalEvent = this.events;

	},

	'change #booking_search_country':function(event){
		event.preventDefault();
		// console.log($('#booking_search_country').val())
		if($('#booking_search_specialty').val() == null){
			let query = [{'profile.country': event.target.value}];
			Session.set('search_query',query);
		}
		else if($('#booking_search_specialty').val() != null){
			let query = [{'profile.country': event.target.value}, {$or:[{'profile.specialty_1':$('#booking_search_specialty').val()}, {'profile.specialty_2':$('#booking_search_specialty').val()}, {'profile.specialty_3':$('#booking_search_specialty').val()}]}];
			Session.set('search_query',query);
		}
		else{
			let query = [{}];
			Session.set('search_query',query);
		}

	},

	'change #booking_search_specialty':function(event){
		event.preventDefault();
        if($('#booking_search_country').val() == null){
            let query = [{$or:[{'profile.specialty_1':event.target.value}, {'profile.specialty_2':event.target.value}, {'profile.specialty_3':event.target.value}]}];
            Session.set('search_query',query);
        }
        else if($('#booking_search_country').val() != null){
            let query = [{'profile.country': $('#booking_search_country').val()}, {$or:[{'profile.specialty_1':event.target.value}, {'profile.specialty_2':event.target.value}, {'profile.specialty_3':event.target.value}]}];
            Session.set('search_query',query);
        }
        else{
            let query = [{}];
            Session.set('search_query',query);
        }
	},

	// 'change #booking_search_subspecialty':function(event){
	// 	event.preventDefault();
	// 	if($('#booking_search_country').val() == null){
	// 		let query = {'profile.specialty':$('#booking_search_specialty').val(),'profile.subspecialty':event.target.value};
	// 		Session.set('search_query',query);
	// 	}
	// 	else{
	// 		let query = {'profile.country': $('#booking_search_country').val(), 'profile.specialty':$('#booking_search_specialty').val(),'profile.subspecialty':event.target.value};
	// 		Session.set('search_query',query);
	// 	}
	//
	// },

	'click #booking_search':function(event){
		event.preventDefault();
		let country = $('#booking_search_country').val();
		let specialty = $('#booking_search_specialty').val();
		let subspecialty = $('#booking_search_subspecialty').val();
		console.log(from,to,country,specialty,subspecialty);
		let query = Doctors.find({'profile.country':Session.get('selected_country')}).fetch();
        Session.set('search_result',query);
	},

	'click #booking_search_reset':function(event){
		event.preventDefault();
		$('#booking_search_country').val("");
		$('#booking_search_specialty').val("");
		$('#booking_search_subspecialty').val("");
		$('#booking_search_from').val("");
		Session.set('search_query',null);
	},

	'click #request_confirm':function(event){
		event.preventDefault();

		let date = moment($('#request_date').val());
		let start = $('#request_start').val();
		let end = $('#request_end').val();
		var st =  moment(start, 'hh:mm A');
		var et =  moment(end, 'hh:mm A');
		
		// console.log($('#request_date').val());
		// console.log($('#request_start').val());
		// console.log($('#request_end').val())

		var availableStartDate = '';
		var availableEndDate = '';
		var availableStartTime = '';
		var availableEndTime = ''; 

		// This variable checks if after checking all the availabilities, if there was an available time that matched their request or not.
		var isAvailable = false;
		
		let dateToday = moment(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY');
		let b = moment(date.format('DD/MM/YYYY'), 'DD/MM/YYYY');
		
		// console.log('current time: ' + moment().format("hh:mm A"));
		// console.log(st);
		// console.log(st > moment(moment().format('hh:mm A'), 'hh:mm A'));
		// console.log(st < moment(moment().format('hh:mm A'), 'hh:mm A'));
		// console.log(st.isSame(moment(moment().format('hh:mm A'), 'hh:mm A')));
		// Check to see if there are missing fields in the request
		if( start == '' || end == '' || isNaN(date)){
			swal({
			  title: 'Need More Info!',
			  text: 'Please provide a Date, From Time, and To Time to request a consult' ,
			  type: 'error',
			  confirmButtonClass: "btn btn-success",
			  buttonsStyling: false
			});
		}
		// do not allow passed date and time requests
		else if(dateToday.isSame(b) && st < moment(moment().format('hh:mm A'), 'hh:mm A')){
			swal({
			  title: 'Cannot request Time and Date that has passed!',
			  text: 'Please provide an upcoming available time and date' ,
			  type: 'error',
			  confirmButtonClass: "btn btn-success",
			  buttonsStyling: false
			});	
		}
		else{
			// should not be able to request a time that has been already passed.
			if(st < et && (dateToday < b || dateToday.isSame(b))){

				// USE THIS ALGORITHM to restrict times. 
				// this nested loop gives individual values of each field from the TIME field in mongoDB
				// THE TIME FIELD, you can use check date and start/end time at the ssame time. 
				// RESTRICTION: cannot request a consult that changes date times. As of Oct 4 changes. 
				//   eg.  even if a doctor is available from  jan 1 11PM to Jan 2 8 AM, a patient cannot request Jan 1 11:59pm to Jan 2 12:01 am. 

				// Outer for loop grabs each time block available in the doctor's schedule
				for(key in globalTime) {
				    if(globalTime.hasOwnProperty(key)) {
				        var value = globalTime[key];
				        
				        // inner for loop goes through the properties of each time block
				        // For schedule purposes, we want the start and end times which also contains the dates. 
				        for(prop in value){
				        	if(value.hasOwnProperty(prop)){
				        		if(prop == 'start'){
				        			// formatting the database values to match the scheduler data form in order to compare the different moments. 
				        			availableStartDate = value[prop].substring(5,7) +'/' + value[prop].substring(8,10)+'/'+ value[prop].substring(0,4) ;
				        			
				        			// format the time from 24:00 to 12:00 AM/PM clock
				        			availableStartTime = value[prop].substring(11,16);
				        			if(parseInt(value[prop].substring(11,13)) >= 12 && parseInt(value[prop].substring(11,13)) != 24 ) {
				        					let hour = parseInt(value[prop].substring(11,13)) - 12;
				        					if (hour < 10){
				        						let stringHour = '0'+hour.toString();
				        						availableStartTime = stringHour + ":" + value[prop].substring(14,16)  + ' PM';
				        					}
				        					else{
				        						availableStartTime = hour.toString() + ":" + value[prop].substring(14,16)  + ' PM';
				        					}
				        					
				        			}
				        			else if(parseInt(value[prop].substring(11,13)) < 12 || parseInt(value[prop].substring(11,13)) == 24){
				        					if(parseInt(value[prop].substring(11,13)) == 24){
				        						availableStartTime = '12:00 AM';
				        					}
				        					else{
				        						availableStartTime = availableStartTime+ ' AM';
				        					}
				        			}
				        		}
				        		else if(prop == 'end'){
				        			// formatting the database values to match the scheduler data form in order to compare the different moments. 
				        			availableEndDate = value[prop].substring(5,7) +'/' + value[prop].substring(8,10)+'/'+ value[prop].substring(0,4) ;

				        			// format the time from 24:00 to 12:00 AM/PM clock
				        			availableEndTime = value[prop].substring(11,16);
				        			if(parseInt(value[prop].substring(11,13)) >= 12 && parseInt(value[prop].substring(11,13)) != 24 ) {
				        					let hour = parseInt(value[prop].substring(11,13)) - 12;
				        					if (hour < 10){
				        						let stringHour = '0'+hour.toString();
				        						availableEndTime = stringHour + ":" + value[prop].substring(14,16)  + ' PM';
				        					}
				        					else{
				        						availableEndTime = hour.toString() + ":" + value[prop].substring(14,16)  + ' PM';
				        					}
				        					
				        			}
				        			else if(parseInt(value[prop].substring(11,13)) < 12 || parseInt(value[prop].substring(11,13)) == 24){
				        					if(parseInt(value[prop].substring(11,13)) == 24){
				        						availableEndTime = '12:00 AM';
				        					}
				        					else{
				        						availableEndTime = availableEndTime+ ' AM';
				        					}
				        			}
				        		}
				        		
				        	}
				        }
				        // Check if the requested date is in between availableStart/EndDate. If True, check to see if time is available, else check next block of availability
				        // ASSUMPTION:   if available start date is January 1, and time is 8:00 Pm and that block goes until January 3 8:00AM, the continuous time inbetween
				        // 		 is all available for booking
				        if((date < moment(availableEndDate) || date.isSame(moment(availableEndDate))) && (date > moment(availableStartDate)|| date.isSame(moment(availableEndDate)))) {
				        	//check to see if the time is available
				        	// If a doctor is available January 1, at 11pm and is available continuously until January 3 at 8 am, 
				        	// start time is technically more than end time, although dates are different. Must account for this. 
				        	//     Jan 1 (available from 12:00 pm on wards)
				        	//     Jan 2 (available all day)
				        	//     Jan 3 (available until 12:00 pm)
				        	if(moment(availableStartDate) != moment(availableEndDate) && moment(availableStartDate) < moment(availableEndDate) ){
				        		if(date.isSame(moment(availableStartDate)) ){
				        			// on the day of the start date block
				        			if(st >= moment(availableStartTime, 'hh:mm A')){
				        				Meteor.call('send_request',
											Meteor.user(),
											Session.get('selected_doctor'),
											date.format('MMM D, YYYY'),
											start,
											end,
											function(err){
								              if(err){
								                  console.log(err);
								                  swal({
								                      title: 'An Error occured!',
								                      text: 'Something seemed to have gone wrong with our scheduling system. Please contact us via phone or by email provided in the contact us section.' ,
								                      type: 'error',
								                      confirmButtonClass: "btn btn-success",
								                      buttonsStyling: false
								                  });
								              }
								              else{
								              	  isAvailable = true;
								                  swal({
								                    title: 'Your request has been sent!',
								                    text: 'Your request has been sent to your doctor and will get back to you shortly. You can check your request in the REQUEST tab on the left',
								                    type: 'success',
								                    confirmButtonClass: "btn btn-success",
								                    buttonsStyling: false,
								                   
								                });
								              }
								            }
										);
										$('#check_availability').modal('hide');
				        			}
				        		}
				        		else if (date.isSame(moment(availableEndDate))) {
				        			// on the day of the end date block
				        			if( et <= moment(availableEndTime, 'hh:mm A')){
				        				
				        				Meteor.call('send_request',
											Meteor.user(),
											Session.get('selected_doctor'),
											date.format('MMM D, YYYY'),
											start,
											end,
											function(err){
								              if(err){
								                  console.log(err);
								                  swal({
								                      title: 'An Error occured!',
								                      text: 'Something seemed to have gone wrong with our scheduling system. Please contact us via phone or by email provided in the contact us section.' ,
								                      type: 'error',
								                      confirmButtonClass: "btn btn-success",
								                      buttonsStyling: false
								                  });
								              }
								              else{
								              	  isAvailable = true;
								                  swal({
								                    title: 'Your request has been sent!',
								                    text: 'Your request has been sent to your doctor and will get back to you shortly. You can check your request in the REQUEST tab on the left',
								                    type: 'success',
								                    confirmButtonClass: "btn btn-success",
								                    buttonsStyling: false,
								                   
								                });
								              }
								            }
										);
										$('#check_availability').modal('hide');
				        			}

				        		}
				        		else {
				        			// inbetween start and end days.
				        			
				        			Meteor.call('send_request',
											Meteor.user(),
											Session.get('selected_doctor'),
											date.format('MMM D, YYYY'),
											start,
											end,
											function(err){
								              if(err){
								                  console.log(err);
								                  swal({
								                      title: 'An Error occured!',
								                      text: 'Something seemed to have gone wrong with our scheduling system. Please contact us via phone or by email provided in the contact us section.' ,
								                      type: 'error',
								                      confirmButtonClass: "btn btn-success",
								                      buttonsStyling: false
								                  });
								              }
								              else{
								              	  isAvailable = true;
								                  swal({
								                    title: 'Your request has been sent!',
								                    text: 'Your request has been sent to your doctor and will get back to you shortly. You can check your request in the REQUEST tab on the left',
								                    type: 'success',
								                    confirmButtonClass: "btn btn-success",
								                    buttonsStyling: false,
								                   
								                });
								              }
								            }
										);
										$('#check_availability').modal('hide');

				        		}
				        	}

				        	// if the requested block of availability starts and ends on the same day this logic is fine
				        	else if(st >= moment(availableStartTime, 'hh:mm A') && et <= moment(availableEndTime, 'hh:mm A')){
				        		//complete the request. AND ALSO SHOULD CHECK IF THERE IS NO EVENTS HAPPENING AT THIS PART
				        		
				        		Meteor.call('send_request',
											Meteor.user(),
											Session.get('selected_doctor'),
											date.format('MMM D, YYYY'),
											start,
											end,
											function(err){
								              if(err){
								                  console.log(err);
								                  swal({
								                      title: 'An Error occured!',
								                      text: 'Something seemed to have gone wrong with our scheduling system. Please contact us via phone or by email provided in the contact us section.' ,
								                      type: 'error',
								                      confirmButtonClass: "btn btn-success",
								                      buttonsStyling: false
								                  });
								              }
								              else{
								              	isAvailable = true;
								                  swal({
								                    title: 'Your request has been sent!',
								                    text: 'Your request has been sent to your doctor and will get back to you shortly. You can check your request in the REQUEST tab on the left',
								                    type: 'success',
								                    confirmButtonClass: "btn btn-success",
								                    buttonsStyling: false,
								                   
								                });
								              }
								            }
										);
										$('#check_availability').modal('hide');
				        	}
				        }

				    }
				}
				// end of getting the doctor's available time and formatting the date and time 
				if (date < moment(availableStartDate)){
					swal({
					  title: 'You cannot request a consult after its time has passed!',
					  text: 'Please check the schedule and pick an available time that works best for you!' ,
					  type: 'error',
					  confirmButtonClass: "btn btn-success",
					  buttonsStyling: false
					});
				}
				else if(!isAvailable){
					swal({
					  title: 'The time you requested is not available!',
					  text: 'Please check the schedule and pick an available time that works best for you!' ,
					  type: 'error',
					  confirmButtonClass: "btn btn-success",
					  buttonsStyling: false
					});
				}
			}
			else if(dateToday > b){
				swal({
				  title: 'Invalid date!',
				  text: 'You cannot request a date that has already passed!' ,
				  type: 'error',
				  confirmButtonClass: "btn btn-success",
				  buttonsStyling: false
				});
			}
			else{
				swal({
				  title: 'Invalid start and end time!',
				  text: 'You cannot have a start time that is same as your end time or a start time that is after your end time OR a time that has already passed!' ,
				  type: 'error',
				  confirmButtonClass: "btn btn-success",
				  buttonsStyling: false
				});
			}	
		}

	}
});

Template.search.helpers({
	'search_specialty':function(){
		return Specialties.find();
	},

	'available_times':function(){
		return Doctors.find();
	
		//{}, {'time.start':'startTime', 'time.end':'endTime', 'time.price':'price'}
	},

	'search_subspecialty':function(){
		return SubSpecialties.find({specialty:Specialties.findOne({value:Session.get('selected_specialty')}).name});
	},

	'category_radiology':function(){
		return Doctors.find({'profile.specialty':"Diagnostic Radiology"});
	},

	'category_surgery':function(){
		return Doctors.find({'profile.specialty':"Neurological Surgery"});
	},

	'category_reflex':function(){
		return Doctors.find({'profile.specialty':"Muscle & Reflex"});
	},

	'category_ophthalmology':function(){
		return Doctors.find({'profile.specialty':"Ophthalmology"});
	}
});

Template.search.onCreated(function(){
	Meteor.subscribe('doctortime');
	Meteor.subscribe('doctorprofile');
	Meteor.subscribe('patientprofile');
	Meteor.subscribe('specialty');
	Meteor.subscribe('subspecialty');
	Session.set('search_query',null);
});

Template.booking_search.helpers({
	'result':function(){
		if(Session.get('search_query') == null){
			return Doctors.find();
		}
		else {
            var selector = Session.get('search_query');
            if(selector[1]){
                return Doctors.find({$and:[selector[0],selector[1]]});
            } else {
                return Doctors.find(selector[0])
			}
        }
	}
});


Template.search.onRendered(function () {
	Meteor.Device.isTablet();
	Meteor.Device.isPhone();
	Meteor.Device.isDesktop();
});
