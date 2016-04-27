angular.module('st.components.edit-order', [
    'mongolab-factory'
]).directive('editOrder', function (mongolabCustomers, mongolabOrders, $location, $routeParams) {
    return {
        templateUrl: 'app/components/new-order/new-order.html',
        scope:{},
        controller:function($scope){
            $scope.customers = mongolabCustomers.query();

            mongolabOrders.query({q:{_id:{$oid:$routeParams.id}}}).$promise.then(function(data){
                $scope.order = data[0];
            });

            $scope.saveOrder = function(){
                mongolabOrders.update({id:$scope.order._id.$oid},$scope.order).$promise.then(function(){
                    $location.path('/orders');
                });
            }
        }
    };
});
