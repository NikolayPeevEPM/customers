describe ('st.components.edit-order', function() {

    beforeEach(function() {
        module('st.components.edit-order');
        module(function ($provide) {
            $provide.factory('$routeParams',function() {
                return {
                    id: 5
                }
            });
            $provide.factory('$location',function() {
                return {
                    path: function(){}
                }
            });
            $provide.factory('mongolabCustomers',function() {
                return {
                    query: function(){}
                }
            });
            $provide.factory('mongolabOrders',function() {
                return {
                    query: function(){},
                    update: function(){}
                }
            });
        });
    });

    var isolatedScope, element, scope, $location, mongolabCustomers, mongolabOrders;
    beforeEach(inject(function($compile, $rootScope,_mongolabCustomers_,_mongolabOrders_,_$location_){
        mongolabCustomers = _mongolabCustomers_;
        $location = _$location_;
        mongolabOrders = _mongolabOrders_;
        spyOn(mongolabCustomers, 'query').and.returnValue({$promise:{then:function(cb){
            cb(['test customer']);
        }}});
        spyOn(mongolabOrders, 'query').and.returnValue({$promise:{then:function(cb){
            cb([{_id:{$oid:5}}]);
        }}});
        scope = angular.extend($rootScope.$new());
        element = $compile('<edit-order></edit-order>')(scope);
        scope.$digest();
        isolatedScope  = element.isolateScope();

    }));

    it('should initialize', function(){
        expect(isolatedScope.customers).toBeDefined();
        expect(isolatedScope.order).toBeDefined();
    });

    it('saveOrder to be defined', function(){
        expect(isolatedScope.saveOrder).toBeDefined();
    });

    it('saveOrder to update', function(){
        spyOn(mongolabOrders, 'update').and.returnValue({$promise:{then:function(cb){
            cb();
        }}});
        isolatedScope.customer = {_id:{$oid:5}};
        isolatedScope.saveOrder();
        expect(mongolabOrders.update).toHaveBeenCalled();
    });

    it('saveOrder to change location', function(){
        spyOn($location,'path');
        spyOn(mongolabOrders, 'update').and.returnValue({$promise:{then:function(cb){
            cb();
        }}});
        isolatedScope.customer = {_id:{$oid:5}};
        isolatedScope.saveOrder();
        expect($location.path).toHaveBeenCalled();
    });
});
