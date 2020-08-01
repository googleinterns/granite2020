function getForum() {
  console.log("getForum");
  expandForum(-1);
}

function expandForum(parent_id) {
  console.log("expandForum");
  var placeholder;

  if (parent_id == -1) {
    placeholder = $("#forum-placeholder");
  }
  else {
    placeholder = $("#replies-" + parent_id.toString());
  }

  placeholder.empty();

  fetch('/forum?parent_id=' + parent_id.toString()).then(response => response.json()).then(elements => {
    for (var i = 0; i < elements.length; i++) {
      createForumElement(placeholder, elements[i]);
    }
  });
}

function createForumElement(placeholder, element) {
  console.log("createForumElement");

  var element_div = $("<div></div>");
  var element_id = "element-" + element.id.toString();
  element_div.attr('id', element_id);
  if (element.parent_id == -1) {
    element_div.addClass("question");
  }
  else {
    element_div.addClass("comment");
  }

  placeholder.append(element_div);
  element_div.load("forum_element.html");

  $("#" + element_id + " .text").text(element.text);

  if (element.parent_id == -1) {
    $("#" + element_id + " .topic").text(element.topic);
  }

  $("#" + element_id + " .date").text(element.timestamp.toString());
  $("#" + element_id + " .likes").text(element.likes.toString());
  $("#" + element_id + " .like-form").attr("action", "/forum?new_element=false&id=" + element.id.toString());
  $("#" + element_id + " .response-form").attr("/forum?new_element=true&parent_id=" + element.id.toString());
  // $("#" + element_id + " .replies-button").onclick = expandForum(element.id);
  $("#" + element_id + " .replies-id").attr('id', "replies-" + element.id);
}
