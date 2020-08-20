
import {auth2, signIn, initPromise} from './account-info.js';
import {updateBar} from './nav-bar.js';
initPromise.then(function() {
  updatePage();


  $('.sign-in').click(function() {
    onSignIn();
  });
  auth2.isSignedIn.listen(updatePage);
});


/**
 * Updates page and nav bar after sign in
 * @return {Promise} Promise which resolves after page is updated
 */
export function onSignIn() {
  return signIn().then(function() {
    updatePage();
    updateBar();
  });
}


/**
 * Updates content on webpage alone (not nav bar)
 */
function updatePage() {
  if (auth2.isSignedIn.get()) {
    $('#account-functions').css('display', 'none');
  } else {
    $('#account-functions').css('display', 'block');
  }
}


