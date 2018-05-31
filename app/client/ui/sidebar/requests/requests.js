
Template.sent_Requests.onRendered(function(){
	porton.initFormExtendedDatetimepickers();
    Meteor.Device.isTablet();
    Meteor.Device.isPhone();
	Meteor.Device.isDesktop();
});

Template.incoming_Requests.onCreated(function(){
	Meteor.subscribe('incomingrequest');

});


Template.sent_Requests.onCreated(function(){
	Meteor.subscribe('myrequest');
	initPaypal();
});

Template.sent_Requests.onRendered(function(){
        $('#reschedule_confirm').click(function(){
            let date = moment($('#reschedule_date').val());
            let start = $('#reschedule_start').val();
            let end = $('#reschedule_end').val();
            let id = Session.get('selected_request')._id;
            Meteor.call('reschedule_request',
            	id,
            	date.format('MMM D, YYYY'),
				start,
				end
				);
            $('#reschedule_modal').modal('hide');
        });
});

Template.sent_Requests.helpers({
	'sent_requests':function(){
			return Requests.find({'sender._id':Meteor.userId(),status:{$in:['New','Waiting for Payment',"Declined","Paid"]}});	
	},

	'isNew':function(status){
		return status == "New";
	},

	'isWaiting':function(status){
		return status == "Waiting for Payment";
	},

	'isDeclined':function(status){
		return status == "Declined";
	},
	'isPaid':function(status){
		return status == "Paid"
	}
});

Template.sent_Requests.events({
	// 'click #test': function (){
	// 	Meteor.call('test')
	// },
	'click #pay_request':function(event){
		let self = this
		console.log(this)
		console.log('** TESTING THIS **')
		console.log(self)
		event.preventDefault();
		Meteor.call('doctors.getPrice', this.start, this.end, this.date, this.doctor._id, function( e, d) {
			console.log(d)

			if(e){
				alert('cant calculate e');
				console.log(e);
				return;
			}
			Meteor.call('pay_request', self);
     //        paypalPay(d.amount, "porton-facilitator@portonhealth.com", self.doctor.paypalemail, function(err){
     //            if(!err) {
     //            	console.log('done')
					// console.log(this)
     //                 Meteor.call('pay_request', self);

     //            }else{
     //                alert('payment failed!');
     //                console.log(err);
     //                // Meteor.call('pay_request', this);
     //            }
     //        });
		})

    },

	'click #cancel_request':function(event){
		event.preventDefault();
		Meteor.call('cancel_request',this._id);
	},

	'click #reschedule_request':function(event){
		event.preventDefault();
		Session.set("selected_request",this);
		$('#reschedule_modal').modal('show');
	},

	'click #reschedule_confirm':function(event){
		event.preventDefault();
		let date = moment($('#reschedule_date').val());
		let start = $('#reschedule_start').val();
		let end = $('#reschedule_end').val();
		console.log(date, start,end);
		$('#reschedule_modal').modal('hide');
	}
});

Template.incoming_Requests.helpers({
	'requests':function(){
		return Requests.find({'doctor._id':Meteor.userId(),status:{$in:['New','Waiting for Payment']}});
	},

	'isNew':function(status){
		return status == "New";
	},

	'isWaiting':function(status){
		return status == "Waiting for Payment";
	},

	'isPaid':function(status){
		return status == "Paid";
	}
});

Template.incoming_Requests.events({
	'click #confirm_request':function(event){
		event.preventDefault();
		console.log('confirm request requests.js')
		console.log(event)
		if(Meteor.user().paypalemail){
			console.log('calling confirm_request')
			console.log(this._id)
            Meteor.call('confirm_request',this._id);
        } else {
		    $('#paypal_account_modal_id').modal('show');
		    // Meteor.call('confirm_request',this._id);
        }
	},

	'click #decline_request':function(event){
		event.preventDefault();
		Meteor.call('decline_request',this._id);
	}
});


function initPaypal() {
    Meteor.call('paypal.clientToken', function (err, ret) {
        braintree.client.create({
            authorization: ret
        }, function (clientErr, clientInstance) {
            if (clientErr) {
                alert('failed to init payment');
                console.log(clientErr);
                return;
            }
            // Create PayPal component
            braintree.paypal.create({
                client: clientInstance
            }, function (err, paypalInstance) {
                if (err) {
                    alert('failed to init payment');
                    console.log(clientErr);
                    return;
                }
                paypalInst=paypalInstance
            });
        });
    });
}

function paypalPay(amount, email, doctor_paypal, cb) {
	if(isNaN(amount)) {
		alert('invalid amount');
		return;
	}

	if(!paypalInst){
		alert('payment not initialized yet');
		return;
	}

    paypalInst.tokenize({
        flow: 'checkout', // Required
        amount: amount, // Required
        currency: 'CAD', // Required
        locale: 'en_US'
    }, function (err, tokenizationPayload) {
        // Tokenization complete
        // Send tokenizationPayload.nonce to server
		if(err){
			cb(err);
		} else {
			console.log("token_payload:" +tokenizationPayload)
			Meteor.call('paypal.pay', amount, email, doctor_paypal, tokenizationPayload, cb);
		}
    });
}

// $(function(){
//     $(document).on("click", "#update_paypal_account_button", function(event){
//         if ($('[name=paypal_email]').val() !== "") {
//             Meteor.call('update_paypal_email', $('#paypal_email').val(), function (err, res) {
//                 $('#paypal_account_modal_id').modal('hide');
//                 $('[name=paypal_email]').val('');
//                 swal({
//                     title: 'Paypal Email Updated',
//                     type: 'success',
//                     confirmButtonClass: "btn btn-success",
//                     buttonsStyling: false
//                 });
//             })
//         } else {
//             $('#paypal_email').val('');
//             swal({
//                 title: 'Please Enter Paypal Email Address',
//                 type: 'error',
//                 confirmButtonClass: "btn btn-success",
//                 buttonsStyling: false
//             });
//         }
//     });
// });