Template.nav.helpers({
    'profile': function () {
        return UserProfile.findOne({});
    },
    'todo': function () {
        var todo = 0;
        Cart.find({takeout: true}).fetch().concat(ClientCart.find({
            takeout: true
        }).fetch()).forEach(function (item) {
            item.orders.forEach(function (order) {
                if (order.newitem == true) {
                    todo++;
                }
            })
        });
        if (todo == 0) {
            return null;
        } else {
            return todo;
        }
    },
    activeRouteClass: function (template) {
        var currentRoute = Router.current();
        return currentRoute &&
        template === currentRoute.lookupTemplate() ? 'active' : '';
    }
});

Template.nav.events({

    'click #demo_start':function(event){
        event.preventDefault();
        window.open('/demo');
    }

});