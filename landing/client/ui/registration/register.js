Template.register.helpers({
    'register_for_patient': function(){
    	return Session.get('isPatient');
    },

    'register_for_healthAdmin': function(){
    	return Session.get('isHealthAdmin');
    },

    'register_for_employerAdmin': function(){
    	return Session.get('isEmployerAdmin');
    }

});


Template.register.events({
	'submit #contact-form': function (e) {
        e.preventDefault();
        var f_name = $('#firstname').val();
        var l_name = $('#lastname').val();
        var fromEmail = $('#email').val();
        var message = $('#message').val();
        var finalMessage = 'First Name: ' + f_name + 'Last Name: ' + l_name + '\nFrom: ' + fromEmail + '\nMessage: ' + message;

        // Client: Asynchronously send an email.
        Meteor.call(
          'sendEmail',       
          'portonhealth@gmail.com',  // to
          fromEmail,            // from
          'Get In Touch',         // subject
          finalMessage,   // text body
          
          function(err){
            if(err){
                console.log(err);
                swal({
                    title: 'An Error occured!',
                    text: 'There seems to be something wrong with our email system. Please contact us via phone or by email provided in the contact us section.' ,
                    type: 'error',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                });
            }
            else{
                swal({
                  title: 'Thank you for contacting us!',
                  text: 'We have received your message and will get back to you shortly.',
                  type: 'success',
                  confirmButtonClass: "btn btn-success",
                  buttonsStyling: false,
                 
              });
            }
          }

        );

    },
    
	'click [name=finish]':function(event){
		event.preventDefault();

		if(Session.get('isEmployerAdmin')){
			// sign up health organization Admin account
			var email = $('[name=employer_email]').val();
	        var password = $('[name=employer_password]').val();
	        var re_password = $('[name=employer_passwordverify]').val();
	        var orgName = $('[name=employer_orgName]').val();
	        var address = $('[name=employer_orgAddress]').val();
	        var URL = $('[name=employer_orgURL]').val();
	        var description = $('[name=employer_orgDescription]').val();
	        var role = $('[name=employer_orgRole]').val();

	        if(email == '' || password == '' || re_password == '' || orgName == '' || address == '' || URL =='' ||description =='' ||role ==''){
	        	alert('Please fill out ALL the required fields');
	        }
		    else{

		        if(password == re_password){

		            Meteor.call('create_employerAdmin',email,password,
		                function(err,res){
		                    if(err){
		                        alert(err);
		                    }
		                    else{
								swal({
									title: 'Welcome to Porton',
									text: 'Your are now registered.',
									type: 'success',
									confirmButtonClass: "btn btn-success",
									buttonsStyling: false
								})
		                        Meteor.loginWithPassword(email,password,function(err,res){
		                            if(!err){
		                            	Meteor.call('update_avatar','../img/faces/default-avatar.png');
		                                Router.go("/dashboard");
		                                // This sends email to the admin informing them that a new patient has registered
						            	var finalMessage = 'New employer signed up with email: ' + email ;
						            	// Client: Asynchronously send an email.
								        Meteor.call(
								          'sendEmail',       
								          'portonhealth@gmail.com',  // to
								          'portonhealth@gmail.com',            // from
								          'New Patient Sign Up',         // subject
								          finalMessage   // text body
								        );

								        // This sends email to the patient who just signed up, with a message of their new registeration
								        var finalMessage = 'Thank you for signing up with Porton Health!';
						            	// Client: Asynchronously send an email.
								        Meteor.call(
								          'sendEmail',       
								           email,  // to
								          'portonhealth@gmail.com',            // from
								          'Welcome to Porton Health',         // subject
								          finalMessage   // text body
								        );
		                    
		                            }

		                        });
			                    
		                    }
		                });
		        }
		        else{
					swal({
						title: 'Password Error',
						text: 'Password doesn&#39;t match, please re-enter password.',
						type: 'error',
						confirmButtonClass: "btn btn-black",
						buttonsStyling: false
					})
		        }
			}
		}
		else if(Session.get('isHealthAdmin')){

			// sign up health organization Admin account
			var email = $('[name=organization_email]').val();
	        var password = $('[name=organization_password]').val();
	        var re_password = $('[name=organization_passwordverify]').val();
	        var orgName = $('[name=organization_orgName]').val();
	        var address = $('[name=organization_orgAddress]').val();
	        var URL = $('[name=organization_orgURL]').val();
	        var description = $('[name=organization_orgDescription]').val();
	        var role = $('[name=organization_orgRole]').val();

	        if(email == '' || password == '' || re_password == '' || orgName == '' || address == '' || URL =='' ||description =='' ||role ==''){
	        	alert('Please fill out ALL the required fields!');
	        }
		    else{

		        if(password == re_password){

		            Meteor.call('create_organizationAdmin',email,password,
		                function(err,res){
		                    if(err){
		                        alert(err);
		                    }
		                    else{
								swal({
									title: 'Welcome to Porton',
									text: 'Your are now registered.',
									type: 'success',
									confirmButtonClass: "btn btn-success",
									buttonsStyling: false
								})
		                        Meteor.loginWithPassword(email,password,function(err,res){
		                            if(!err){
		                            	Meteor.call('update_avatar','../img/faces/default-avatar.png');
		                                Router.go("/dashboard");
		                                // This sends email to the admin informing them that a new patient has registered
						            	var finalMessage = 'New organization signed up with email: ' + email ;
						            	// Client: Asynchronously send an email.
								        Meteor.call(
								          'sendEmail',       
								          'portonhealth@gmail.com',  // to
								          'portonhealth@gmail.com',            // from
								          'New Organization Sign Up',         // subject
								          finalMessage   // text body
								        );

								        // This sends email to the patient who just signed up, with a message of their new registeration
								        var finalMessage = 'Thank you for signing up with Porton Health!';
						            	// Client: Asynchronously send an email.
								        Meteor.call(
								          'sendEmail',       
								           email,  // to
								          'portonhealth@gmail.com',            // from
								          'Welcome to Porton Health',         // subject
								          finalMessage   // text body
								        );
		                    
		                            }

		                        });
			                    
		                }
		            });
		        }
		        else{
					swal({
						title: 'Password Error',
						text: 'Password doesn&#39;t match, please re-enter password.',
						type: 'error',
						confirmButtonClass: "btn btn-black",
						buttonsStyling: false
					})
		        }
			}

		}
		else if(Session.get('isPatient')){
			var email = $('[name=patient_email]').val();
	        var password = $('[name=patient_password]').val();
	        var re_password = $('[name=patient_passwordverify]').val();
	        var message = $('#message').val();
	        if(password == re_password){
	            Meteor.call('create_patient',email,password,
	                function(err,res){
	                    if(err){
	                        alert(err);
	                    }
	                    else{
							swal({
								title: 'Welcome to Porton! & DISCLAIMER',
								text: 'Your are now registered however we are still in development and are currently not ready for official consultations at this time. Please feel free to use the webapp to see what an online consultation experience may be like in your near future!',
								type: 'success',
								confirmButtonClass: "btn btn-success",
								buttonsStyling: false
							})
	                        Meteor.loginWithPassword(email,password,function(err,res){
	                            if(!err){
	                            	Meteor.call('update_avatar','../img/faces/default-avatar.png');
	                                Router.go("/dashboard");
	                                // This sends email to the admin informing them that a new patient has registered
					            	var finalMessage = 'New patient signed up with email: ' + email + '\nHas the following condition(s): '+ message;
					            	// Client: Asynchronously send an email.
							        Meteor.call(
							          'sendEmail',       
							          'portonhealth@gmail.com',  // to
							          'portonhealth@gmail.com',            // from
							          'New Patient Sign Up',         // subject
							          finalMessage   // text body
							        );

							        // This sends email to the patient who just signed up, with a message of their new registeration
							        var finalMessage = 'Hi!\nWe’re glad you decided to join us! We are still in early stages of development and are currently working to ensure that the platform is ready for patient use. Feel free to try out our alpha version of the webapp but please note that we are not ready for official consultations at this time.\n\nSincerely,\nThe Porton Team';
					            	// Client: Asynchronously send an email.
							        Meteor.call(
							          'sendEmail',       
							           email,  // to
							          'portonhealth@gmail.com',            // from
							          'Welcome to Porton Health',         // subject
							          finalMessage   // text body
							        );
	                            }

	                        });
		                    
	                    
	                    }
	                });

	            	
			        


	        }
	        else{
				swal({
					title: 'Password Error',
					text: 'Password doesn&#39;t match, please re-enter password.',
					type: 'error',
					confirmButtonClass: "btn btn-black",
					buttonsStyling: false
				})
	        }
		}
		else{
			var contact_name = $('[name=doctor_contactname]').val();
            // var firstname = $('[name=doctor_firstname]').val();
	        // var lastname = $('[name=doctor_lastname]').val();
	        var email = $('[name=doctor_email]').val();
            var password = $('[name=doctor_password]').val();
            var re_password = $('[name=doctor_passwordverify]').val();
            var salutation = $('[name=doctor_salutation]:checked').val();
            var other_salutation = $('[name=doctor_other_salutation]').val();
            var doctor_board_certified = $('[name=doctor_boardCertified]').val();
            var doctor_certified_year = $('[name=doctor_certifiedYear]').val();
            var doctor_license_location = $('[name=doctor_license_location]').val();
			var phone = $('[name=doctor_phone]').val();
			// var time_to_contact = $('[name=time_to_contact]').find(':checked').val();
			var time_selected = $('input[name=time_to_contact]:checked');
			var time_to_contact = _.map(time_selected, function (item) {
				return item.defaultValue;
			});
			var able_to_work_selected = $('input[name=able_to_work]:checked');
			var able_to_work = _.map(able_to_work_selected, function (item) {
				return item.defaultValue;
			});
			var specialty_1 = $('[name=doctor_specialty1]').val();
			var specialty_2 = $('[name=doctor_specialty2]').val();
			var specialty_3 = $('[name=doctor_specialty3]').val();
			var specialty_other = $('[name=doctor_other_speciality]').val()
			var subspecialty_1 = $('[name=doctor_subspecialty1]').val();
			var subspecialty_2 = $('[name=doctor_subspecialty2]').val();
			var subspecialty_3 = $('[name=doctor_subspecialty3]').val();
            var subspecialty_other = $('[name=doctor_other_subSpeciality]').val()
            // var country = $('[name=doctor_country]').find(':selected').val();
			// var province = $('[name=doctor_province]').find(':selected').val();
			// var city = $('[name=doctor_city]').find(':selected').val();
			var residency = $('[name=doctor_residency]').val();
			var fellowship = $('[name=doctor_fellowship]').val();
			var awards = $('[name=doctor_awards]').val();
			var comments = $('[name=doctor_comments]').val();
			var country = $('[name=doctor_country]').val();
	        // var paypal_email = $('[name=paypal_email]').val();
			console.log(doctor_board_certified)
	        if(password == re_password){
	            Meteor.call('create_doctor',email,password,
	                function(err,res){
	                    if(err){
	                        alert(err);
	                    }
	                    else{
							swal({
								title: 'Welcome to Porton',
								text: 'Your are now registered.',
								type: 'success',
								confirmButtonClass: "btn btn-success",
								buttonsStyling: false
							})
	                        Meteor.loginWithPassword(email,password,function(err,res){
	                            if(!err){
	                                Meteor.call('update_doctor_profile', contact_name,salutation,other_salutation,doctor_board_certified,doctor_certified_year,doctor_license_location,phone,time_to_contact,able_to_work,country,specialty_1, specialty_2, specialty_3, specialty_other, subspecialty_1,subspecialty_2,subspecialty_3,subspecialty_other, residency,fellowship,awards,comments);
	                                Meteor.call('update_avatar','../img/faces/default-avatar.png');
	                                Router.go('/profile');
	                            }
	                            else{
	                            	alert(err);
	                            }
	                        });
	                        // This informs the admin that a new doctor has signed up on the platform
			            	var finalMessage = 'New Doctor '+ contact_name +' signed up with email: ' + email;
			            	// Client: Asynchronously send an email.
					        Meteor.call(
					          'sendEmail',       
					          'portonhealth@gmail.com',  // to
					          'portonhealth@gmail.com',            // from
					          'New Doctor Sign Up',         // subject
					          finalMessage   // text body
					        );


					        // This sends a welcome email to the doctor and informs them of their pending approval status
			            	var finalMessage = 'Welcome Dr.'+ contact_name +'! Your account is pending review. Please login and upload your Medical Certificates and other required credentials for us to approve your medical license status. When approved you will gain full access to our WebApp and receive a confirmation email at: ' + email;
			            	// Client: Asynchronously send an email.
					        Meteor.call(
					          'sendEmail',       
					           email,  // to
					          'portonhealth@gmail.com',            // from
					          'Welcome to Porton Health! Your status of approval is pending',         // subject
					          finalMessage   // text body
					        );
	                    }
	                });
	        }
	        else{
				swal({
					title: 'Password Error',
					text: 'Password doesn&#39;t match, please re-enter password.',
					type: 'error',
					confirmButtonClass: "btn btn-black",
					buttonsStyling: false
				})
	        }
		}

	},

	'click #patientreg':function(event){
		event.preventDefault();
		Session.set('isPatient',true);
		Session.set('isEmployerAdmin', false);
		Session.set('isHealthAdmin', false);

	},

	'click #doctorreg':function(event){
		event.preventDefault();
		Session.set('isPatient',false);
		Session.set('isEmployerAdmin', false);
		Session.set('isHealthAdmin', false);
		
		
	},

	'click #employerreg':function(event){
		event.preventDefault();
		Session.set('isEmployerAdmin',true);
		Session.set('isPatient', false);
		Session.set('isHealthAdmin', false);
		
		
	},

	'click #organizationreg':function(event){
		event.preventDefault();
		Session.set('isEmployerAdmin',false);
		Session.set('isPatient', false);
		Session.set('isHealthAdmin', true);
		
		
	},

});

Template.register.onCreated(function(){
	// delete Session.keys['isPatient'];
});