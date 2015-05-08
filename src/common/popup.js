"use strict";

var app = angular.module('circuitExt', ['firebase']);

app.controller('AppCtrl', function AppCtrl ($scope, $firebaseAuth, $firebaseArray) {
    //PRIVATE VARIABLES
    var ref, auth;


    //PRIVATE METHODS
    function init() {
        var user = kango.storage.getItem("user");
        if (user) {
            ref = new Firebase("https://jbthoma.firebaseio.com/users/" + user.uid);
            auth = $firebaseAuth(ref);

            auth.$authWithCustomToken(user.token)
                .then(function() {
                    $scope.current.mode = "display-list";
                })
                .catch(function() {
                    $scope.user = {email: kango.storage.getItem("email"), password: null};
                    $scope.current.mode = "login";
                });
        } else {
            $scope.user = {};
            $scope.current.mode = "login";
        }
    }


    //PUBLIC METHODS
    $scope.login = function () {
        auth.$authWithPassword($scope.user)
            .then(function(data) {
                kango.storage.setItem("email", $scope.user.email);
                kango.storage.setItem("user", {uid: data.uid, token: data.token});

                $scope.user.password = null;
                $scope.current.mode = "display-list";
            })
            .catch(function(error) {
                alert(error);
            });
    };

    $scope.logout = function () {
        auth.$unauth();
        kango.storage.removeItem("user");

        $scope.current.mode = "login";
    };

    $scope.navigate = function (item) {
        var domain = item.url.split("/")[2],
            tab;

        kango.browser.tabs.getAll(function(tabs) {
            for(var i = 0; i < tabs.length; i++) {
                if (tabs[i].getUrl().split("/")[2] === domain) {
                    tab = tabs[i];
                    break;
                }
            }
        });

        if (tab) {
            tab.navigate(item.url);
        } else {
            kango.browser.tabs.create({url: item.url});
        }
        $scope.remove(item);
    };

    $scope.remove = function (item) {
        $scope.notifications.$remove(item);
    };


    //INITIALIZE
    $scope.current = {mode: "loading"};
    $scope.notifications = $firebaseArray(ref);

    KangoAPI.onReady(function() {
        KangoAPI.resizeWindow(320, 450); //TODO: remove this when we get the div size set
        init();
    });
});
