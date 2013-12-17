define([], function () {
    "use strict";
    var dependencies = ['$scope', '$rootScope', '$location', '$modal', 'securityService', 'userResource', 'user'];
    var BillingCtrl = function ($scope, $rootScope, $location, $modal, securityService, userResource, user) {
        $scope.user = user;
        $scope.months = [
            {key: "01", label: "01"},
            {key: "02", label: "02"},
            {key: "03", label: "03"},
            {key: "04", label: "04"},
            {key: "05", label: "05"},
            {key: "06", label: "06"},
            {key: "07", label: "07"},
            {key: "08", label: "08"},
            {key: "09", label: "09"},
            {key: "10", label: "10"},
            {key: "11", label: "11"},
            {key: "12", label: "12"},
        ];
        $scope.years = [
            {key: "2013", label: "2013"},
            {key: "2014", label: "2014"},
            {key: "2015", label: "2015"},
            {key: "2016", label: "2016"},
            {key: "2017", label: "2017"},
            {key: "2018", label: "2018"},
            {key: "2019", label: "2019"},
            {key: "2020", label: "2020"},
            {key: "2021", label: "2021"},
            {key: "2022", label: "2022"},
            {key: "2023", label: "2023"},
            {key: "2024", label: "2024"}
        ];

        $scope.$watch("user.billing.same_as_profile", function (newVal, oldVal) {
            if (newVal) {
                $scope.user.billing.address1 = $scope.user.meta.address1;
                $scope.user.billing.address2 = $scope.user.meta.address2;
                $scope.user.billing.city = $scope.user.meta.city;
                $scope.user.billing.province = $scope.user.meta.province;
                $scope.user.billing.postal = $scope.user.meta.postal;
                $scope.user.billing.country = $scope.user.meta.country;
            }
        });


        // save
        $scope.save = function () {
            $scope.form.$setDirty();

            console.log('user: ', $scope.user);
            if ($scope.form.$valid) {
                userResource.updateMe($scope.user).success(function (payload) {
                    console.log("success!", payload);
                    securityService.setUser(payload);
                    $rootScope.$broadcast('success', 'Billing information has been updated successfully!');
                });
            }
        };
    }; 

    BillingCtrl.$inject = dependencies;
    BillingCtrl.resolve = {
        user: ['securityService', function (securityService) {
            return securityService.requestCurrentUser();
        }]
    };

    return BillingCtrl;
});

