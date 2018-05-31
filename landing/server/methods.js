// Required to send the contact form of the landing page to our admin account email
import { Email } from 'meteor/email'

Meteor.methods({
    // Server: Define a method that the client can call.
    sendEmail(to, from, subject, text) {
        // Make sure that all arguments are strings.
        check([to, from, subject, text], [String]);
        // Let other method calls from the same client start running, without
        // waiting for the email sending to complete.
        this.unblock();
        Email.send({ to, from, subject, text });
    },

    'create_employerAdmin':function(email,password){
        let userId = Accounts.createUser({
            username: email,
            password: password
            // organization: orgName,
            // address: address,
            // url: url,
            // description: desc,
            // role: role
        });
        Roles.addUsersToRoles(userId,"employerAdmin");

        //update employer to add these fields
        // orgName, address, url, desc, role

    },

    'create_organizationAdmin':function(email,password){
        let userId = Accounts.createUser({
            username: email,
            password: password
        });
        Roles.addUsersToRoles(userId,"healthOrgAdmin");

        // update health org to add the rest of the params into DB

    },


    'create_patient':function(email,password){
        let userId = Accounts.createUser({
            email:email,
            password:password
        });
        Roles.addUsersToRoles(userId,"patient");

    },
    'create_doctor':function(email,password){
        let userId = Accounts.createUser({
            email:email,
            password:password
        });
        Roles.addUsersToRoles(userId,"onhold");
        let admin = Meteor.users.findOne({roles:"admin"})._id;

        // only admin status can approve this doctor's pending status.
        Requests.insert({doctor_id:userId,to:admin});
    },

    'update_doctor_profile':function(contact_name,salutation,other_salutation,doctor_board_certified,doctor_certified_year,doctor_license_location,phone,time_to_contact,able_to_work,country,specialty_1, specialty_2, specialty_3, specialty_other, subspecialty_1,subspecialty_2,subspecialty_3,subspecialty_other, residency,fellowship,awards,comments){
        Meteor.users.update({_id:this.userId},{
            $set:{
                salutation:salutation,
                other_salutation:other_salutation,
                contact_name:contact_name,
                doctor_board_certified:doctor_board_certified,
                doctor_certified_year:doctor_certified_year,
                doctor_license_location:doctor_license_location,
                phone:phone,
                time_to_contact:time_to_contact,
                able_to_work:able_to_work,
                country:country,
                specialty_1:specialty_1,
                specialty_2:specialty_2,
                specialty_3:specialty_3,
                specialty_other:specialty_other,
                subspecialty_1:subspecialty_1,
                subspecialty_2:subspecialty_2,
                subspecialty_3:subspecialty_3,
                subspecialty_other:subspecialty_other,
                residency:residency,
                fellowship:fellowship,
                awards:awards,
                comments:comments
            }
        });
    },

    'update_patient_profile':function(firstname,lastname,birthdate,gender, phone, email, height,weight, blood,allergy,fhistory){
        Meteor.users.update({_id:this.userId},{
            $set:{
                firstname:firstname,
                lastname:lastname,
                birthdate:birthdate,
                gender:gender,
                phone:phone,
                email:email,
                height:height,
                weight:weight,
                blood:blood,
                allergy:allergy,
                fhistory:fhistory
            }
        });
    },
    'get_user_id': function (email) {
        return Meteor.users.findOne({email:email});
    },
    'update_paypal_email': function (paypalemail) {
        Meteor.users.update({_id: this.userId}, {$set: {paypalemail: paypalemail}});
        Doctors.update({doctor_id: this.userId},{$set:{"profile.paypalemail":paypalemail}})
        return true;
    }
});

Meteor.startup(function () {
    smtp = {
        username: 'support@portonhealth.com',   // eg: server@gentlenode.com
        password: 'Portonrules@support123',   // eg: 3eeP1gtizk5eziohfervU
        server:   'mail.portonhealth.com',  // eg: mail.gandi.net
        port: 465
    }

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
    Accounts.emailTemplates.siteName = 'Porton Health';
    Accounts.emailTemplates.from = 'Porton Health <support@portonhealth.com>';
    Accounts.emailTemplates.resetPassword.subject = function(user) {
        return 'Password Recovery on Porton';
    };
    Accounts.emailTemplates.resetPassword.html = function(user, url) {
        console.log(url);
        console.log(user);
        // return '<div style="text-align: center"><img src="http://www.caltech.edu/sites/all/modules/custom/caltech_social_media/icons/coursera.png"></div>'+'<p>Hello World</p>'
        return '<p>Hi '+ user.contact_name +',</p>'
            + '<p>You recently requested to reset your password for your Porton Health account. You can click the link below to reset it:</p> '
            + '<a href="'+url+'">Click Here to Reset Password</a>' +'<p>If you did not request a password reset, please ignore this email. Thank you.</p>'+ '<p>Porton Health Team</p>';
    };
})
