import {updateAccountData, loggedInStatus, signupURL, logInOutURL} from './account-info.js';
import {loadNav} from './nav-bar.js';

const dataPromise = updateAccountData();

dataPromise.then(function() {
  loadNav();

  if (loggedInStatus) {
    $('#account-functions').css('display', 'none');
  }
  $("#login-index").attr('href', logInOutURL)
  $('#signup').attr('href', signupURL);
});
