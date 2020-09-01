import {initPromise, signIn} from './account-info.js';

/**
 * Gets executed when button is clicked
 */
window.onload = function() {
  document.getElementById('make-suggestion').onclick = makeSuggestion;
};
initPromise.then(function() {
  updatePage();

  $('.sign-in').click(function() {
    onSignIn();
  });
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.isSignedIn.listen(updatePage);
}).then( function() {
  $('#suggestion-form').css('display', 'block');
});

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

/**
 * Updates content on page
 */
function updatePage() {
  const auth2 = gapi.auth2.getAuthInstance();
  if (auth2.isSignedIn.get()) {
    $('#account-functions').css('display', 'none');
    $('#suggestion').css('display', 'inline-block');
  } else {
    $('#account-functions').css('display', 'block');
    $('#suggestion').css('display', 'none');
  }
}

export function onSignIn() {
  return signIn().then(function() {
    updatePage();
  });
}



