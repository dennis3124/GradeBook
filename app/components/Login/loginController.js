(function () {
    'use strict';

    angular
        .module('GradeBook')
        .controller('loginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'UserService', '$state', '$scope'];
    function LoginController($location, AuthenticationService, FlashService, UserService, $state, $scope) {
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


    }

})();