var profile;

function onSignIn() {
    var auth2 = gapi.auth2.init();  
    profile = auth2.currentUser.get().getBasicProfile();
    var id_token = auth2.currentUser.get().getAuthResponse().id_token;

}

export function signOut() {
  console.log("here")
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {

    console.log('User signed out.');
  });

}

export {profile}


