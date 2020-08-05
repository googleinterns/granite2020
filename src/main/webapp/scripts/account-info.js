let loggedInStatus;
let logInOutURL;
let signupURL;
let userInfo;

/**
 * Updates global variables related to account data.
 * @return {Promise} after setting global variables
 */
function updateAccountData() {
  return fetch('/account').then((response) => response.json()).then(
      (loginData) => {
        loggedInStatus = loginData.loggedIn;
        logInOutURL = loginData.logInOutURL;
        signupURL = loginData.signUpURL;
        userInfo = loginData.userInfo;
      });
}

export {updateAccountData, loggedInStatus, logInOutURL, signupURL, userInfo};
