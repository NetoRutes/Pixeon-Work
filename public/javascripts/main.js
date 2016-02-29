
var app = angular.module('myApp', []);
app.controller('ctrl', function($scope, $http) {
    $http.get("/persons")
    .then(function(response) {
        $scope.people = response.data;
    });

    $scope.login = function(){
        var data = {name: $("#user-name").text(), img: $("#user-photo").attr("src")};
        $http.post("/person",data);
        $("#btn-sign-chat").hide();
        $("#btn-leave-chat").show();
        $scope.listen();
        alert("Bem-vindo ao chat da Pixeon!!!\nAproveite bastante, fizemos com muito carinho!!!");
    };

    $scope.sendMsg = function(){
        var data = {txt: $scope.textMsg,user: $("#user-name").text()};
        $http.post("/postMsg",data);
        $scope.textMsg = "";
    };

    $scope.addMsg = function (msg) {
        $scope.$apply(function () { $scope.msgs.push(JSON.parse(msg.data)); });
    };

    $scope.listen = function () {
        $scope.chatFeed = new EventSource("/chatFeed/");
        $scope.chatFeed.addEventListener("message", $scope.addMsg, false);
    };

    $scope.listen();

});