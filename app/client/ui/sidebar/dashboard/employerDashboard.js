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

Template.employerDashboard.events({
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

    }
});

Template.employerDashboard.helpers({
    'onholds':function(){
        return Meteor.users.find({roles:"onhold"});
    },
    'approved':function(){
        return Meteor.users.find({roles:'doctor'});
    },
    'list_patients':function(){
        return Meteor.users.find({roles:'patient'}, {'emails.address':'email'});
    }
    
});

Template.employerDashboard.onCreated(function(){
    Meteor.subscribe("adminrequest");
    Meteor.subscribe("onholds");
    Meteor.subscribe('doctorprofile');
});