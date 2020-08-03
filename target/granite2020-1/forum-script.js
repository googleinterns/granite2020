function getForum() {
  expandForum(-1);
}

function expandForum(parent_id) {
  var placeholder;
  console.log(parent_id);

  if (parent_id == -1) {
    placeholder = $("#forum-placeholder");
  }
  else {
    parent_id = parent_id.data;
    placeholder = $("#replies-" + parent_id.toString());
  }

  console.log(placeholder.html());

  placeholder.empty();

  fetch('/forum?parent_id=' + parent_id.toString()).then(response => response.json()).then(elements => {
    for (var i = 0; i < elements.length; i++) {
      createForumElement(placeholder, elements[i]);
    }
  });
}

function createForumElement(placeholder, element) {
  var element_div = $("<div></div>");
  var element_id = "element-" + element.id.toString();
  element_div.attr('id', element_id);
  placeholder.append(element_div);

  element_div.load("forum_element.html", function() {
    $("#" + element_id + " .text").text(element.text);

    if (element.parent_id == -1) {
      $("#" + element_id).addClass("question");
      $("#" + element_id + " .topic").text(element.topic);
    }
    else {
      $("#" + element_id).addClass("comment");
    }

    $("#" + element_id + " .date").text("Timestamp: " + convertTimestampToDate(element.timestamp));
    $("#" + element_id + " .likes").text("Likes: " + element.likes.toString());
    $("#" + element_id + " .like-form").attr("action", "/forum?new_element=false&id=" + element.id.toString());
    $("#" + element_id + " .response-form").attr("action", "/forum?new_element=true&parent_id=" + element.id.toString());
    $("#" + element_id + " .replies-button").click(element.id, expandForum);
    $("#" + element_id + " .replies").attr("id", "replies-" + element.id.toString());

  });
}

function convertTimestampToDate(timestamp) {
  var date = new Date(timestamp);
  return date.toUTCString();
}

