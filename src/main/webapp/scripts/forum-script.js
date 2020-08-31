import {forumTemplate} from './forum-template.js';
import {signIn, initPromise} from './account-info.js';
import {updateBar} from './nav-bar.js';

let signedIn;
let userId;
let userLiked;
let userFilter = 'all';

$( document ).ready( function() {
  // Add user data to forum
  initPromise.then(function() {
    updatePage();
    gapi.auth2.getAuthInstance().isSignedIn.listen(updatePage);
    $('.sign-in').click(function() {
      signIn().then(function() {
        updatePage();
      });
    });
  });

  // Add search functionality
  createSearch();

  // Populates filters
  getFilters();

  // Add functionality to post question
  $('#question-button').click(postQuestion);
});

/**
 *  Updates page based on whether the user is signed in
 */
function updatePage() {
  updateBar();
  const auth2 = gapi.auth2.getAuthInstance();

  if (auth2.isSignedIn.get()) {
    // The user is signed in
    signedIn = true;
    userId = auth2.currentUser.get().getBasicProfile().getId();

    // Get user likes and generate forum
    fetch('/account?action=liked&id=' + userId).then((response) =>
      (response.json())).then((json) => {
      userLiked = json;
    }).then(getForum);

    $('#new-question').css('display', 'inline-block');
    $('#new-question-logged-out').css('display', 'none');
    $('.reply-button').css('display', 'inline-block');
    $('#filter-user-label').css('display', 'inline-block');
    $('#filter-user-input').css('display', 'inline-block');
  } else {
    // The user is not signed in
    signedIn = false;
    getForum();
    $('#new-question').css('display', 'none');
    $('#new-question-logged-out').css('display', 'inline-block');
    $('.reply-button').css('display', 'none');
    $('#filter-user-label').css('display', 'none');
    $('#filter-user-input').css('display', 'none');
  }
}

/**
 *  Populates forum-placeholder with forum data
 */
function getForum() {
  const id = -1;
  const placeholder = $('#forum-placeholder');
  expandForum(placeholder, id, null);
}

/**
 *  Sets value of select if there are set filters from the url parameters
 */
function getFilters() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('topic')) {
    const topic = urlParams.get('topic');
    $('#filter-topic-input').val(topic).change();
  }
  if (urlParams.has('sort')) {
    const sort = urlParams.get('sort');
    $('#filter-sort-input').val(sort).change();
  }
  if (urlParams.has('userId')) {
    const user = urlParams.get('userId');
    $('#filter-user-input').val(user).change();
    userFilter = user;
  }
}

/**
 *  Populates the replies for a forum element with the given id
 *  in the placeholder given
 *
 *  @param {S.fn.init} placeholder the div that will hold the forum elements
 *  @param {long} id the long that identifies the parent of the forum
 *  elements
 *  @param {String} search search text from user if applicable
 */
