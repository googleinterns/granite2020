
var loggedInStatus;
var logInOutURL;

function loadNav(){
    getAccountData();
    //$("#nav-placeholder").load("../nav.html", changeBar);

}

function getAccountData(){
    fetch("/account").then(response => response.json()).then(loginData => {
        loggedInStatus = loginData.loggedIn;
        logInOutURL = loginData.logInOutURL;

        console.log("logged in 1"+loggedInStatus);

    })
}

function changeBar(){
    if(loggedInStatus){
        $("#login").text("Log Out");
    }
    else{
        $("#login").text("Log In");

    }
    $("#login").attr("href",logInOutURL);
}