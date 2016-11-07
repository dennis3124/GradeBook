//http://jasonwatmore.com/post/2015/03/10/angularjs-user-registration-and-login-example-tutorial#app

(function () {
    'use strict';

    angular
        .module('GradeBook')
        .controller('registerController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService', '$state'];
    function RegisterController(UserService, $location, $rootScope, FlashService, $state) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            vm.user.name = vm.user.firstName + " " + vm.user.lastName;
            console.log(vm.user);
            UserService.GetById(vm.user.id)
                .then(function (response) {
                    console.log(response);
                    if (response.data.length != 0) {
                        vm.duplicateId = true;
                        console.log(vm.duplicateId);
                    }
                    else {
                        vm.duplicateId = false;
                        console.log(vm.duplicateId);
                        UserService.Create(vm.user)
                                        .then(function (response) {
                                            if (response.status == 200) {
                                                FlashService.Success('Registration successful', true);
                                                $location.path('/login');
                                            } else {
                                                FlashService.Error(response.message);
                                                vm.dataLoading = false;
                                            }
                                        });
                        $state.go('login');
                    }
                })

            
        }
    }

})();