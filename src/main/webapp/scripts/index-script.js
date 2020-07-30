window.onload = function(){
    loadPage();
    console.log("logged in 2"+loggedInStatus);

    if(loggedInStatus){
        $("#account-functions").css("display", "none");
    }
}
