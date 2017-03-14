var app = angular.module("app", ["ngRoute"]);

//var host = "http://localhost:8080/edo-service";
var host = "http://115.124.124.220:8080/edofox";
var root = host + "/service";
var rootAdmin = host + "/adminService";



app.service('userService', function ($http, $q) {

    var response = {};

    this.showResponse = function ($scope,successMsg,successLink) {
        $scope.showProgress = false;
        if ($scope.response == null) {
            $scope.response = {};
            $scope.response.status = -111;
            $scope.response.responseText = "Error connecting server ..";
            $("#errorModal").modal('show');
            return;
        }
        console.log("Response :" + $scope.response.status + " msg:" + successMsg);
        //$scope.response.status = response.status;
        if ($scope.response.status == 200) {
            if(successMsg == "") {
                return;
            }
            /*if(successLink!= null && successLink != "") {
                $scope.successLink = successLink;
            } else {
                $scope.successLink = "#main";
            }*/
            //localStorage.erpEmployee = null;
            $scope.successMsg = successMsg;
            console.log("Response Text:" + $scope.response.responseText);
            $("#successModal").show();
            $("#successModal").modal('show');
            //console.log("Response :" + $scope.response.reseponseText);
        }  else {
            $("#errorModal").modal('show');
        }
        //console.log("Response :" + $scope.response.reseponseText);
    }
    
    this.showLoading = function($scope) {
        console.log("Showing loader..");
        $scope.showProgress = true;
        console.log("Loaded loader..");
    }
    
    this.initLoader = function($scope) {
        $scope.showProgress = false;
        console.log("Hiding loader..");
        
    }
    
    this.validationError = function($scope, msg) {
        $scope.errorText = msg;
        $("#warningModal").modal('show');
    }
    
    this.close = function(url) {
        $("#successModal").modal('hide');
        if(url != null && url != "") {
            window.location.href = url;
        }
    }

    this.callService = function ($scope, method) {
        var defer = $q.defer();
        console.log(root + method);
        var res = $http.post(root + method, $scope.dataObj);
        res.success(function (data, status, headers, config) {
            response = data;
            defer.resolve(response);
            //console.log("Result :" + JSON.stringify(data) + ":" + JSON.stringify(headers))
           

        });
        res.error(function (data, status, headers, config) {
            response = data;
            defer.resolve(response);
            console.log("Error :" + status + ":" + JSON.stringify(data) + ":" + JSON.stringify(headers))
        });

        response = defer.promise;
        return $q.when(response);
    }

    this.logout = function () {

    }


});




