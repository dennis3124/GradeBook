(function(){
  angular.module('GradeBook')
    .controller('feedbackController', ['$mdDialog', 'studentService', '$state','$cookies' ,function($scope){
        var vm = this;
        vm.user = {
        	name: 'John Doe',
        	email: 'ipsum@lorem.com',
        	layout: 0,
        	easeofuse: 0,
        	comments: 'ipsumlorem'
        };
        vm.submit = function(newUser) {
        	console.log(newUser);
        	// If invalid
        	if (typeof newUser === "undefined") {
        		alert("Invalid submission! Make sure you fill in the feedback form.")
        	} else {
        			alert("Your submission was successful.");
        	}

        }
    }]);
})()  
