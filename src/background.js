chrome.browserAction.onClicked.addListener(function(){
    var newURL = "https://reddit.com/r/doom";
    chrome.tabs.create({ url: newURL });
});