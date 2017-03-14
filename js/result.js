function loadMathJax() {
    var head = document.getElementsByTagName("head")[0],
        script;
    script = document.createElement("script");
    script.type = "text/x-mathjax-config";
    script[(window.opera ? "innerHTML" : "text")] =
        "MathJax.Hub.Config({\n" +
        "  tex2jax: { inlineMath: [['$','$'], ['\\\\(','\\\\)']] }\n" +
        "});"
    head.appendChild(script);
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
    head.appendChild(script);
    L
}

var app = angular.module("app");
app.controller('testResults', function ($scope, userService, $location) {

    $scope.dataLoaded = false;
    $scope.response = {};
    $scope.dataObj = {};
    console.log("Test Reults loaded ..");
    userService.initLoader($scope);
    //$scope.dataObj = {};
    //$scope.user = JSON.parse(localStorage.erpUser);
    //localStorage.erpEmployee = null;
    $scope.student = {
        test: {}
    };
    $scope.student.id = 32;
    $scope.student.test.id = "edofox129";


    $scope.getTestResult = function () {
        userService.showLoading($scope);
        $scope.dataObj.student = $scope.student;
        userService.callService($scope, "/getTestResult").then(function (response) {
            //$.skylo('end');
            userService.initLoader($scope);
            console.log(response);
            $scope.response = response;
            $scope.dataLoaded = true;
            loadMathJax();
            console.log("Response");
            //userService.showResponse($scope, "");


        });
    }



    $scope.getTestResult();


});
app.directive('dynamic', function ($compile) { //directive to replace special characeters using R.E. special characters
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
            scope.$watch(attrs.dynamic, function (html) {
                html = html.replace(/\$\$([^$]+)\$\$/g, "<span class=\"blue\" mathjax-bind=\"$1\"></span>");
                html = html.replace(/\$([^$]+)\$/g, "<span class=\"red\" mathjax-bind=\"$1\"></span>");
                html = html.replace(/\\\(([^)]+\\)\)/g, "<span class=\"red\" mathjax-bind=\"$1\"></span>");
                ele.html(html);
                $compile(ele.contents())(scope);
            });
        }
    };
});
