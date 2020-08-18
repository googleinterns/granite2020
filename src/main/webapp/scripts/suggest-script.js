/**
 * Gets executed when button is clicked
 */
window.onload = function() {
  document.getElementById('make-suggestion').onclick = function() {
    makeSuggestion()
  };
};

/**
 * Posts to server the suggestion made by the user
 *
 * Ignoring linter otherwise makeSuggestion is unsued but it is
 * called in tutorials.html
 */
function makeSuggestion() {
  const platElem = document.getElementById('platform').value;
  const addElem = document.getElementById('addition').value;
  $.post('/new-suggestion?platform=' + platElem + '&addition=' + addElem);

  // clears fields after submission
  document.getElementById('platform').value = '';
  document.getElementById('addition').value = '';
}
