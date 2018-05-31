Template.profile.onRendered(function(){
	Meteor.Device.isDesktop();
	Meteor.Device.isTablet();
	Meteor.Device.isPhone();
	if(Roles.userIsInRole(Meteor.userId(),["doctor",'onhold'])){
		$('#profile_contactname').val(Meteor.user().contact_name);
		$('#profile_phone').val(Meteor.user().phone);
		$('#profile_email').val(Meteor.user().emails[0].address);
		$('[name=doctor_boardCertified]').val(Meteor.user().doctor_board_certified);
		$('[name=doctor_certifiedYear]').val(Meteor.user().doctor_certified_year);
		$('[name=doctor_license_location]').val(Meteor.user().doctor_license_location);
		$('[name=doctor_specialty1]').val(Meteor.user().specialty_1);
		$('[name=doctor_specialty2]').val(Meteor.user().specialty_2);
		$('[name=doctor_specialty3]').val(Meteor.user().specialty_3);
		$('[name=doctor_other_specialty]').val(Meteor.user().specialty_other);
		$('[name=doctor_subspecialty1]').val(Meteor.user().subspecialty_1);
		$('[name=doctor_subspecialty2]').val(Meteor.user().subspecialty_2);
		$('[name=doctor_subspecialty3]').val(Meteor.user().subspecialty_3);
		$('[name=doctor_other_subSpeciality]').val(Meteor.user().subspecialty_other);
		$('[name=time_to_contact]').val(Meteor.user().time_to_contact);
		$('[name=able_to_work]').val(Meteor.user().able_to_work);
		$('[name=doctor_residency]').val(Meteor.user().residency);
		$('[name=doctor_fellowship]').val(Meteor.user().fellowship);
		$('[name=doctor_awards]').val(Meteor.user().awards);
        $('[name=doctor_comments]').val(Meteor.user().comments);
        $('#profile_country').val(Meteor.user().country);
    } else {
		$('#profile_patient_firstname').val(Meteor.user().firstname);
		$('#profile_patient_lastname').val(Meteor.user().lastname);
		$('#profile_patient_birthdate').val(Meteor.user().birthdate);
		$('#profile_patient_gender').val(Meteor.user().gender);
		$('#profile_patient_phone').val(Meteor.user().phone);
		$('#profile_patient_email').val(Meteor.user().emails[0].address);
		$('#profile_patient_height').val(Meteor.user().height);
		$('#profile_patient_weight').val(Meteor.user().weight);
		$('#profile_patient_blood').val(Meteor.user().blood);
		$('#profile_patient_allergy').val(Meteor.user().allergy);
		$('#profile_patient_fhistory').val(Meteor.user().fhistory);
	}
	if(Roles.userIsInRole(Meteor.userId(),'onhold')){
		swal({
			title: 'Application In Progress',
			text:"Please upload your medical certificates for us to review your application, you will be able to use all Porton features after the review process.",
			type: 'info',
			confirmButtonClass: "btn btn-black",
			buttonsStyling: false
		});
	}
});

Template.profile.events({
	'click #profile_confirm':function(event){
		event.preventDefault();
		if(Roles.userIsInRole(Meteor.userId(),["doctor",'onhold'])){
            var contact_name = $('#profile_contactname').val();
            var salutation = $('[name=doctor_salutation]:checked').val();
            var other_salutation = $('[name=doctor_other_salutation]').val();
            var doctor_board_certified = $('[name=doctor_boardCertified]').val();
            var doctor_certified_year = $('[name=doctor_certifiedYear]').val();
            var doctor_license_location = $('[name=doctor_license_location]').val();
            var phone = $('#profile_phone').val();
            // var time_to_contact = $('[name=time_to_contact]').find(':checked').val();
            var time_selected = $('[name=time_to_contact]:checked');
            var time_to_contact = _.map(time_selected, function (item) {
                return item.defaultValue;
            });
            var able_to_work_selected = $('[name=able_to_work]:checked');
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
            var residency = $('[name=doctor_residency]').val();
            var fellowship = $('[name=doctor_fellowship]').val();
            var awards = $('[name=doctor_awards]').val();
            var comments = $('[name=doctor_comments]').val();
            var country = $('#profile_country').val();
            // var paypal_email = $('[name=paypal_email]').val();
            Meteor.call('update_doctor_profile', contact_name,salutation,other_salutation,doctor_board_certified,doctor_certified_year,doctor_license_location,phone,time_to_contact,able_to_work,country,specialty_1, specialty_2, specialty_3, specialty_other, subspecialty_1,subspecialty_2,subspecialty_3,subspecialty_other, residency,fellowship,awards,comments,function(err,res){
				if(!err){
					alert('profile updated')
					swal({
						title: 'Profile Updated',
						type: 'success',
						confirmButtonClass: "btn btn-success",
						buttonsStyling: false
					});
				}
				else{
					alert(err);
				}
			});
		}
		else{
			let firstname = $('#profile_patient_firstname').val();
			let lastname = $('#profile_patient_lastname').val();
			let birthdate = $('#profile_patient_birthdate').val();
			let gender = $('#profile_patient_gender').val();
			let phone = $('#profile_patient_phone').val();
			let email = $('#profile_patient_email').val();
			let height = $('#profile_patient_height').val();
			let weight = $('#profile_patient_weight').val();
			let blood = $('#profile_patient_blood').val();
			let allergy = $('#profile_patient_allergy').val();
			let fhistory = $('#profile_patient_fhistory').val();
			Meteor.call('update_patient_profile',firstname,lastname,birthdate,gender, phone, email, height,weight, blood,allergy,fhistory,function(err,res){
				if(!err){
					swal({
						title: 'Profile Updated',
						type: 'success',
						confirmButtonClass: "btn btn-success",
						buttonsStyling: false
					});
				}
				else{
					alert(err);
				}
			});
		}
	},

	'change #uploadAvatar':function(event){
		event.preventDefault();
		var files = $("input.file_bag")[0].files
		S3.upload({
				files:files,
				path:"avatar_" + Meteor.userId()
			},function(e,r){
				Meteor.call('update_avatar',r.secure_url);
		});
	}
});

Template.profile.helpers({
	'avatar':function(){
		return Meteor.user().avatar;
	}
});
