
let auth2;
let profile;
const initPromise = init();


/**
 * Initializes the auth2 variable
 * @return {Promise} Promise which resolves when auth2 is initalized
 */
function init() {
  return new Promise(function(resolve, reject) {
    gapi.load('auth2', function() {
      auth2 = gapi.auth2.init();
      resolve();
    });
  });
}

/**
 * Signs user in and sets profile variable
 * @return {Promise} Promise which resolves when profile is set
 */
function signIn() {
  return auth2.signIn().then(function() {
    profile = auth2.currentUser.get().getBasicProfile();
    const idToken = auth2.currentUser.get().getAuthResponse().id_token;
    // send idToken to server
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/account');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('idtoken=' + idToken);
  });
}

/**
 * Signs out user and clear profile variable
 * @return {Promise} Promise which resolves when user
 * signs out and profile is set to null
 */
function signOut() {
  return auth2.signOut().then(function() {
    profile = null;
  });
}


export {auth2, profile, signIn, initPromise, signOut};

