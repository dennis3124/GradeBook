(function () {
    'use strict';

    angular
        .module('GradeBook')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$cookieStore', '$rootScope'];
    function UserService($http, $cookieStore, $rootScope) {
        var service = {};

        //service.GetAll = GetAll;
        //service.GetById = GetById;
        //service.GetByName = GetByName;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        //return service;

        //function GetAll() {
        //   return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        //}

        var GetById = function(id) {
            return $http.get('http://localhost:27017/api/users/' + id).then(function(data) {
                return data;
            }).catch(function(err) {
                console.log(err);
            })
        }

        //function GetByName(name) {
        //    return $http.get('/api/users/' + name).then(handleSuccess, handleError('Error getting user by name'));
        //}

        function Create(user) {
            return $http.post('http://localhost:27017/api/users', user).then(function (data) {
                return data;
            }).catch(function (err) {
                console.log(err);
            })
        }

        function Update(user) {
            return $http.put('http://localhost:27017/api/users/' + user.id, user).then(function (data) {
                return data;
            }).catch(function (err) {
                console.log(err);
            })
        }

        function Delete(id) {
            return $http.delete('http://localhost:27017/api/users/' + id).then(function (data) {
                return data;
            }).catch(function (err) {
                console.log(err);
            })
        }

        //function Login(user) {
        //    return $http.post('http://localhost:27017/api/users').then(function (data) {
        //        return data;
        //    }).catch(function (err) {
        //        console.log(err);
        //    })
        //}

        function Login(user) {
            console.log(user);
            return $http.post('http://localhost:27017/api/authenticate', user).then(function (data) {
                console.log(data);
                return data;
            }).catch(function (err) {
                console.log(err);
            })

        }

        function SetCredentials(username, password) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            console.log($rootScope.globals);
            $rootScope.globals = null;
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

        return {
            GetById: GetById,
            Create: Create,
            Update: Update,
            Delete: Delete,
            Login: Login,
            SetCredentials: SetCredentials,
            ClearCredentials: ClearCredentials
        }
    }
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };
})();