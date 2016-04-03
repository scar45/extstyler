// Saves options to chrome.storage.sync.
function save_options() {
    var homeLink= $("#homelink").is(':checked');
    var useSounds = $("#sounds").is(':checked');
    var bodyFont = $("#bodyfont").is(':checked');
    var headerType = $("#header-type").val();
    console.log(homeLink, headerType, bodyFont, useSounds);

    chrome.storage.sync.set({
        enableHomeLink: homeLink,
        headerPref: headerType,
        fontPref: bodyFont,
        useSounds: useSounds
    }, function() {
        // Update status to let user know options were saved.
        $("#status").html("Options saved.");
        setTimeout(function() {
            $("#status").html("&nbsp;");
        }, 3000);
    });
}

// Restores select box and checkbox state using the preferences
//  stored in chrome.storage.sync
function restore_options() {
    // Set defaults
    chrome.storage.sync.get({
        enableHomeLink: true,
        headerPref: 'header-med',
        fontPref: false,
        useSounds: false
    }, function(items) {
        $("#homelink").prop('checked', items.enableHomeLink);
        $("#header-type").val(items.headerPref);
        $("#bodyfont").prop('checked', items.fontPref);
        $("#sounds").prop('checked', items.useSounds);
    });
}

$(document).ready(function() {
    restore_options();
    $("#save").click(function() {
        save_options();
    });
    var headerLowPreviewURL = chrome.extension.getURL("/src/images/r-doom-header-low-bg.jpg");
    var headerMedPreviewURL = chrome.extension.getURL("/src/images/r-doom-header-med-bg.jpg");
    var headerHiPreviewURL = chrome.extension.getURL("/src/images/r-doom-header-hi-bg.jpg");
    $("#header-choice-low").css("backgroundImage", "url(" + headerLowPreviewURL + ")");
    $("#header-choice-med").css("backgroundImage", "url(" + headerMedPreviewURL + ")");
    $("#header-choice-hi").css("backgroundImage", "url(" + headerHiPreviewURL + ")");
});
