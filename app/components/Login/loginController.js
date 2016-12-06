(function () {
    'use strict';

    angular
        .module('GradeBook')
        .controller('loginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'UserService', '$state', '$scope', '$window'];
    function LoginController($location, AuthenticationService, FlashService, UserService, $state, $scope, $window) {
        var vm = this;

        vm.login = login;

        function initController() {
            // reset login status
            UserService.ClearCredentials();
        };
            
        function login() {
            vm.dataLoading = true;

            console.log(vm.user);


            UserService.Login(vm.user)
                .then(function (response) {
                    if (response == null) {
                        $scope.error = "shit";
                        console.log("error" + $scope.error);
                    }
                    else if (response.status == 200) {
                        UserService.SetCredentials(vm.user.username, vm.user.password);
                        $state.go('root.home');
                    } else {
                        console.log(response);
                        console.log(response.data.msg);
                        FlashService.Error(response.message);
                        //if (response.error = 'Email') {
                        //    $scope.error = "shit";
                        //    console.log("error" + error);
                        //    vm.validEmail = false;
                        //    vm.emailMessage = response.message;
                        //}
                        //else if (response.error = 'Password;') {
                        //    vm.validPassword = false;
                        //    vm.passwordMessage = response.message;
                        //}
                        $scope.error = "shit";
                        console.log("error" + error);
                        vm.dataLoading = false;
                    }
            });
        };

        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        };

        vm.useWithoutAccount = function() {
            vm.dataLoading = true;
            vm.unknown = {};
            vm.unknown.id = randomString(12, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            vm.unknown.name = "Guest";

            do {
                var duplicate = true;
            }while (duplicate == 'true') {
                UserService.GetById(vm.unknown.id)
                .then(function (response) {
                    console.log(response);
                    if (response.data.length != 0) {
                        vm.duplicateId = true;
                        console.log(vm.duplicateId);
                    }
                    else {
                        vm.duplicateId = false;
                        console.log(vm.duplicateId);
                        vm.unknown.password = randomString(12, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                        UserService.Create(vm.unknown)
                                        .then(function (response) {
                                            if (response.status == 200) {
                                                FlashService.Success('Registration successful', true);
                                                $location.path('/login');
                                            } else {
                                                FlashService.Error(response.message);
                                                vm.dataLoading = false;
                                            }
                                        });
                        duplicate = false;
                        UserService.SetCredentials(vm.unknown.id, vm.unknown.password);
                        $state.go('login');
                        $state.reload('login');
                        $window.location.reload();
                    }
                })
            }

        };

        


    }

})();