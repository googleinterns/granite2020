// Template for mustache rendering of questions and comments on the forumn.
// Template in Javascript because the template in HTML created linter errors.

const forumTemplate = '<div class="forum-element {{elementType}}">\n' +
'<div class="info-element">\n' +
'<p class="topic" style="display: {{topicDisplay}}">Topic: {{topic}}</p>\n' +
'<p class="accepted" style="display: {{acceptedDisplay}}">Accepted Answer' +
'</p>\n' +
'<button class="accept-button" style="display: {{acceptButtonDisplay}}">' +
'Accept Answer</button>\n' +
'<p class="date">{{date}}</p>\n' +
'<p class="user">{{userName}}</p>\n' +
'</div>\n' +
'<h3 class="text">{{text}}</h3>\n' +
'<div class="options-element">\n' +
'<p class="likes-label">Likes: <i class="like-button fa fa-thumbs-up">' +
'</i></p>\n' +
'<p class="likes">{{likes}}</p>\n' +
'<button class="reply-button">Reply</button>\n' +
'<div class="response-form" style="display: none">\n' +
'<input type="text" class="text-input" name="text">\n' +
'<button class="response-button">Post</button>\n' +
'</div>\n' +
'<button class="expand-button" style="display: {{repliesDisplay}}">' +
'See {{numReplies}} Replies</button>\n' +
'</div>\n' +
'<div class="replies" id="replies-{{id}}" style="display: none"></div>\n' +
'<button class="collapse-button" ' +
'style="display: none">Hide Replies</button>\n' +
'</div>';

export {forumTemplate};
