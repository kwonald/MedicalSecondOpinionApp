Meteor.publish('doctorprofile',function(){
    return Meteor.users.find({_id:this.userId},{fields:{salutation:1,
        other_salutation:1,
        contact_name:1,
        doctor_board_certified : 1,
        doctor_certified_year : 1,
        doctor_license_location : 1,
        phone:1,
        time_to_contact : 1,
        able_to_work : 1,
        specialty_1 : 1,
        specialty_2 : 1,
        specialty_3 : 1,
        specialty_other : 1,
        subspecialty_1 : 1,
        subspecialty_2 : 1,
        subspecialty_3 : 1,
        subspecialty_other : 1,
        residency : 1,
        fellowship : 1,
        awards : 1,
        comments : 1,
        avatar : 1,
        country:1,
        paypalemail:1
        }});
});

Meteor.publish('patientprofile',function(){
    return Meteor.users.find({_id:this.userId},{fields:{
        firstname:1,
        lastname:1,
        birthdate:1,
        phone:1,
        gender:1,
        height:1,
        weight:1,
        blood:1,
        allergy:1,
        fhistory:1,
        roles:1,
        avatar:1}});
});

Meteor.publish('specialty',function(){
    return Specialties.find({});
});

Meteor.publish('subspecialty',function(){
    return SubSpecialties.find({});
});

Meteor.publish('adminid',function(){
    return Meteor.users.find({roles:"admin"},{fields:{_id:1,roles:1}});
});

Meteor.publish('doctortime',function(){
    return Doctors.find({});
});

Meteor.publish('thisdoctor',function(){
    return Doctors.find({doctor_id:this.userId});
});

Meteor.publish('incomingrequest',function(){
    return Requests.find({'doctor._id':this.userId});
});

Meteor.publish('myrequest',function(){
    return Requests.find({'sender._id':this.userId});
});

Meteor.publish('adminrequest',function(){
    return Requests.find({to:this.userId});
});

Meteor.publish('onholds',function(){
    return Meteor.users.find({},{fields:{
        roles:1,
        salutation:1,
        other_salutation:1,
        contact_name:1,
        doctor_board_certified : 1,
        doctor_certified_year : 1,
        doctor_license_location : 1,
        phone:1,
        time_to_contact : 1,
        able_to_work : 1,
        specialty_1 : 1,
        specialty_2 : 1,
        specialty_3 : 1,
        specialty_other : 1,
        subspecialty_1 : 1,
        subspecialty_2 : 1,
        subspecialty_3 : 1,
        subspecialty_other : 1,
        residency : 1,
        fellowship : 1,
        awards : 1,
        comments : 1,
        avatar : 1,
        country:1,
        paypalemail:1
        }});
});

Meteor.publish(null, function (){
    return Meteor.roles.find({});
});

Meteor.publish('presences', function() {
    return Presences.find({}, { userId: true });
});

Meteor.publish("peerId", function () {
    return Meteor.users.find({}, {fields: {"profile.peerId": true, "emails.address": true} });
});