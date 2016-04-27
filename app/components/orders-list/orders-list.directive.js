angular.module('st.components.orders-list', [
    'st.components.orders-per-customer',
    'mongolab-factory'
]).directive('ordersList', function (mongolabOrders,mongolabCustomers) {
    return {
        templateUrl: 'app/components/orders-list/orders-list.html',
        scope:{
            customer: '='
        },
        link:function($scope) {
            $scope.orders = mongolabOrders.query();
            $scope.customers = mongolabCustomers.query();
        }
    };
});
