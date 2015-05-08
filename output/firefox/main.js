function MyExtension() {
    //var self = this;
    //kango.ui.browserButton.addEventListener(kango.ui.browserButton.event.COMMAND, function() {
    //    self._onCommand();
    //});
    kango.storage.setItem("fb_token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJpYXQiOjE0MzEwOTQwNTUsImQiOnsidWlkIjoiMSIsInNvbWUiOiJhcmJpdHJhcnkiLCJkYXRhIjoiaGVyZSJ9fQ.DEVNWg_JNL5FKS-GmdXa0JFLuJqAo8piY1v4186_PPE");


    kango.ui.browserButton.setBadgeBackgroundColor([0, 204, 0, 255]);

    function authHandler(error) {

    }

    var count = 0;
    //var first = true;
    var ref = new Firebase("https://jbthoma.firebaseio.com/users/1");

    var savedToken = kango.storage.getItem("fb_token");
    if (savedToken) {
        ref.authWithCustomToken(savedToken, authHandler);

        ref.on("child_added", function (snap) {
            setCount(1);

            var item = snap.val();
            kango.ui.notifications.show(item.title, item.body, 'http://kangoextensions.com/images/logos/kango.png', function() {
                kango.console.log('Notification click');
            });
        });

        ref.on("child_removed", function () {
            setCount(-1);
        });
    } else {
        kango.ui.notifications.show("Authentication Required", "Please login to receive notifications", 'http://kangoextensions.com/images/logos/kango.png');
    }

    kango.addMessageListener('background-message', function(event) {
        kango.ui.notifications.show("Authentication Required", JSON.stringify(event), 'http://kangoextensions.com/images/logos/kango.png');
    });

    //ref.once("value", function (snap) {
    //    count = 0;
    //    setCount(snap.val().length);
    //
    //    //snap.forEach(function (child) {
    //    //    console.log(child.val());
    //    //});
    //
    //    //var keys = Object.keys(snap.val() || {});
    //    //var lastIdInSnapshot = keys[keys.length - 1];
    //    //
    //    //ref.startAt(null, lastIdInSnapshot).on("child_added", function(newMessSnapshot) {
    //    //    setCount(1);
    //    //    console.log(newMessSnapshot.val());
    //    //});
    //});

    //ref.endAt().limit(1).on("child_added", function(snap) {
    //    if( first ) {
    //        first = false;
    //    }
    //    else {
    //        kango.console.log(snap.val());
    //        setCount(1);
    //    }
    //});



    function setCount (value) {
        count += value;
        kango.ui.browserButton.setBadgeValue(count);
    }
}

//MyExtension.prototype = {
//
//    _onCommand: function() {
//        kango.browser.tabs.create({url: 'http://kangoextensions.com/'});
//    }
//};
//
//var extension = new MyExtension();

MyExtension();