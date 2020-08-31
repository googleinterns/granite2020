let profile;
const initPromise = init();


const API_KEY = 'AIzaSyBD6cw2_iZrPpQlQJswditPC5n3-1I64B0';
const CLIENT_ID = '757099697912-i6jll98mfgochdo2vgjcovf64pepjesc'+
    '.apps.googleusercontent.com';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar';


/**
 * Initializes the auth2 variable and calendar API
 * @return {Promise} Promise which resolves when auth2 is initalized
 */
function init() {
  return new Promise(function(resolve, reject) {
    gapi.load('client:auth2', function() {
      gapi.auth2.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(resolve);
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
  const auth2 = gapi.auth2.getAuthInstance();
  return auth2.signOut().then(function() {
    auth2.currentUser.get().disconnect();
    auth2.disconnect();
    profile = null;
  });
}


export {profile, signIn, initPromise, signOut};

