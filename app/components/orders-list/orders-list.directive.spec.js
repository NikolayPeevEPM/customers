describe ('st.components.orders-list', function() {

    beforeEach(function() {
        module('st.components.orders-list');
        module(function ($provide) {
            $provide.factory('mongolabOrders',function() {
                return {
                    query: function(){}
                }
            });
            $provide.factory('mongolabCustomers',function() {
                return {
                    query: function(){}
                }
            });
            $provide.factory('ordersPerCustomerDirective', function(){ return {}; });
        });
    });

    var isolatedScope, element, scope, mongolabOrders, mongolabCustomers;
    beforeEach(inject(function($compile, $rootScope,_mongolabOrders_,_mongolabCustomers_){
        mongolabOrders = _mongolabOrders_;
        mongolabCustomers = _mongolabCustomers_;
        spyOn(mongolabOrders, 'query').and.returnValue([{customerID:5, _id:{$oid:5}}]);
        spyOn(mongolabCustomers, 'query').and.returnValue([{_id:{$oid:5}},{_id:{$oid:6}}]);

        scope = angular.extend($rootScope.$new());
        element = $compile('<orders-list></orders-list>')(scope);
        scope.$digest();
        isolatedScope  = element.isolateScope();

    }));

    it('should initialize', function(){
        expect(isolatedScope.customers).toBeDefined();
        expect(isolatedScope.orders).toBeDefined();
    });

});
