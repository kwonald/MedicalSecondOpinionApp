var braintree = require('braintree');
var paypal = require('paypal-rest-sdk');

var clientToken, gateway;
Meteor.startup(function () {
    gateway = braintree.connect({
        accessToken: 'access_token$sandbox$sy7tj6bp2zpddb83$a4737126d32be762114854325947e424'
    });
    gateway.clientToken.generate({}, function (err, response) {
        clientToken = response.clientToken;
    });

    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'AX8YVgGyqKyVQncsKb1quv8UFHTebSO8yGxbU-oS-yRa4UfPNt9YM9baIGtdzOrRdmBEdmJK5-M7Kpqd',
        'client_secret': 'EOSBnJFT11ROkys8tbvjpRYVn69IB4uNw382dmrK9hlH5lZOi0FIzd-_eNwrtHufvwAz1SnBfkTYgC2G'
    });
});

Meteor.methods({
    'paypal.clientToken' : function() {
      return clientToken;
    },
    'paypal.pay' : function(amount, email, doctor_paypal, payload) {
        var saleRequest = {
            amount: amount,
            merchantAccountId: 'CAD',
            paymentMethodNonce: payload.nonce,
            orderId: Meteor.uuid()
        };
        let syncPay = Meteor.wrapAsync(asyncPay);
        let result = syncPay(saleRequest);
        if (result.success) {
            console.log("Pay Success! Transaction ID: " + result.transaction.id);
        } else {
            console.log("Error:  " + result.message);
            throw new Error(result.message);
        }

        let syncTrans = Meteor.wrapAsync(asyncTransfer);
        let to_doc_amt = 0.75 * amount;
        let to_porton = 0.15 * amount;
        let payout = syncTrans(to_porton, email, to_doc_amt, doctor_paypal);
        // let payout = syncTrans(to_doc_amt, doctor_paypal);
        console.log("Create Payout Response");
        console.log(payout);
    },
    // 'test' : function () {
    //     var payoutId = "L7PB76JMFF9XE";
    //
    //     paypal.payout.get(payoutId, function (error, payout) {
    //         if (error) {
    //             console.log(error);
    //             throw error;
    //         } else {
    //             console.log("Get Payout Response");
    //             console.log(JSON.stringify(payout));
    //         }
    //     });
    // }
});


function asyncPay(r, c) {
    gateway.transaction.sale(r, c);
}

function asyncTransfer(p_amt, email, d_amt, d_email, c) {
    var sender_batch_id = Math.random().toString(36).substring(9);
    var create_payout_json = {
        "sender_batch_header": {
            "sender_batch_id": sender_batch_id,
            "email_subject": "You have a payment from Porton Customer !"
        },
        "items": [
            {
                "recipient_type": "EMAIL",
                "amount": {
                    "value": p_amt,
                    "currency": "CAD"
                },
                "receiver": email,
                "note": "Thank you.",
                "sender_item_id": Math.random().toString(36).substring(9)
            },
            {
                "recipient_type": "EMAIL",
                "amount": {
                    "value": d_amt,
                    "currency": "CAD"
                },
                "receiver": d_email,
                "note": "Thank you.",
                "sender_item_id": Math.random().toString(36).substring(9)
            }
        ]
    };
    paypal.payout.create(create_payout_json, c);
}