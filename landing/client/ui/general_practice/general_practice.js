Template.general_practice.events({
    'submit #login':function(event){
        event.preventDefault()
        var email = $('[name=login_email]').val();
        var password = $('[name=login_password]').val();

        Meteor.loginWithPassword(email,password, function(err){
            if(err){
                swal({
                    title: 'Invalid Login',
                    text: 'Please enter username and password.',
                    type: 'warning',
                    confirmButtonClass: "btn btn-black",
                    buttonsStyling: false
                })
            }
            else{
                if(Meteor.user()) {
                    Router.go('/dashboard');
                }
            }
        });

    }
});
