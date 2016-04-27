angular.module('st.components.new-order', [
    'mongolab-factory'
]).directive('newOrder', function (mongolabOrders, mongolabCustomers, $location) {
    return {
        templateUrl: 'app/components/new-order/new-order.html',
        scope:{},
        link:function($scope){
            $scope.customers = mongolabCustomers.query();
            $scope.saveOrder = function(){
                mongolabOrders.save($scope.order).$promise.then(function(){
                    $location.path('/orders');
                });
            }
        }
    };
});
