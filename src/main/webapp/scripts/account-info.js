
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
      auth2 = gapi.auth2.init({
        client_id: '757099697912-i6jll98mfgochdo2vgjcovf64pepjesc.apps.googleusercontent.com'
      });
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
    var id_token = auth2.currentUser.get().getAuthResponse().id_token
    //send id_token to server
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/account');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('idtoken=' + id_token);
    xhr.send('action=newAccount');

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

