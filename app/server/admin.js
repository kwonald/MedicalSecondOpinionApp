Meteor.startup(function () {
    console.log('Server started');

    // #Users and Permissions -> -> Creating the admin user
    if (Meteor.users.find().count() === 0) {

        console.log('Created Admin user');

        var userId = Accounts.createUser({
            username: 'admin',
            password: 'portonrules!123'
        });
        Roles.addUsersToRoles(userId,"admin");

        console.log('Created Second Admin user');

        var userId = Accounts.createUser({
            username: 'admin2',
            password: 'portonrules!123'
        });
        Roles.addUsersToRoles(userId,"admin");

         console.log('Created HealthOrg Admin user');

        var userId = Accounts.createUser({
            username: 'hadmin',
            password: 'portonrules!123'
        });
        Roles.addUsersToRoles(userId,"healthOrgAdmin");

        console.log('Created Employer Admin user');

        var userId = Accounts.createUser({
            username: 'eadmin',
            password: 'portonrules!123'
        });
        Roles.addUsersToRoles(userId,"employerAdmin");

        
        console.log('Created Patient1@portonhealth.com');
        var userId = Accounts.createUser({
            email: 'Patient1@portonhealth.com',
            password: 'P12345'
        });
        Roles.addUsersToRoles(userId,"patient");

        console.log('Created Patient2@portonhealth.com');
        var userId = Accounts.createUser({
            email: 'Patient2@portonhealth.com',
            password: 'P12345'
        });
        Roles.addUsersToRoles(userId,"patient");

        
        console.log('Created Doctor1@portonhealth.com');
        var userId = Accounts.createUser({
            email: 'Doctor1@portonhealth.com',
            password:'D12345'
        });
        Roles.addUsersToRoles(userId,"doctor");
        Meteor.users.update({_id:userId},{
            $set:{
                contact_name: 'Doctor One',
                country: 'Nigeria'
            }
        });

        console.log('Created Doctor2@portonhealth.com');
        var userId = Accounts.createUser({
            email: 'Doctor2@portonhealth.com',
            password:'D12345'
        });
        Roles.addUsersToRoles(userId,"doctor");
        
        Meteor.users.update({_id:userId},{
            $set:{
                contact_name: 'Doctor Two',
                country: 'Canada'
            }
        });
    

    }
});