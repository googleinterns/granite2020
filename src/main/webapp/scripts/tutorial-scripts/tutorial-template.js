// Template for mustache rendering tutorial pages
// Template in Javascript because the template in HTML created linter errors.

const tutorialTemplate =
'<div id="header">' +
'<h1>{{toolName}}</h1>' +
'<h2>{{toolDescription}}</h2>' +
`<a href="{{toolLink}}" target="_blank" rel="noopener"
>{{toolName}} Link</a>` +
'</div>' +
'<div id="content">' +
'<div id="content-left">' +
'<h1>Useful Links</h1>' +
'{{#usefulLinks}}' +
'<h3>{{linkTitle}}</h3>'+
'{{#links}}' +
'<li>' +
`<a href="{{url}}" target="_blank" rel="noopener"
>{{linkName}}</a>` +
'<li>' +
'{{/links}}' +
'{{/usefulLinks}}' +
'</div>' +
'<div id="content-right">' +
'<h1>Useful Videos</h1>' +
'{{#usefulVids}}' +
'<h2>{{linkTitle}}</h2>' +
`<iframe class="tutorials-vid" src="{{vidLink}}"
allow="accelerometer; autoplay;
encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` +
'{{/usefulVids}}' +
'</div>' +
'</div>';

export {tutorialTemplate};
