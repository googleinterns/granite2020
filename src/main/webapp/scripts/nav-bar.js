
function loadNav(){
    $("#nav-placeholder").load("../nav.html", changeBar);

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