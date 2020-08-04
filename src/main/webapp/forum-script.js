/** Populates forum-placeholder with forum data */
function getForum() {
  const parentId = -1;
  const placeholder = $('#forum-placeholder');
  expandForum(placeholder, parentId);
}

/** Populates the replies for a forum element with the given id 
 * in the placeholder given */
function expandForum(placeholder, parentId) {
  placeholder.empty();
  fetch('/forum?parentId=' + parentId.toString()).then(response => 
    response.json()).then(elements => {
    for (const i = 0; i < elements.length; i++) {
      createForumElement(placeholder, elements[i]);
    }
  });
}

/** Creates a new forum element in the placeholder populated with 
 * fields of the element given */
function createForumElement(placeholder, element) {
  /* Creates a new div elements and adds to placeholder */
  const elementDiv = $('<div></div>');
  const elementId = 'element-' + element.id.toString();
  elementDiv.attr('id', elementId);
  placeholder.append(elementDiv);

  /* Loads forumElement.html template and then populates div with the 
  fields from element */
  elementDiv.load('forumElement.html', function() {
    if (element.parentId == -1) {
      $('#' + elementId).addClass('question');
      $('#' + elementId + ' .topic').text(element.topic);
    }
    else {
      $('#' + elementId).addClass('comment');
    }
    $('#' + elementId + ' .text').text(element.text);
    $('#' + elementId + ' .date').text('Timestamp: ' 
      + convertTimestampToDate(element.timestamp));
    $('#' + elementId + ' .likes').text('Likes: ' + element.likes.toString());
    $('#' + elementId + ' .like-form').attr('action', '/forum?like=true&id=' 
      + element.id.toString());
    $('#' + elementId + ' .response-form').attr('action', 
      '/forum?like=false&parentId=' + element.id.toString());
    $('#' + elementId + ' .replies-button').click(element.id, getReplies);
    $('#' + elementId + ' .replies').attr('id', 'replies-' 
      + element.id.toString());
  });
}

/** Gets replies for a forum element given id in the handler input */
function getReplies(parentIdHandler) {
  const parentId = parentIdHandler.data;
  const placeholder = $('#replies-' + parentId.toString());
  expandForum(placeholder, parentId);
}

/** Converts a timestamp in milliseconds into a date based on UTC */
function convertTimestampToDate(timestamp) {
  const date = new Date(timestamp);
  return date.toUTCString();
}

