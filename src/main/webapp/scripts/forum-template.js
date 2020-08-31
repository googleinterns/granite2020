// Template for mustache rendering of questions and comments on the forumn.
// Template in Javascript because the template in HTML created linter errors.

const forumTemplate =
'<div class="forum-element {{elementType}}">\n' +
  '<div class="info-element vert-line">\n' +
    '<div class="left">\n' +
      '<p class="topic highlight-blue" style="display: {{topicDisplay}}">Topic: {{topic}}</p>\n' +
      '<p class="accepted highlight-red" style="display: {{acceptedDisplay}}">Accepted Answer</p>\n' +
      '<button class="accept-button button small-button" style="display: {{acceptButtonDisplay}}">Accept Answer</button>\n' +
    '</div>\n' +
    '<div class="right">\n' +
      '<p class="date">{{date}}</p>\n' +
      '<p class="user highlight-blue">{{userName}}</p>\n' +
    '</div>\n' +
  '</div>\n' +
  '<h2 class="text">{{text}}</h3>\n' +
  '<div class="options-element vert-line">\n' +
    '<p class="likes-label">Likes: </p>\n' +
    '<i class="like-button fas fa-thumbs-up fa-2x"></i>\n' +
    '<p class="likes">{{likes}}</p>\n' +
    '<button class="reply-button button small-button">Reply</button>\n' +
    '<div class="response-form" style="display: none">\n' +
      '<textarea class="text-input" name="text" rows="1" cols="30"></textarea>\n' +
      '<button class="response-button button small-button">Post</button>\n' +
    '</div>\n' +
    '<button class="expand-button button small-button" style="display: {{repliesDisplay}}">See {{numReplies}} Replies</button>\n' +
  '</div>\n' +
  '<div class="replies" id="replies-{{id}}" style="display: none"></div>\n' +
  '<button class="collapse-button button small-button" style="display: none">Hide Replies</button>\n' +
'</div>';

export {forumTemplate};
