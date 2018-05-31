Template.forget_password.events({
    'submit #password_recovery': function (e) {
        e.preventDefault();
        var email = $('[name=pwd_reset_email]').val();
        console.log($('[name=pwd_reset_email]').val());
        Accounts.forgotPassword({email: $('[name=pwd_reset_email]').val()}, 
            function (err){
                if(err){
                    console.log(err);
                    swal({
                        title: 'Email does not exist!',
                        text: 'There is no account with the email: ' + email + ' in our system. Please check and try again.' ,
                        type: 'error',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false
                    });
                }
                else{
                    swal({
                        title: 'Recover Password',
                        text: 'An email has been sent with instructions to reset your password to: ' + email ,
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false
                    });
                }
            }

            )

        // Meteor.call('get_user_id', $('#pwd_reset_email').val(), function (err,res) {
        //     if(res) {
        //         console.log(res._id);
        //     }
        // });
    }
})