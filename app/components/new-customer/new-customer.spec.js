describe ('st.components.new-customer', function() {

    beforeEach(function() {
        module('st.components.new-customer');
        module(function ($provide) {
            $provide.factory('$location',function() {
                return {
                    path: function(){}
                }
            });
            $provide.factory('mongolabCustomers',function() {
                return {
                    save: function(){}
                }
            });
        });
    });

    var isolatedScope, element, scope, $location, mongolabCustomers;
    beforeEach(inject(function($compile, $rootScope,_mongolabCustomers_,_$location_){
        mongolabCustomers = _mongolabCustomers_;
        $location = _$location_;
        scope = angular.extend($rootScope.$new());
        element = $compile('<new-customer></new-customer>')(scope);
        scope.$digest();
        isolatedScope  = element.isolateScope();

    }));

    it('saveCustomer to be defined', function(){
        expect(isolatedScope.saveCustomer).toBeDefined();
    });

    it('saveCustomer to save', function(){
        spyOn(mongolabCustomers, 'save').and.returnValue({$promise:{then:function(cb){
            cb();
        }}});
        isolatedScope.customer = {_id:{$oid:5}};
        isolatedScope.saveCustomer();
        expect(mongolabCustomers.save).toHaveBeenCalled();
    });

    it('saveCustomer to change location', function(){
        spyOn($location,'path');
        spyOn(mongolabCustomers, 'save').and.returnValue({$promise:{then:function(cb){
            cb();
        }}});
        isolatedScope.customer = {_id:{$oid:5}};
        isolatedScope.saveCustomer();
        expect($location.path).toHaveBeenCalled();
    });
});
