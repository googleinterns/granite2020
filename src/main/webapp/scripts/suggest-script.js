/**
 * Posts to server the suggestion made by the user
 */
function makeSuggestion() {
  const platformElem = document.getElementById("platform").value;
  const additionElem = document.getElementById("addition").value;
  $.post('/new-suggestion?platform=' + platformElem + '&addition=' + additionElem);
  
  // clears fields after submission
  document.getElementById('platform').value = '';
  document.getElementById('addition').value = '';
}