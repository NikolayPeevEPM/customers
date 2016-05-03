describe ('st.components.customer-view', function() {

    beforeEach(function() {
        module('st.components.customer-view');
        module(function ($provide) {
            $provide.factory('$routeParams',function() {
                return {
                    id: 5
                }
            });
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
        });
    });

    var isolatedScope, element, scope, mongolabOrders, mongolabCustomers;
    beforeEach(inject(function($compile, $rootScope,_mongolabOrders_,_mongolabCustomers_){
        mongolabOrders = _mongolabOrders_;
        mongolabCustomers = _mongolabCustomers_;
        spyOn(mongolabOrders, 'query').and.returnValue({});
        spyOn(mongolabCustomers, 'query').and.returnValue({$promise:{then:function(cb){
            cb(['test customer']);
        }}});

        scope = angular.extend($rootScope.$new());
        element = $compile('<customer-view></customer-view>')(scope);
        scope.$digest();
        isolatedScope  = element.isolateScope();

    }));

    it('should initialize', function(){
        expect(isolatedScope.customer).toEqual('test customer');
    });


});

