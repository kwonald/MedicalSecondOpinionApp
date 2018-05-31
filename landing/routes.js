Router.route('/', {
    name: 'home',
    template: 'home',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
            setTimeout(function() {
                $('.card').removeClass('card-hidden');
            }, 700)
        });
    }
});

Router.route('/search_results', {
    name: 'search_results',
    template: 'search_results',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
        });
    }
});

Router.route('/faq', {
    name: 'faq',
    template: 'faq',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
        });
    }
});

Router.route('/about', {
    name: 'about',
    template: 'about',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
        });
    }
});

Router.route('/careers', {
    name: 'careers',
    template: 'careers',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
        });
    }
});

Router.route('/investor_relations', {
    name: 'investor_relations',
    template: 'investor_relations',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
        });
    }
});

Router.route('/general_practice', {
    name: 'general_practice',
    template: 'general_practice',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
        });
    }
});

Router.route('/specialist_services', {
    name: 'specialist_services',
    template: 'specialist_services',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
        });
    }
});

Router.route('/second_opinion', {
    name: 'second_opinion',
    template: 'second_opinion',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
        });
    }
});

Router.route('/health_programs', {
    name: 'health_programs',
    template: 'health_programs',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
        });
    }
});

Router.route('/medical_organizations', {
    name: 'medical_organizations',
    template: 'medical_organizations',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
        });
    }
});

Router.route('/terms_and_conditions', {
    name: 'terms_and_conditions',
    template: 'terms_and_conditions',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
        });
    }
});

Router.route('/privacy', {
    name: 'privacy',
    template: 'privacy',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
        });
    }
});

Router.route('/hipaa_compliance', {
    name: 'hipaa_compliance',
    template: 'hipaa_compliance',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
        });
    }
});

Router.route('/register', {
    name: 'register',
    template: 'register',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
            porton.initMaterialWizard();
        });
    }
});


Router.route('/login', {
    name: 'login',
    template: 'login',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
            porton.initMaterialWizard();
        });
    }
});

Router.route('/forget_password', {
    name: 'forget_password',
    template: 'forget_password',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
            porton.initMaterialWizard();
        });
    }
});

Router.route('/under_construction', {
    name: 'under_construction',
    template: 'under_construction',
    data: function(){
        this.layout('mainlayout');
        $().ready(function() {
            $('html').removeClass('nav-open');
            porton.checkFullPageBackgroundImage();
        });
    }
});
