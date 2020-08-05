import {updateAccountData, loggedInStatus, signupURL, logInOutURL, userInfo}
  from './account-info.js';
import {loadNav} from './nav-bar.js';

const dataPromise = updateAccountData();

dataPromise.then(function() {
  loadNav();
  if (userInfo.email === "This") {
    window.location.replace("../signup.html")
  }

  if (loggedInStatus) {
    $('#account-functions').css('display', 'none');
  }
  $('#login-index').attr('href', logInOutURL);
  $('#signup').attr('href', signupURL);
});
