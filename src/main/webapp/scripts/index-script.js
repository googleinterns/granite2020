
    var dataPromise = updateAccountData();

    dataPromise.then(function(){
        loadNav();
        console.log("logged in 2"+loggedInStatus);

        if(loggedInStatus){
            $("#account-functions").css("display", "none");
        }
        $("#signup").attr("href", signupURL)
    })

