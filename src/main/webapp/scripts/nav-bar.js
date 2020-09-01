/** Dynamically sets the content of the log in/ log out button */
import {auth2, signOut, signIn, initPromise} from './account-info.js';

$(document).ready(function() {
  $('#nav-placeholder').load('../nav.html', updateBarOnLoad);
});

/**
 * Updates the nav bar based on the login state.
 */
function updateBar() {
  if (auth2.isSignedIn.get()) {
    $('#login').text('Log Out');
    $('#login').off();
    $('#login').click(signOut);
  } else {
    $('#login').text('Log In');
    $('#login').off();
    $('#login').click(signIn);
  }
}

function updateBarOnLoad(){
  initPromise.then(function(){
    updateBar();
    auth2.isSignedIn.listen(updateBar)
  })
}
export {updateBar};
