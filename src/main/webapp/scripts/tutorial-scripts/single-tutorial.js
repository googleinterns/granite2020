import{rendered} from "./tutorial.js"

function myPage() {
  const elementZoom = $('#tutorial-placeholder');
  elementZoom.html(rendered);
}

/*
console.log(rendered);

$( document ).ready(function() {
  const elementZoom = $('#tutorial-placeholder');
  elementZoom.html(rendered);
});
*/
