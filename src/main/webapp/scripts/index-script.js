import {auth2, profile, signIn, initPromise} from "./account-info.js"
initPromise.then(function(){
    console.log(auth2.isSignedIn.get());
    updatePage();

    $(".sign-in").click(function(){
      onSignIn();
  })
}) 


  function onSignIn(){
    signIn().then(function(){
        updatePage();
    })
  }

function updatePage(){
    if(auth2.isSignedIn.get()){
        $("#account-functions").css("display", "none")
    }
    else{
        $("#account-functions").css("display", "block")

    }
}