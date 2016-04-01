
var pathname = window.location.pathname;
var subreddits = new RegExp('^.*(\/r\/doom|\/r\/Doom)');

if(pathname.match(subreddits)) {
  $('html').addClass('r-doom-dark-fireblood');
  $('#header-img').replaceWith("<div id='header-img'></div>");
}
