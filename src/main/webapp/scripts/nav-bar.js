
var loggedInStatus;

function loadPage(){
    $("#nav-placeholder").load("../nav.html", changeBar);

}

function changeBar(){
    fetch("/account").then(response => response.json()).then(loginData => {
        if(loginData.loggedIn){
            $("#login").text("Log Out");
        }
        else{
            $("#login").text("Log In");

        }
        loggedInStatus = loginData.loggedIn;

        console.log("logged in 1"+loggedInStatus);

        $("#login").attr("href",loginData.logInOutURL);
    })
}