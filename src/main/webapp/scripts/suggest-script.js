/**
 * Gets executed when button is clicked
 */
window.onload = function() {
  document.getElementById('make-suggestion').onclick = makeSuggestion;
};

/**
 * Posts to server the suggestion made by the user
 *
 * Ignoring linter otherwise makeSuggestion is unsued but it is
 * called in tutorials.html
 */
function makeSuggestion() {
  const platformElement = document.getElementById('platform');
  const additionElement = document.getElementById('addition');
  $.post('/new-suggestion?platform=' + platformElement.value +
    '&addition=' + additionElement.value);
  platformElement.value = '';
  additionElement.value = '';
}
