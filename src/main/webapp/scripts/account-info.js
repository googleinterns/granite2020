var loggedInStatus;
var logInOutURL;
var signupURL;

function updateAccountData(){
    
    return fetch("/account").then(response => response.json()).then(loginData => {
        loggedInStatus = loginData.loggedIn;
        logInOutURL = loginData.logInOutURL;
        signupURL = loginData.signUpURL;
        console.log(signupURL);

    })
}