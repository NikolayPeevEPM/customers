describe ('st.components.new-order', function() {

    beforeEach(function() {
        module('st.components.new-order');
        module(function ($provide) {
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
                    save: function(){}
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
        scope = angular.extend($rootScope.$new());
        element = $compile('<new-order></new-order>')(scope);
        scope.$digest();
        isolatedScope  = element.isolateScope();

    }));

    it('should initialize', function(){
        expect(isolatedScope.customers).toBeDefined();
    });

    it('saveOrder to be defined', function(){
        expect(isolatedScope.saveOrder).toBeDefined();
    });

    it('saveOrder to save', function(){
        spyOn(mongolabOrders, 'save').and.returnValue({$promise:{then:function(cb){
            cb();
        }}});
        isolatedScope.customer = {_id:{$oid:5}};
        isolatedScope.saveOrder();
        expect(mongolabOrders.save).toHaveBeenCalled();
    });

    it('saveOrder to change location', function(){
        spyOn($location,'path');
        spyOn(mongolabOrders, 'save').and.returnValue({$promise:{then:function(cb){
            cb();
        }}});
        isolatedScope.customer = {_id:{$oid:5}};
        isolatedScope.saveOrder();
        expect($location.path).toHaveBeenCalled();
    });
});
