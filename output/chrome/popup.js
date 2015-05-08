"use strict";

var app = angular.module('circuitExt', ['firebase']);

app.controller('AppCtrl', function AppCtrl ($scope, $firebaseAuth, $firebaseArray) {
    //PRIVATE VARIABLES
    var ref = new Firebase("https://jbthoma.firebaseio.com/users/1");
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJpYXQiOjE0MzEwOTQwNTUsImQiOnsidWlkIjoiMSIsInNvbWUiOiJhcmJpdHJhcnkiLCJkYXRhIjoiaGVyZSJ9fQ.DEVNWg_JNL5FKS-GmdXa0JFLuJqAo8piY1v4186_PPE";

    //PUBLIC METHODS
    $scope.login = function () {
        $scope.current.mode = "display-list";
    };

    $scope.removeNotification = function (item) {
        $scope.notifications.$remove(item);
    };

    $scope.sendMessage = function () {
        kango.browser.tabs.getAll(function(tabs) {
            // tabs is Array of KangoBrowserTab
            for(var i = 0; i < tabs.length; i++){
                $scope.notifications.$add({icon: "Test", title: "Url", body: tabs[i].getUrl()});
            }
        });

        kango.dispatchMessage('background-message', 'Hello 2');
    };


    //KangoAPI.onReady(function() {
    //    kango.dispatchMessage('background-message', 'Hello');
    //});

    //INITIALIZE
    $scope.user = {username: "joshua.thoma@orionadvisor.com", password: "test"};
    $scope.current = {mode: "display-list"};

    $firebaseAuth(ref).$authWithCustomToken(token)
        .then(function (authData) {
            //$scope.notifications = $firebaseArray(ref);
        });

    $scope.notifications = $firebaseArray(ref);
});
