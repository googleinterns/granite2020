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
    console.log('User signed in.');
    profile = auth2.currentUser.get().getBasicProfile();
  })

}

function signOut() {
  return auth2.signOut().then(function () {
    profile = null;
  });

}


export {auth2, profile, signIn, initPromise, signOut}





