angular.module('sofia-training', [
    'ngRoute',
    'mongolab-factory',
    'st.components.top-navigation',
    'st.components.customer-view',
    'st.components.customers-list',
    'st.components.new-customer',
    'st.components.edit-order',
    'st.components.orders-list',
    'st.components.new-order'
]).config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/orders', {
            template: '<orders-list></orders-list>'
        }).when('/orders/new', {
                template: '<new-order></new-order>'
        }).when('/orders/edit/:id', {
            template: '<edit-order></edit-order>'
        }).when('/customers', {
            template: '<customers-list></customers-list>'
        }).when('/customers/new', {
            template: '<new-customer></new-customer>'
        }).when('/customers/edit/:id', {
            template: '<edit-customer></edit-customer>'
        }).when('/customers/:id', {
            template: '<customer-view></customer-view>'
        }).otherwise({
            redirectTo: '/customers'
        })
}]);

angular.module('sofiaTraining.templates', []);
try {
    angular.module('sofiaTraining.templates');
} catch ( error ) {
    angular.module('sofiaTraining.templates', []).constant('sofiaTrainingVersion', null);
}
