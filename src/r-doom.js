// Handle the logic to determine if we're on /r/Doom
var pathname = window.location.pathname;
var subreddits = new RegExp('^.*(\/r\/doom|\/r\/Doom)');

// Setup the (original) WAV sounds
var upDootSound = chrome.extension.getURL('src/sounds/dswpnup.wav');
var downDootSound = chrome.extension.getURL('src/sounds/dsplpain.wav');
var resetDootSound = chrome.extension.getURL('src/sounds/dsgetpow.wav');

// Function to play sounds on Up/Down/Null doots
function soundsEnabled(){
  $('.arrow').click(function(){
    var audioUpFX = new Audio(upDootSound);
    var audioDownFX = new Audio(downDootSound);
    var audioResetFX = new Audio(resetDootSound);
    if($(this).hasClass('up')) {
      audioUpFX.play();
    } else if ($(this).hasClass('down')) {
      audioDownFX.play();
    } else {
      audioResetFX.play();
    }
  });
}

// Conditional to run tings if we ARE on /r/Doom
if(pathname.match(subreddits)) {

  // Add a unique class to the <html> tag so that we can attach our styles
  $('html').addClass('r-doom-dark-fireblood');

  // Preference tests
  function parsePreferences() {
    chrome.storage.sync.get({
      enableHomeLink: true,
      headerPref: 'header-med',
      fontPref: true,
      useSounds: false
    }, function(items) {
      console.log(items.enableHomeLink, items.headerPref, items.useSounds, items.fontPref);

      if (items.enableHomeLink){
        $("#header-img-a").attr("href", "/r/doom");
      }
      if (items.headerPref == "header-hi") {
        $("#header").addClass("header-type-hi");
      }
      if (items.headerPref == "header-med") {
        $("#header").addClass("header-type-med");
      }
      if (items.headerPref == "header-low") {
        $("#header").addClass("header-type-low");
      }
      if (items.headerPref == "header-random") {
        // Setup the Header options
        var extPathHeaderLow = chrome.extension.getURL('src/images/r-doom-header-low-bg.jpg');
        var extPathHeaderMed= chrome.extension.getURL('src/images/r-doom-header-med-bg.jpg');
        var extPathHeaderHi = chrome.extension.getURL('src/images/r-doom-header-hi-bg.jpg');

        var headerImgArray = new Array();
        headerImgArray[0] = extPathHeaderLow;
        headerImgArray[1] = extPathHeaderMed;
        headerImgArray[2] = extPathHeaderHi;

        getRandomImage(headerImgArray, "");

        function getRandomImage(imgAr, path) {
          var num = Math.floor( Math.random() * imgAr.length );
          var img = imgAr[ num ];
          $("#header").css("backgroundImage", "url(" + img + ")");
        }
      }
      if (items.fontPref) {
        $("body").css("fontFamily", "aldrich");
        $("html.r-doom-dark-fireblood .linkinfo, html.r-doom-dark-fireblood .titlebox h1 a").css("fontFamily", "aldrich");
        $("html.r-doom-dark-fireblood .linkinfo .date span").css("fontSize", "13px");
      }
      if (items.useSounds){
        soundsEnabled();
      }
    });
  }

  $('#header-img').replaceWith("<div id='header-img'></div>");

  parsePreferences();
}
