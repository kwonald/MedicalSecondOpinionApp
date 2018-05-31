Template.sidebar.helpers({
    'user':function(){
        return Meteor.user();
    },
    activeRouteClass: function (template) {
        var currentRoute = Router.current();
        return currentRoute &&
        template === currentRoute.lookupTemplate() ? 'active' : '';
    }
});

Template.doctor_sidebar_items.helpers({
     'session_count':function(){
        return Requests.find({status:'Paid',ended:false}).count();
    },

    'requests_count':function(){
        return Requests.find({status:{$in:['New','Waiting for Payment']}}).count();
    }
});

Template.doctor_sidebar_items.onCreated(function(){
    Meteor.subscribe('myrequest');
    Meteor.subscribe('incomingrequest');
    Meteor.subscribe('doctorprofile');
    Meteor.subscribe('patientprofile');
});

Template.patient_sidebar_items.helpers({
    'session_count':function(){
        return Requests.find({status:'Paid',ended:false}).count();
    },

    'requests_count':function(){
        return Requests.find({status:{$in:['New','Waiting for Payment','Declined']}}).count();
    }
});

Template.patient_sidebar_items.onCreated(function(){
    Meteor.subscribe('myrequest');
    Meteor.subscribe('doctorprofile');
    Meteor.subscribe('patientprofile');
});

Template.patient_sidebar_items.helpers({
    activeRouteClass: function (template) {
        var currentRoute = Router.current();
        return currentRoute &&
        template === currentRoute.lookupTemplate() ? 'active' : '';
    }
});

Template.doctor_sidebar_items.helpers({
    activeRouteClass: function (template) {
        var currentRoute = Router.current();
        return currentRoute &&
        template === currentRoute.lookupTemplate() ? 'active' : '';
    }
});

Template.admin_sidebar_items.helpers({
    activeRouteClass: function (template) {
        var currentRoute = Router.current();
        return currentRoute &&
        template === currentRoute.lookupTemplate() ? 'active' : '';
    }
});