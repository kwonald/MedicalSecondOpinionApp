Router.route('/dashboard', {
    name: 'dashboard',
    template: 'dashboard',
    title: 'Dashboard',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $("#top-nav").remove();
            $('html').removeClass('nav-open');
        });
    },
    onBeforeAction:function(){
        if (Roles.userIsInRole(Meteor.userId(),["doctor","patient","admin","healthOrgAdmin", "employerAdmin"])) {
            this.next();
        } else {
            Router.go('/profile');
        }
    }
});

Router.route('/calendar', {
    name: 'calendar',
    template: 'calendar',
    title: 'Set Availability',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.initFullCalendar();
            porton.initFormExtendedDatetimepickers();
        });
    },
    onBeforeAction:function(){
        if (Roles.userIsInRole(Meteor.userId(),["doctor"])) {
            this.next();
        } else {
            Router.go('/profile');
        }
    }
});

Router.route('/requests', {
    name: 'requests',
    template: 'requests',
    title: 'My Requests',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            $('#datatables').DataTable({
                destroy: true,
                "pagingType": "full_numbers",
                "lengthMenu": [
                    [10, 25, 50, -1],
                    [10, 25, 50, "All"]
                ],
                responsive: true,
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search records",
                }
            });

            var table = $('#datatables').DataTable();

            // Edit record
            table.on('click', '.edit', function() {
                $tr = $(this).closest('tr');

                var data = table.row($tr).data();
                alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
            });

            // Delete a record
            table.on('click', '.remove', function(e) {
                $tr = $(this).closest('tr');
                table.row($tr).remove().draw();
                e.preventDefault();
            });

            //Like record
            table.on('click', '.like', function() {
                alert('You clicked on Like button');
            });

            $('.card .material-datatables label').addClass('form-group');
        });
    },
    onBeforeAction:function(){
        if (Roles.userIsInRole(Meteor.userId(),["doctor","patient"])) {
            this.next();
        } else {
             Router.go('/profile');
        }
    }
});

Router.route('/report', {
    name: 'report',
    template: 'report',
    title: 'Request Second Opinion Report',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $("#top-nav").remove();
            $('html').removeClass('nav-open');
        });
    }
});

Router.route('/history', {
    name: 'history',
    template: 'history',
    title: 'History',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.initFormExtendedDatetimepickers();
            $('#datatables').DataTable({
                destroy: true,
                "pagingType": "full_numbers",
                "lengthMenu": [
                    [10, 25, 50, -1],
                    [10, 25, 50, "All"]
                ],
                responsive: true,
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search records",
                }
            });

            var table = $('#datatables').DataTable();

            // Edit record
            table.on('click', '.edit', function() {
                $tr = $(this).closest('tr');

                var data = table.row($tr).data();
                alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
            });

            // Delete a record
            table.on('click', '.remove', function(e) {
                $tr = $(this).closest('tr');
                table.row($tr).remove().draw();
                e.preventDefault();
            });

            //Like record
            table.on('click', '.like', function() {
                alert('You clicked on Like button');
            });

            $('.card .material-datatables label').addClass('form-group');
        });
    },
    onBeforeAction:function(){
      if (Roles.userIsInRole(Meteor.userId(),["doctor","patient"])) {
            this.next();
        } else {
             Router.go('/profile');
        }
    }
});

Router.route('/search', {
    name: 'search',
    template: 'search',
    title: 'Request Consult',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.initFormExtendedDatetimepickers();
            $('#datatables').DataTable({
                destroy: true,
                "pagingType": "full_numbers",
                "lengthMenu": [
                    [10, 25, 50, -1],
                    [10, 25, 50, "All"]
                ],
                responsive: true,
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search records",
                }
            });

            var table = $('#datatables').DataTable();

            // Edit record
            table.on('click', '.edit', function() {
                $tr = $(this).closest('tr');

                var data = table.row($tr).data();
                alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
            });

            // Delete a record
            table.on('click', '.remove', function(e) {
                $tr = $(this).closest('tr');
                table.row($tr).remove().draw();
                e.preventDefault();
            });

            //Like record
            table.on('click', '.like', function() {
                alert('You clicked on Like button');
            });

            $('.card .material-datatables label').addClass('form-group');
        });
    },
    onBeforeAction:function(){
        if (Roles.userIsInRole(Meteor.userId(),["doctor","patient"])) {
            this.next();
        } else {
             Router.go('/profile');
        }
    }

});

Router.route('/profile', {
    name: 'profile',
    template: 'profile',
    title: 'My Profile',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.initFormExtendedDatetimepickers();
        });
    },
    onBeforeAction:function(){
        if (Meteor.userId()) {
            this.next();
        } else {
           this.render('home');
        }
    },
    waitOn:function(){
        return Meteor.subscribe('doctorprofile') && Meteor.subscribe('patientprofile') && Meteor.subscribe('adminid');
    }
});

Router.route('/session', {
    name: 'session',
    template: 'session',
    title: 'Live Session',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
            d = new Date();
            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0, 0);
            setInterval(function () {
                document.getElementById("h").innerHTML = d.getHours();
                document.getElementById("m").innerHTML = d.getMinutes();
                document.getElementById("s").innerHTML = d.getSeconds();
                d.setTime(d.getTime() + 500);
            }, 1000);
            $("#page_lock").hide();
            $("#btn_lock").click(function(){
                $("#page_unlock").hide();
                $("#page_lock").show();
                porton.checkFullPageBackgroundImage();
                setTimeout(function() {
                    // after 1000 ms we add the class animated to the login/register card
                    $('.card').removeClass('card-hidden');
                }, 700)
            });

            $("#btn_unlock").click(function(){
                $("#page_unlock").show();
                $("#page_lock").hide();
            });
        });
    }
});

Router.route('/demo', {
    name: 'demo',
    template: 'demo',
    title: 'Demo Session',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
            d = new Date();
            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0, 0);
            setInterval(function () {
                document.getElementById("h").innerHTML = d.getHours();
                document.getElementById("m").innerHTML = d.getMinutes();
                document.getElementById("s").innerHTML = d.getSeconds();
                d.setTime(d.getTime() + 500);
            }, 1000);
            $("#page_lock").hide();
            $("#btn_lock").click(function(){
                $("#page_unlock").hide();
                $("#page_lock").show();
                porton.checkFullPageBackgroundImage();
                setTimeout(function() {
                    // after 1000 ms we add the class animated to the login/register card
                    $('.card').removeClass('card-hidden');
                }, 700)
            });

            $("#btn_unlock").click(function(){
                $("#page_unlock").show();
                $("#page_lock").hide();
            });
        });
    }
});

