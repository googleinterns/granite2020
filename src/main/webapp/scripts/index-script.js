import {updateAccountData, loggedInStatus, signupURL} from './account-info.js';
import {loadNav} from './nav-bar.js';

const dataPromise = updateAccountData();

dataPromise.then(function() {
  loadNav();

  if (loggedInStatus) {
    $('#account-functions').css('display', 'none');
  }
  $('#signup').attr('href', signupURL);
});
