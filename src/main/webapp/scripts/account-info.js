let auth2;
let profile;
let initPromise = init();

/**
 * Initializes the auth2 variable
 * @returns Promise which resolves when auth2 is initalized
 */
function init() {
  return new Promise(function (resolve, reject) {
    gapi.load('auth2', function(){
      auth2 = gapi.auth2.init();
      resolve();
    });
  });
}

function signIn(){
  return auth2.signIn().then(function(){
    profile = auth2.currentUser.get().getBasicProfile();
  });
}

function signOut() {
  return auth2.signOut().then(function () {
    profile = null;
  });

}


export {auth2, profile, signIn, initPromise, signOut}





