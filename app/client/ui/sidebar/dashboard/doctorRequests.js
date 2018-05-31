function openPhotoSwipe(){
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    var items = [
        {
            src: '/img/certificate1.jpg',
            w: 1000,
            h: 800
        },
        {
            src: '/img/certificate2.jpg',
            w: 1000,
            h: 800
        }
    ];

    // define options (if needed)
    var options = {
        // history & focus options are disabled on CodePen
        history: false,
        focus: false,

        showAnimationDuration: 0,
        hideAnimationDuration: 0

    };

    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
}

Template.doctorRequests.events({
    'click .certificates': function (event) {
        event.preventDefault();
        openPhotoSwipe();
    },

    'click #approve_request':function(event){
        event.preventDefault();
        Meteor.call('updateRoles',this._id,"doctor");
    },

    'click #remove_doctor':function(event){
        event.preventDefault();
        var id = this._id;
        swal({
          title: 'Remove this user?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then(function () {
          swal(
            'Removed!',
            'User has been removed.',
            'success'
          );
          Meteor.call('remove_doctor',id);
        });

    },
    'click #remove_patient':function(event){
        event.preventDefault();
        var id = this._id;
        swal({
          title: 'Remove this user?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then(function () {
          swal(
            'Removed!',
            'User has been removed.',
            'success'
          );
          Meteor.call('remove_doctor',id);
        });

    },
    // start a session from admin panel to patient/doctor etc. 
    // this needs to be swithced so that it actually links the two parties up.
    'click #demo_start':function(event){
        event.preventDefault();
        window.open('/demo');
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
});

Template.doctorRequests.helpers({
    'onholds':function(){
        return Meteor.users.find({roles:"onhold"});
    },
    'approved':function(){
        return Meteor.users.find({roles:'doctor'});
    },
    'list_patients':function(){
        return Meteor.users.find({roles:'patient'}, {'emails.address':'email'});
    },

    'list_employers':function(){
        return Meteor.users.find({roles:'employerAdmin'}, {'emails.address':'email'});
    },

    'list_organizations':function(){
        return Meteor.users.find({roles:'healthOrgAdmin'}, {'emails.address':'email'});
    },

    'search_specialty':function(){
        return Specialties.find();
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

Template.doctorRequests.onCreated(function(){
    Meteor.subscribe("adminrequest");
    Meteor.subscribe("onholds");
    Meteor.subscribe('doctorprofile');
    Meteor.subscribe('doctortime');
    Meteor.subscribe('patientprofile');
    Meteor.subscribe('specialty');
    Meteor.subscribe('subspecialty');
    Session.set('search_query',null);
});