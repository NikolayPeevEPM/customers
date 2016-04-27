angular.module('st.components.orders-per-customer', [
    'mongolab-factory'
]).directive('ordersPerCustomer', function (mongolabOrders) {
    return {
        templateUrl: 'app/components/orders-per-customer/orders-per-customer.html',
        scope: {
            'customer': '=',
            'orders': '='
        },
        controllerAs: 'orderPerCustomerController',
        controller: function ($scope) {
            this.total = 0;

            this.calcTotal = function () {
                this.total = $scope.orders.filter(function(order){
                    return order.customerID === $scope.customer;
                }).reduce(function (total,order) {
                     return total + order.unitPrice * order.quantity
                }, 0);
            };

            $scope.$watch('orders', this.calcTotal.bind(this),true);
            $scope.$watch('customer', this.calcTotal.bind(this));

            $scope.deleteOrder = function (order) {
                mongolabOrders.remove({id: order._id.$oid});
                $scope.orders.splice($scope.orders.indexOf(order), 1);
                $scope.orderPerCustomerController.calcTotal();

            }
        }
    };
});
