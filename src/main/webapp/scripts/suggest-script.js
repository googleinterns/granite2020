import { initPromise } from "./account-info.js";

/**
 * Gets executed when button is clicked
 */
window.onload = function() {
  document.getElementById('make-suggestion').onclick = makeSuggestion;
};
initPromise.then(function(){
  const auth2 = gapi.auth2.getAuthInstance
  auth2.isSignedIn.listen(function(){
    updatePage();
  })
})

/**
 * Posts to server the suggestion made by the user
 *
 * Ignoring linter otherwise makeSuggestion is unsued but it is
 * called in tutorials.html
 */
function makeSuggestion() {
  const platformElement = document.getElementById('platform');
  const additionElement = document.getElementById('addition');
  $.post('/new-suggestion?platform=' + platformElement.value +
    '&addition=' + additionElement.value);
  platformElement.value = '';
  additionElement.value = '';
}

function updatePage() {
  if (auth2.isSignedIn.get()) {
    $('#account-functions').css('display', 'none');
    $('#suggestion-form').css('display', 'block')
  } else {
    $('#account-functions').css('display', 'block');
    $('#suggestion-form').css('display', 'block')

  }
}


