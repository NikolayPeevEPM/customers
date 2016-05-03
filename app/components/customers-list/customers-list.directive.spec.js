describe ('st.components.customers-list', function() {

    beforeEach(function() {
        module('st.components.customers-list');
        module(function ($provide) {
            $provide.factory('mongolabOrders',function() {
                return {
                    query: function(){},
                    remove: function(){}
                }
            });
            $provide.factory('mongolabCustomers',function() {
                return {
                    query: function(){},
                    remove: function(){}
                }
            });
        });
    });

    var isolatedScope, element, scope, mongolabOrders, mongolabCustomers;
    beforeEach(inject(function($compile, $rootScope,_mongolabOrders_,_mongolabCustomers_){
        mongolabOrders = _mongolabOrders_;
        mongolabCustomers = _mongolabCustomers_;
        spyOn(mongolabOrders, 'query').and.returnValue([{customerID:5, _id:{$oid:5}}]);
        spyOn(mongolabCustomers, 'query').and.returnValue([{_id:{$oid:5}},{_id:{$oid:6}}]);

        scope = angular.extend($rootScope.$new());
        element = $compile('<customers-list></customers-list>')(scope);
        scope.$digest();
        isolatedScope  = element.isolateScope();

    }));

    it('should initialize', function(){
        expect(isolatedScope.customers).toBeDefined();
        expect(isolatedScope.orders).toBeDefined();
    });

    it('deleteCustomer to be defined', function(){
        expect(isolatedScope.deleteCustomer).toBeDefined();
    });

    it('deleteCustomer to call the APIs', function(){
        spyOn(mongolabCustomers, 'remove').and.returnValue({$promise:{then:function(cb){
            cb();
        }}});
        spyOn(mongolabOrders, 'remove');
        isolatedScope.deleteCustomer({_id:{$oid:5}});
        expect(mongolabCustomers.remove).toHaveBeenCalled();
        expect(mongolabOrders.remove).toHaveBeenCalled();
    });

});
