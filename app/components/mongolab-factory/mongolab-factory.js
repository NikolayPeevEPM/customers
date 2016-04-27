angular.module('mongolab-factory', [
    'ngResource'
]).provider('mongolabCustomers', function (mongolabConfigs) {

    this.$get = function ($resource) {
        var c = mongolabConfigs;
        var url = [c.mongolabUrl, c.dataBase, 'collections','customers', ':id'].join('/');
        return $resource(url, {apiKey: c.apiKey}, {
            update: {method: 'PUT'}
        });
    };

}).provider('mongolabOrders', function (mongolabConfigs) {

    this.$get = function ($resource) {
        var c = mongolabConfigs;
        var url = [c.mongolabUrl, c.dataBase, 'collections','orders', ':id'].join('/');
        return $resource(url, {apiKey: c.apiKey}, {
            update: {method: 'PUT'}
        });
    };

}).constant('mongolabConfigs',  {
    mongolabUrl: 'https://api.mlab.com/api/1/databases',
    dataBase: 'customers-training',
    apiKey: '394dPk_y50KO8osDwbWD3fl_fuhT4EdM'
});


