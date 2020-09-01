// Template for mustache rendering of questions and comments on the forumn.
// Template in Javascript because the template in HTML created linter errors.

const forumTemplate =
`<div class="forum-element {{elementType}}">
  <div id="element-{{id}}">
    <div class="info-element vert-line">
      <div class="left">
        <p class="topic highlight-blue" style="display: {{topicDisplay}}">
        Topic: {{topic}}</p>
        <p class="accepted highlight-red" style="display: 
        {{acceptedDisplay}}">Accepted Answer</p>
        <button class="accept-button button small-button" style="display: 
        {{acceptButtonDisplay}}">Accept Answer</button>
      </div>
      <div class="right">
        <p class="date">{{date}}</p>
        <p class="user highlight-blue">{{userName}}</p>
      </div>
    </div>
    <h2 class="text">{{text}}</h3>
    <div class="options-element vert-line">
      <p class="likes-label">Likes: </p>
      <i class="like-button fas fa-thumbs-up fa-2x"></i>
      <p class="likes">{{likes}}</p>
      <button class="reply-button button small-button">Reply</button>
      <div class="response-form" style="display: none">
        <textarea class="text-input" name="text" rows="1" cols="30">
        </textarea>
        <button class="response-button button small-button">Post</button>
      </div>
      <button class="expand-button button small-button" style="display: 
      {{repliesDisplay}}">See <span class="num-rep">{{numReplies}}</span> 
      Replies</button>
    </div>
  </div>
  <div class="replies" id="replies-{{id}}" style="display: none"></div>
  <button class="collapse-button button small-button" style=
  "display: none" id="collapse-button-{{id}}">Hide Replies</button>
</div>`;

export {forumTemplate};
