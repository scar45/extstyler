// Setup a listener to open a new tab on click of notification
chrome.notifications.onClicked.addListener(function() {
    chrome.tabs.create({
        selected: true,
        url: "https://reddit.com" + lastPostLink }
    );
});

// Setup a listener to open /r/Doom on (left) click of browser toolbar button
chrome.browserAction.onClicked.addListener(function(){
    var newURL = "https://reddit.com/r/doom";
    chrome.tabs.create({ url: newURL });
});

// API checking interval for new posts
var prevPostTime,
    lastPostTime,
    lastPostTitle,
    lastPostLink,
    lastPostAuthor;

function checkAPI() {

    $.ajax({
        url: "https://api.reddit.com/r/doom/new/?limit=1",
        cache: false,
        dataType: "json",

        // Work with the response
        success: function( response ) {
            // Setup desired data retrieved from the API

            lastPostTime = response.data.children[0].data.created;
            lastPostTitle = response.data.children[0].data.title;
            lastPostLink = response.data.children[0].data.permalink;
            lastPostAuthor = response.data.children[0].data.author;

            var opt = {
                type: 'basic',
                iconUrl: 'icons/icon128.png',
                title: 'New post in /r/Doom:',
                message: lastPostTitle + "\n(posted by " + lastPostAuthor + ")"
            };

            if (prevPostTime < lastPostTime) {
                chrome.notifications.create('', opt, function() { console.log(":: New /r/Doom post detected! Creating notification!")});
            }

            prevPostTime = lastPostTime;
        },

        complete: function(){
            setTimeout(checkAPI, 60000);
        }
    });

};

function parsePreferences() {
    chrome.storage.sync.get({
        enableNotifications: false
    }, function(items) {
        if (items.enableNotifications){
            console.log(":: /r/Doom notifications enabled for new posts (turn this off in Options)");
            checkAPI();
        }
    });
}

parsePreferences();
