import {forumTemplate} from './forum-template.js';

$( document ).ready( function() {
  getForum();
  getFilters();
  $('#search-button').click(search);
  $('#search-input').keyup(search);
});

/**
 *  Populates forum-placeholder with forum data
 */
function getForum() {
  const id = -1;
  const placeholder = $('#forum-placeholder');
  expandForum(placeholder, id);
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
}

/**
 *  Populates the replies for a forum element with the given id
 *  in the placeholder given with no search keywords
 *
 *  @param {S.fn.init} placeholder the div that will hold the forum elements
 *  @param {long} id the long that identifies the parent of the forum
 *  elements
 */
function expandForum(placeholder, id) {
  // Call expandForumWithSearch with the search parameter as null so that
  // no search is considered
  expandForumWithSearch(placeholder, id, null);
}

/**
 *  Populates the replies for a forum element with the given id
 *  in the placeholder given also based on search keywords if present
 *
 *  @param {S.fn.init} placeholder the div that will hold the forum elements
 *  @param {long} id the long that identifies the parent of the forum
 *  elements
 *  @param {String} search search text from user if applicable
 */
function expandForumWithSearch(placeholder, id, search) {
  placeholder.empty();
  fetch('/forum?id=' + id.toString())
      .then((response) => (response.json())).then((elements) => {
        for (let i = 0; i < elements.length; i++) {
          if (!search || containsSearch(elements[i].text, search)) {
            createForumElement(placeholder, elements[i]);
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
  const elementId = 'element-' + element.id.toString();
  elementDiv.attr('id', elementId);
  placeholder.append(elementDiv);

  const data = createElementData(element);

  const rendered = Mustache.render(forumTemplate, data);
  elementDiv.html(rendered);

  /* Add onclick functionality to mustache render */
  $('#' + elementId + ' .like-button').click(element.id, incrementLikes);
  $('#' + elementId + ' .reply-button').click(element.id, reply);
  $('#' + elementId + ' .expand-button').click(element.id, expandReplies);
  $('#' + elementId + ' .collapse-button').click(element.id, collapseReplies);
  // TODO: Make posting a reply not a form that redirects the page but just
  // adds to the current page
  // TODO: create a method for accepting an answer, once user data is inputted
}

/**
 *  Creates json data for mustache render
 *
 *  @param {ForumElement} element the ForumElement that contains the data for
 *  the element
 *  @return {Object} a populated json object
 */
function createElementData(element) {
  /* If element is a comment or question and thus whether the topic should be
   * displayed */
  let elementType = 'comment';
  let topicDisplay = 'none';
  if (element.parentId == -1) {
    elementType = 'question';
    topicDisplay = 'inline-block';
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
    topic: element.topic,
    date: convertTimestampToDate(element.timestamp),
    text: element.text,
    likes: element.likes,
    id: element.id,
    repliesDisplay: repliesDisplay,
    numReplies: element.numberReplies,
  };

  return data;
}

/**
 *  Converts a timestamp in milliseconds into a date based on UTC
 *
 *  @param {long} timestamp the time in milliseconds
 *  @return {String} a String of the time as a date
 */
function convertTimestampToDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Add one because the month is zero index
  const year = date.getFullYear();
  return (month + '/' + day + '/' + year);
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
  const likes = parseInt($('#' + elementId + ' .likes').text());
  $('#' + elementId + ' .likes').text(likes + 1);
}

/**
 *  Displays the reply form for a given element
 *
 *  @param {S.Event} idHandler onclick handler that contains the id data
 */
function reply(idHandler) {
  const id = idHandler.data;
  const elementId = 'element-' + id.toString();
  $('#' + elementId + ' .response-form').css('display', 'inline-block');
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
  expandForum(placeholder, id);
  $('#' + elementId + ' .expand-button').css('display', 'none');
  $('#' + elementId + ' .collapse-button').css('display', 'block');
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
  $('#' + elementId + ' .collapse-button').css('display', 'none');
}

/**
 *  Onclick handler for a user searching to reload forum with search parameter
 */
function search() {
  const search = $('#search-input').val();
  const id = -1;
  const placeholder = $('#forum-placeholder');
  expandForumWithSearch(placeholder, id, search);
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
  return words.length > 0;
}
