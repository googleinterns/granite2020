
let profile;
const initPromise = init();


/**
 * Initializes the auth2 variable
 * @return {Promise} Promise which resolves when auth2 is initalized
 */
function init() {
  return new Promise(function(resolve, reject) {
    gapi.load('auth2', function() {
      gapi.auth2.init();
      resolve();
    });
  });
}

/**
 * Signs user in and sets profile variable
 * @return {Promise} Promise which resolves when profile is set
 */
function signIn() {
  const auth2 = gapi.auth2.getAuthInstance();
  return auth2.signIn().then(function() {
    profile = auth2.currentUser.get().getBasicProfile();
    console.log(profile);
    const idToken = auth2.currentUser.get().getAuthResponse().id_token;
    // send idToken to server
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/account');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('action=newAccount&idtoken=' + idToken);
  });
}

/*
 * Signs out user and clear profile variable
 * @return {Promise} Promise which resolves when user
 * signs out and profile is set to null
 */
function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  return auth2.signOut().then(function() {
    auth2.currentUser.get().disconnect();
    auth2.disconnect();
    profile = null;
  });
}


export {profile, signIn, initPromise, signOut};

