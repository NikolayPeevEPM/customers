describe ('st.components.edit-customer', function() {

    beforeEach(function() {
        module('st.components.edit-customer');
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
                    query: function(){},
                    update: function(){}
                }
            });
        });
    });

    var isolatedScope, element, scope, $location, mongolabCustomers;
    beforeEach(inject(function($compile, $rootScope,_mongolabCustomers_,_$location_){
        mongolabCustomers = _mongolabCustomers_;
        $location = _$location_;
        spyOn(mongolabCustomers, 'query').and.returnValue({$promise:{then:function(cb){
            cb(['test customer']);
        }}});

        scope = angular.extend($rootScope.$new());
        element = $compile('<edit-customer></edit-customer>')(scope);
        scope.$digest();
        isolatedScope  = element.isolateScope();

    }));

    it('should initialize', function(){
        expect(isolatedScope.customer).toBeDefined();
    });

    it('saveCustomer to be defined', function(){
        expect(isolatedScope.saveCustomer).toBeDefined();
    });

    it('saveCustomer to update', function(){
        spyOn(mongolabCustomers, 'update').and.returnValue({$promise:{then:function(cb){
            cb();
        }}});
        isolatedScope.customer = {_id:{$oid:5}};
        isolatedScope.saveCustomer();
        expect(mongolabCustomers.update).toHaveBeenCalled();
    });

    it('saveCustomer to change location', function(){
        spyOn($location,'path');
        spyOn(mongolabCustomers, 'update').and.returnValue({$promise:{then:function(cb){
            cb();
        }}});
        isolatedScope.customer = {_id:{$oid:5}};
        isolatedScope.saveCustomer();
        expect($location.path).toHaveBeenCalled();
    });
});
