import { updateAccountData } from "account-info.js";
var dataPromise = updateAccountData();

dataPromise.then(function(){
  loadNav();

  if(loggedInStatus){
    $("#account-functions").css("display", "none");
  }
  $("#signup").attr("href", signupURL)
})

