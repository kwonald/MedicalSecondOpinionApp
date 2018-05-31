Template.snapshot.helpers({
    "today": function () {
        return moment().format('MMM D');
    },

    'requests_count': function () {
        return Requests.find({status: {$in: ['New', 'Waiting for Payment']}}).count();
    },
    'find_paypal_email': function () {
        if(!Meteor.user().paypalemail) {
            return "Not Ready";
        } else {
            return Meteor.user().paypalemail;
        }
    }
});



Template.snapshot.onCreated(function () {
    Meteor.subscribe('myrequest');
    Meteor.subscribe('incomingrequest');
});

Template.paypal_account_modal.helpers({
    'paypal_email_value': function () {
        // console.log(Meteor.user().paypalemail)
        if(!Meteor.user().paypalemail) {
            return "";
        } else {
            return Meteor.user().paypalemail;
        }
    }
});

Template.snapshot.events({
    // 'click #set_paypal_account_button': function () {
    //     $('#paypal_account_modal_id').modal('show');
    // }
    'change #uploadDocs':function(event){
        event.preventDefault();
        var files = $("input.file_bag")[0].files
        S3.upload({
                files:files,
                path:"docs_" + Meteor.userId()
            },function(e,r){
                Meteor.call('update_documents',r.secure_url);
        });
    },
});

// Template.paypal_account_modal.events({
//     'click #update_paypal_account_button': function () {
//         console.log("ss");

//     }
// });

$(function(){
    $(document).on("click", "#update_paypal_account_button", function(event){
        if ($('[name=paypal_email]').val() !== "") {
            Meteor.call('update_paypal_email', $('#paypal_email').val(), function (err, res) {
                $('#paypal_account_modal_id').modal('hide');
                $('[name=paypal_email]').val('');
                swal({
                    title: 'Paypal Email Updated',
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                });
            })
        } else {
            $('#paypal_email').val('');
            swal({
                title: 'You Must Provide a Paypal Account Before Accepting Any Consultations!',
                type: 'error',
                confirmButtonClass: "btn btn-success",
                buttonsStyling: false
            });
        }
    });
});
