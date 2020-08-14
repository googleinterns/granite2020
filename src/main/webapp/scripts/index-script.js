import {auth2, signIn, initPromise} from "./account-info.js"
import {updateBar} from "./nav-bar.js"
initPromise.then(function(){
    console.log(auth2.isSignedIn.get());
    updatePage();

    $(".sign-in").click(function(){
      onSignIn();
  })
  auth2.isSignedIn.listen(updatePage);

}) 


export function onSignIn(){
    return signIn().then(function(){
        updatePage();
        updateBar();
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

