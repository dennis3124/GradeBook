(function () {
    'use strict';

    angular
        .module('GradeBook')
        .controller('loginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'UserService', '$state'];
    function LoginController($location, AuthenticationService, FlashService, UserService, $state) {
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
                    
                    if (response.status == 200) {
                        UserService.SetCredentials(vm.user.username, vm.user.password);
                        $state.go('root.home');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
            });
        };


    }

})();