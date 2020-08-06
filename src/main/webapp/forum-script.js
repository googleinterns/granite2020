$( document ).ready( getForum );

/**
 *  Populates forum-placeholder with forum data
 */
function getForum() {
  const id = -1;
  const placeholder = $('#forum-placeholder');
  expandForum(placeholder, id);
}

/**
 *  Populates the replies for a forum element with the given id
 *  in the placeholder given
 *
 *  @param {S.fn.init} placeholder the div that will hold the forum elements
 *  @param {long} id the long that identifies the parent of the forum
 *  elements
 */
function expandForum(placeholder, id) {
  placeholder.empty();
  fetch('/forum?id=' + id.toString())
      .then((response) => (response.json())).then((elements) => {
        for (let i = 0; i < elements.length; i++) {
          createForumElement(placeholder, elements[i]);
        }
      });
}

/**
 *  Creates a new forum element in the placeholder populated with
 *  fields of the element given
 *
 *  @param {S.fn.init} placeholder the div that will hold the forum elements
 *  @param {ForumElement} element the ForumElement that contains the data for
 *  the element
 */
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
    } else {
      $('#' + elementId).addClass('comment');
    }
    $('#' + elementId + ' .text').text(element.text);
    $('#' + elementId + ' .date').text('Timestamp: ' +
        convertTimestampToDate(element.timestamp));
    $('#' + elementId + ' .likes').text('Likes: ' + element.likes.toString());
    $('#' + elementId + ' .like-form').attr('action', '/forum?id=' +
        element.id.toString() + '&like=true');
    $('#' + elementId + ' .response-form').attr('action', '/forum?id=' + 
        element.id.toString() + '&like=false');
    $('#' + elementId + ' .replies-button').click(element.id, getReplies);
    $('#' + elementId + ' .replies').attr('id', 'replies-' +
        element.id.toString());
  });
}

/**
 *  Gets replies for a forum element given id in the handler input
 *
 *  @param {S.Event} idHandler the handler object that holds the
 *  id of the element to expand as data
*/
function getReplies(idHandler) {
  const id = idHandler.data;
  const placeholder = $('#replies-' + id.toString());
  expandForum(placeholder, id);
}

/**
 *  Converts a timestamp in milliseconds into a date based on UTC
 *
 *  @param {long} timestamp the time in milliseconds
 *  @return {String} a String of the time as a date
 */
function convertTimestampToDate(timestamp) {
  const date = new Date(timestamp);
  return date.toUTCString();
}
