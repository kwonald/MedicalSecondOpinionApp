Template.mainlayout.rendered = function() {
    $('body').append(
        '<script src="/js/material.min.js"></script>',
        '<script src="/js/moment.min.js"></script>',
        '<script src="/js/fullcalendar.js"></script>',
        '<script src="/js/datatables.js"></script>',
        '<script src="/js/material-dashboard.js"></script>',
        '<script src="/js/vertical-nav.js"></script>',
        '<script src="/js/porton.js"></script>',
        '<script src="https://js.braintreegateway.com/web/3.11.1/js/client.min.js"></script>',
        '<script src="https://js.braintreegateway.com/web/3.11.1/js/paypal.min.js"></script>'
    );
};

