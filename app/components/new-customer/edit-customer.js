angular.module('st.components.edit-customer', [
    'mongolab-factory'
]).directive('editCustomer', function (mongolabCustomers, $location, $routeParams) {
    return {
        templateUrl: 'app/components/new-customer/new-customer.html',
        scope:{},
        controller:function($scope){
            mongolabCustomers.query({q:{_id:{$oid:$routeParams.id}}}).$promise.then(function(data){
                $scope.customer = data[0];
            });

            $scope.saveCustomer = function(){
                mongolabCustomers.update({id:$scope.customer._id.$oid},$scope.customer).$promise.then(function(){
                    $location.path('/customers');
                });
            }
        }
    };
});
