
Template.home.events({

    'submit #contact-form': function (e) {
        e.preventDefault();
        var f_name = $('#firstname').val();
        var l_name = $('#lastname').val();
        var fromEmail = $('#email').val();
        var message = $('#message').val();
        var finalMessage = 'First Name: ' + f_name + 'Last Name: ' + l_name + '\nFrom: ' + fromEmail + '\nMessage: ' + message;

        if (f_name == 0 || l_name == 0 || fromEmail == 0 || message == 0){
          swal({
                  title: 'Missing Fields!',
                  text: 'Please provide us with your full name, email, and reason for contacting us so that we can best respond to your questions!',
                  type: 'error',
                  confirmButtonClass: "btn btn-success",
                  buttonsStyling: false,
              });
        }
        else{
          // // Client: Asynchronously send an email.
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
        }
        

    }


});
//     'submit #login':function(event){
//         event.preventDefault()
//         var email = $('[name=login_email]').val();
//         var password = $('[name=login_password]').val();

//         Meteor.loginWithPassword(email,password, function(err){
//             if(err){
//                 swal({
//                     title: 'Invalid Login',
//                     text: 'Please enter username and password.',
//                     type: 'warning',
//                     confirmButtonClass: "btn btn-black",
//                     buttonsStyling: false
//                 })
//             }
//             else{
//                 if(Meteor.user()) {
//                     Router.go('/dashboard');
//                 }
//             }
//         });

//     }
// });