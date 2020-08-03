/*global updateAccountData b:true*/
/*eslint no-undef: "error"*/

let loggedInStatus;
let logInOutURL;
let signupURL;


/** 
 * Updates global variables related to account data.
 * @return {Promise} after setting global variables
 */
function updateAccountData() {
  return fetch('/account').then((response) => response.json()).then(loginData => {
    loggedInStatus = loginData.loggedIn;
    logInOutURL = loginData.logInOutURL;
    signupURL = loginData.signUpURL;
  });
}
