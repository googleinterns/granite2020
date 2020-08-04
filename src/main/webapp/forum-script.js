/* Populates forum-placeholder with forum data */
function getForum() {
  var parent_id = -1;
  var placeholder = $("#forum-placeholder");
  expandForum(placeholder, parent_id);
}

/* Populates the replies for a forum element with the given id in the placeholder given */
function expandForum(placeholder, parent_id) {
  placeholder.empty();
  fetch('/forum?parent_id=' + parent_id.toString()).then(response => response.json()).then(elements => {
    for (var i = 0; i < elements.length; i++) {
      createForumElement(placeholder, elements[i]);
    }
  });
}

/* Creates a new forum element in the placeholder populated with fields of the element given */
function createForumElement(placeholder, element) {
  /* Creates a new div elements and adds to placeholder */
  var element_div = $("<div></div>");
  var element_id = "element-" + element.id.toString();
  element_div.attr('id', element_id);
  placeholder.append(element_div);

  /* Loads forum_element.html template and then populates div with the fields from element */
  element_div.load("forum_element.html", function() {
    if (element.parent_id == -1) {
      $("#" + element_id).addClass("question");
      $("#" + element_id + " .topic").text(element.topic);
    }
    else {
      $("#" + element_id).addClass("comment");
    }
    $("#" + element_id + " .text").text(element.text);
    $("#" + element_id + " .date").text("Timestamp: " + convertTimestampToDate(element.timestamp));
    $("#" + element_id + " .likes").text("Likes: " + element.likes.toString());
    $("#" + element_id + " .like-form").attr("action", "/forum?like=true&id=" + element.id.toString());
    $("#" + element_id + " .response-form").attr("action", "/forum?like=false&parent_id=" + element.id.toString());
    $("#" + element_id + " .replies-button").click(element.id, getReplies);
    $("#" + element_id + " .replies").attr("id", "replies-" + element.id.toString());
  });
}

/* Gets replies for a forum element given id in the handler input */
function getReplies(parent_id_handler) {
  var parent_id = parent_id_handler.data;
  var placeholder = $("#replies-" + parent_id.toString());
  expandForum(placeholder, parent_id);
}

/* Converts a timestamp in milliseconds into a date based on UTC */
function convertTimestampToDate(timestamp) {
  var date = new Date(timestamp);
  return date.toUTCString();
}