function expandForum(placeholder, id, search) {
  placeholder.empty();
  fetch('/forum?id=' + id.toString())
      .then((response) => (response.json())).then((elements) => {
        console.log(elements.length);
        for (let i = 0; i < elements.length; i++) {
          if (userFilter ==='all' || elements[i].userId === userId) {
            if (!search || containsSearch(elements[i].text, search)) {
              createForumElement(placeholder, elements[i]);
            } 
          }
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
  /* Creates a new div and adds it to placeholder */
  const elementDiv = $('<div></div>');
  const elementId = 'outer-element-' + element.id.toString();
  elementDiv.attr('id', elementId);
  placeholder.append(elementDiv);
  console.log(elementId);

  let data;
  fetch('/account?action=name&id=' + element.userId).then((response) =>
    (response.json())).then((json) => {
    data = createElementData(element, json);
  }).then(function() {
    const rendered = Mustache.render(forumTemplate, data);
    elementDiv.html(rendered);

    console.log(userLiked);

    /* Add onclick functionality to mustache render */
    if (signedIn && !userLiked.includes(element.id.toString())) {
      $('#' + elementId + ' .like-button').click(element.id, incrementLikes);
      $('#' + elementId + ' .like-button').css('color', '#4285f4');
      $('#' + elementId + ' .like-button').css('cursor', 'pointer');
    } else {
      $('#' + elementId + ' .like-button').css('color', '#666');
      $('#' + elementId + ' .like-button').css('cursor', 'auto');
      $('#' + elementId + ' .like-button').off('click');
    }

    $('#' + elementId + ' .reply-button').click(element.id, reply);
    $('#' + elementId + ' .expand-button').click(element.id, expandReplies);
    $('#' + elementId + ' .response-button').click(element.id, postComment);
    $('#' + elementId + ' .accept-button').click(element.id, acceptComment);
    $('#collapse-button-' + element.id.toString()).click(element.id, collapseReplies);
  });
}

/**
 *  Creates json data for mustache render
 *
 *  @param {ForumElement} element the ForumElement that contains the data for
 *  the element
 *  @param {String} userName the name of the user who posted the element
 *  @return {Object} a populated json object
 */
function createElementData(element, userName) {
  /* If element is a comment or question and thus whether the topic should be
   * displayed */
  let elementType = 'comment';
  let topicDisplay = 'none';
  let acceptedDisplay = 'none';
  let acceptButtonDisplay = 'none';
  console.log(element.accepted);

  if (element.parentId == -1) {
    elementType = 'question';
    topicDisplay = 'inline-block';
  } else if (element.accepted == true) {
    acceptedDisplay = 'inline-block';
  } else if (element.userId === userId) {
    acceptButtonDisplay = 'inline-block';
  }

  /* If the element has replies, display expand button if not no display */
  let repliesDisplay = 'block';
  if (element.numberReplies == 0) {
    repliesDisplay = 'none';
  }

  /* Populate json data for the mustache render */
  const data = {
    elementType: elementType,
    topicDisplay: topicDisplay,
    acceptedDisplay: acceptedDisplay,
    acceptButtonDisplay: acceptButtonDisplay,
    topic: element.topic,
    date: convertTimestampToDate(element.timestamp),
    userName: userName,
    text: element.text,
    likes: element.likes,
    id: element.id,
    repliesDisplay: repliesDisplay,
    numReplies: element.numberReplies,
  };

  return data;
}

/**
 *  Creates a search functionality when page is loaded
 */
function createSearch() {
  $('#search-button').click(search);
  $('#search-button').keyup(function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      search();
    }
  });
}

/**
 *  Converts a timestamp in milliseconds into a date based on UTC
 *
 *  @param {long} timestamp the time in milliseconds
 *  @return {String} a String of the time as a date
 */
function convertTimestampToDate(timestamp) {
  const date = new Date(timestamp);
  const indexOfYear = 16; // index before time so it is not included
  return (date.toUTCString()).substring(0, indexOfYear);
}

/**
 *  Posts to server to increment likes for a element
 *
 *  @param {S.Event} idHandler onclick handler that contains the id data
 */
function incrementLikes(idHandler) {
  const id = idHandler.data;
  const elementId = 'element-' + id.toString();
  $.post('/forum?id=' + id.toString() + '&action=likes');
  $.post('/account?action=liked&id=' + userId + '&elementId=' + id.toString());
  const likes = parseInt($('#' + elementId + ' .likes').text());
  $('#' + elementId + ' .likes').text(likes + 1);
  $('#' + elementId + ' .like-button').css('color', '#666');
  $('#' + elementId + ' .like-button').css('cursor', 'auto');
  $('#' + elementId + ' .like-button').off('click');
}

/**
 *  Displays the reply form for a given element
 *
 *  @param {S.Event} idHandler onclick handler that contains the id data
 */
function reply(idHandler) {
  const id = idHandler.data;
  const elementId = 'element-' + id.toString();
  $('#' + elementId + ' .response-form').css('display', 'flex');
}

/**
 *  Expands the replies section, fetches from server
 *
 *  @param {S.Event} idHandler onclick handler that contains the id data
 */
function expandReplies(idHandler) {
  const id = idHandler.data;
  const elementId = 'element-' + id.toString();
  const placeholder = $('#replies-' + id.toString());
  placeholder.css('display', 'block');
  expandForum(placeholder, id, null);
  $('#' + elementId + ' .expand-button').css('display', 'none');
  $('#collapse-button-' + id.toString()).css('display', 'block');
}

/**
 *  Collapses the replies section for a specific element
 *
 *  @param {S.Event} idHandler onclick handler that contains the id data
 */
function collapseReplies(idHandler) {
  const id = idHandler.data;
  const elementId = 'element-' + id.toString();
  $('#replies-' + id.toString()).empty();
  $('#replies-' + id.toString()).css('display', 'none');
  $('#' + elementId + ' .expand-button').css('display', 'inline-block');
  $('#collapse-button-' + id.toString()).css('display', 'none');
}

/**
 *  Onclick handler for a user searching to reload forum with search parameter
 */
function search() {
  const search = $('#search-input').val();
  $('#search-input').val('');
  const id = -1;
  const placeholder = $('#forum-placeholder');
  expandForum(placeholder, id, search);
}

/**
 *  Returns whether a word of the search is contained with in the text
 *
 *  @param {String} text contents of a question
 *  @param {String} search contents of the user search
 *
 *  @return {Boolean} whether there is a word of the search within the text
 */
function containsSearch(text, search) {
  const stopWords = ['a', 'to', 'and', 'how', 'the', 'when', 'what', 'why',
    'what', 'where', 'or', 'do', 'can', 'use', 'i', 'you', 'my', 'your'];
  const lowerText = text.toLowerCase();
  const lowerSearch = search.toLowerCase();
  let words = lowerSearch.split(' ');
  words = words.filter( function(word) {
    return ((!stopWords.includes(word)) && (lowerText.includes(word)));
  });
  return (words.length > 0);
}

/**
 *  Post question to datastore
 */
function postQuestion() {
  const text = $('#question-form #text-input').val();
  const topic = $('#question-form #topic-input').val();
  $('#question-form #topic-input').val('Zoom');
  $('#question-form #text-input').val('');
  $.post('/forum?id=-1&action=reply&text=' + text + '&topic=' + topic +
      '&userId=' + userId).then(function() {
    getForum();
  });
}

/**
 *  Post comment basedd on id in idHandler
 *
 *  @param {S.Event} idHandler onclick handler that contains the id data
 */
function postComment(idHandler) {
  const id = idHandler.data;
  const elementId = 'element-' + id.toString();
  const text = $('#' + elementId + ' .text-input').val();
  $('#' + elementId + ' .text-input').val('');
  const numReplies = parseInt($('#' + elementId + ' .num-rep').val());
  $('#' + elementId + ' .num-rep').val(numReplies + 1);
  $.post('/forum?id=' + id.toString() + '&action=reply&text=' + text +
      '&userId=' + userId).then(function() {
    expandReplies(idHandler);
  });
}

/**
 *  Accepts comment based on id in idHandler
 *
 *  @param {S.Event} idHandler onclick handler that contains the id data
 */
function acceptComment(idHandler) {
  const id = idHandler.data;
  const elementId = 'element-' + id.toString();
  $('#' + elementId + ' .accept-button').css('display', 'none');
  $('#' + elementId + ' .accepted').css('display', 'inline-block');
  $.post('/forum?id=' + id.toString() + '&action=accepted');
}
