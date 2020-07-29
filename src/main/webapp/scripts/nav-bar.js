window.onload = loadPage

function loadPage(){
    $("#nav-placeholder").load("../nav.html", changeBar)
    gi 


}

function changeBar(){
    fetch("/account").then(response => response.json()).then(loginData => {
        if(loginData.loggedIn){
            $("#login").text("Log Out")
        }
        else{
            $("#login").text("Log In")

        }
        console.log(loginData.userData)
        console.log("setting link to " + loginData.logInOutURL) 

        $("#login").attr("href",loginData.logInOutURL)
    })
}