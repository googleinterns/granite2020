/** Loads Nav bar from nav.html file */
function loadNav() {
  $('#nav-placeholder').load('../nav.html', changeBar);
}

/** Dynamically sets the content of the log in/ log out button */
function changeBar() {
  if (loggedInStatus) {
    $('#login').text('Log Out');
  } else {
    $('#login').text('Log In');
  }
  $('#login').attr('href', logInOutURL);
}

export {loadNav};
