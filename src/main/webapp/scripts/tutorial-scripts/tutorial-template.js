// Template for mustache rendering tutorial pages
// Template in Javascript because the template in HTML created linter errors.

const tutorialTemplate =
'<div id="header">\n' +
'<h1>{{toolName}}</h1>\n' +
'<h2>{{toolDescription}}</h2>\n' +
'<a href="{{toolLink}}" target="_blank" rel="noopener">{{toolName}} \
Link</a>\n' +
'</div>\n' +
'<div id="content">\n' +
'<div id="content-left">\n' +
'<h1>Useful Links</h1>\n' +
'{{#usefulLinks}}\n' +
'<h3>{{linkTitle}}</h3>\n'+
'{{#links}}' +
'<li>' +
'<a href="{{url}}" target="_blank" rel="noopener">{{linkName}}</a>' +
'<li>' +
'{{/links}}' +
'{{/usefulLinks}}\n' +
'</div>\n' +
'<div id="content-right">\n' +
'<h1>Useful Videos</h1>\n' +
'{{#usefulVids}}\n' +
'<h2>{{linkTitle}}</h2>\n' +
'<iframe class="tutorials-vid" src="{{vidLink}}" allow="accelerometer; \
autoplay; encrypted-media; gyroscope; picture-in-picture" \
allowfullscreen></iframe>\n' +
'{{/usefulVids}}\n' +
'</div>\n' +
'</div>';

export {tutorialTemplate};
