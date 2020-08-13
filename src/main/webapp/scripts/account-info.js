var auth2;
var profile;

var initPromise = init()




function init() {
  return new Promise(function (resolve, reject) {
    gapi.load('auth2', function(){
      auth2 = gapi.auth2.init();
      resolve();
    })
  })

}

function signIn(){
  return auth2.signIn().then(function(){
    profile = auth2.currentUser.get().getBasicProfile();
  })
}

export {auth2, profile, signIn, initPromise}

// function getProfile() {
//   if (auth2.isSignedIn.get()) {
//     var profile = auth2.currentUser.get().getBasicProfile();
//     console.log('ID: ' + profile.getx`Id());
//     console.log('Full Name: ' + profile.getName());
//     console.log('Given Name: ' + profile.getGivenName());
//     console.log('Family Name: ' + profile.getFamilyName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail());
//   }
// }

// function signOut() {
//   console.log("here")
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {

//     console.log('User signed out.');
//   });

// }



