
// API checking interval for new posts

function checkAPI() {

    window.setInterval(function() {

        console.log("Goign to check the API...brb.");
        $.ajax({
            url: "https://api.reddit.com/r/videos/new/?limit=1",
            cache: false,
            dataType: "json",

            // Work with the response
            success: function( response ) {

                // Setup desired data retrieved from the API
                var lastPostTime = response.data.children[0].data.created;
                var lastPostTitle = response.data.children[0].data.title;
                var lastPostLink = response.data.children[0].data.permalink;
                var lastPostAuthor = response.data.children[0].data.author;

                console.log(":: lastPostTime = " + lastPostTime);
                console.log(":: lastPostLink = " + lastPostLink);

                var opt = {
                    type: 'basic',
                    iconUrl: 'icons/icon128.png',
                    title: 'New post in /r/Doom:',
                    message: lastPostTitle + "\n(posted by " + lastPostAuthor + ")"
                };

                //chrome.runtime.sendMessage({type: "shownotification", opt: opt, lastPostLink}, function(){});
                chrome.notifications.create('newDoomPost', opt, function(notificationId) { console.log(":: Creating notification!")});
                chrome.notifications.onClicked.addListener(function() {
                    chrome.tabs.create({ url: "https://reddit.com" + lastPostLink });
                });

                var prevPostTime = lastPostTime;
                console.log("NEW prevPostTime :: " + prevPostTime);

            }
        });

    }, 600000);

};

checkAPI();
//var apiInterval = setInterval(checkAPI, 50000);








chrome.browserAction.onClicked.addListener(function(){
    var newURL = "https://reddit.com/r/doom";
    chrome.tabs.create({ url: newURL });
});
/*

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type === "shownotification"){
        chrome.notifications.create('newDoomPost', request.opt, function(notificationId) { console.log(":: Creating notification! :: Last error:", chrome.runtime.lastError)});
    }

    chrome.notifications.onClicked.addListener(function() {
        chrome.tabs.create({ url: "https://reddit.com" + request.lastPostLink });
    });
});*/
