Template.navbar.events({
     'click #signout': function (event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    }
});

Template.navbar.helpers({
    title:function(){
        return Router.current().route.options.title;
    }
});