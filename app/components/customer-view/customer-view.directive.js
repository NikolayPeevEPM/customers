angular.module('st.components.customer-view', [
    'st.components.customer-view',
    'mongolab-factory'
]).directive('customerView', function (mongolabOrders,mongolabCustomers, $routeParams) {
    return {
        templateUrl: 'app/components/customer-view/customer-view.html',
        scope:{},
        link:function($scope) {
            $scope.orders = mongolabOrders.query();
            mongolabCustomers.query({q:{_id:{$oid:$routeParams.id}}}).$promise.then(function(data){
                $scope.customer = data[0];
            });
        }
    };
});
