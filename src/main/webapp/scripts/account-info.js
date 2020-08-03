var loggedInStatus;
var logInOutURL;
var signupURL;


/** Updates global variables related to account data. */
function updateAccountData(){
    
    return fetch("/account").then(response => response.json()).then(loginData => {
        loggedInStatus = loginData.loggedIn;
        logInOutURL = loginData.logInOutURL;
        signupURL = loginData.signUpURL;

    })
}