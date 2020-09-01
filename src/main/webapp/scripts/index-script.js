
import {signIn, initPromise} from './account-info.js';
import {updateBar} from './nav-bar.js';
initPromise.then(function() {
  updatePage();


  $('.sign-in').click(function() {
    onSignIn();
  });
  gapi.auth2.getAuthInstance().isSignedIn.listen(updatePage);
});


/**
 * Updates page and nav bar after sign in
 * @return {Promise} Promise which resolves after page is updated
 */
export function onSignIn() {
  return signIn().then(function() {
    updatePage();
  });
}


/**
 * Updates content on webpage alone (not nav bar)
 */
function updatePage() {
  const auth2 = gapi.auth2.getAuthInstance();
  if (auth2.isSignedIn.get()) {
    console.log('signedIn');
    $('#account-functions').css('display', 'none');
  } else {
    $('#account-functions').css('display', 'block');
  }
}


