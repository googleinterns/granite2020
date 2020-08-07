import {updateAccountData, loggedInStatus, signupURL, logInOutURL, userInfo}
  from './account-info.js';

const dataPromise = updateAccountData();

dataPromise.then(function() {
  if (userInfo != null && userInfo.email === 'This') {
    window.location.replace('../signup.html');
  }

  if (loggedInStatus) {
    $('#account-functions').css('display', 'none');
  }
  $('#login-index').attr('href', logInOutURL);
  $('#signup').attr('href', signupURL);
});
