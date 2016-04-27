angular.module('st.components.new-customer', [
    'mongolab-factory'
]).directive('newCustomer', function (mongolabCustomers, $location) {
    return {
        templateUrl: 'app/components/new-customer/new-customer.html',
        scope:{},
        link:function($scope){
            
            $scope.saveCustomer = function(){
                mongolabCustomers.save($scope.customer).$promise.then(function(){
                    $location.path('/customers');
                });
            }
        }
    };
});
