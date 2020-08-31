import {updateBar} from './nav-bar.js';
import {initPromise} from './account-info.js';


initPromise.then(function() {
  const auth2 = gapi.auth2.getAuthInstance();
  updatePage();
  auth2.isSignedIn.listen(updatePage);
  gapi.client.load('calendar', 'v3', function() {
    getCalendarEvents('c_96sboq7a00dhtc9c24pr7mpi3o@group.calendar.google.com', false)
        .then(function(events) {
      if (events.length > 0) {
        for (let i = 0; i < events.length; i++) {
          const event = events[i];
          addEventToPage(event);
        }
      }
    });
  });
});

/**
 * Gets events from a calendar with specified ID
 * @param {String} id ID of calendar we want events from
 * @param {Boolean} deleted Whether or not we want to include deleted events
 * @return {Promise} Promise which resolves after the events of the calendar are listed
 */
function getCalendarEvents(id, deleted) {
  return gapi.client.calendar.events.list({
    'calendarId': id,
    'timeMin': (new Date()).toISOString(),
    'showDeleted': deleted,
    'singleEvents': true,
    'orderBy': 'startTime',
  }).then(function(response) {
    const events = response.result.items;
    return events;
  });
}

/**
 * Adds an event to the webpage
 * @param {Event} event Event to add
 */
function addEventToPage(event) {
  const summary = event.summary;
  const startDateTime = event.start.dateTime;
  const endDateTime = event.end.dateTime;
  const description = event.description;

  const listElement = document.createElement('LI');
  const leftDiv = document.createElement('div');

  // summary
  const heading = document.createElement('h3');
  heading.appendChild(document.createTextNode(summary));
  leftDiv.appendChild(heading);

  // Time
  const monthNames = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const timeNode = document.createElement('h4');
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);
  const startDate = monthNames[start.getMonth()] + ' ' +
      start.getDate() + ', ' + start.getFullYear();
  const endDate = monthNames[end.getMonth()] + ' ' +
      end.getDate() + ', ' + end.getFullYear();

  /**
   * Gets the time string from the Date object
   * @param {Date} dateTime Date from which we receive the time string from
   * @return {String} String which represents time
   */
  function getTime(dateTime) {
    let time = '';
    if ((dateTime.getHours() % 12) == 0) {
      time += '12';
    } else {
      time += dateTime.getHours() % 12;
    }
    time += ':';
    if (dateTime.getMinutes() < 10) {
      time += '0' + dateTime.getMinutes();
    } else {
      time+=dateTime.getMinutes();
    }
    return time;
  }

  const startTime = getTime(start);
  const endTime = getTime(end);

  if (startDate == endDate) {
    timeNode.appendChild(
        document.createTextNode(
            startDate+ ' ' + startTime + ' - ' + endTime));
  }
  leftDiv.appendChild(timeNode);


  // description
  const descriptionNode = document.createElement('p');
  if (description) {
    descriptionNode.appendChild(document.createTextNode(description));
  } else {
    descriptionNode.appendChild(
        document.createTextNode('No Description Available'));
  }
  leftDiv.appendChild(descriptionNode);
  leftDiv.classList.add('summary');

  listElement.append(leftDiv);

  // button
  const button = document.createElement('button');
  button.appendChild(document.createTextNode('Add to Calendar'));
  button.addEventListener('click', function() {
    addEventToCalendar(event, 'primary');
    this.disabled = true;
    this.innerText='Event Added!';
  });

  getPrimaryIds().then(function(primaryIds) {
    if (primaryIds.has(event.id)) {
      gapi.client.calendar.events.get({
        'calendarId': 'primary',
        'eventId': event.id,
      }).execute(function(e) {
        if (e.status == 'confirmed') {
          button.disabled = true;
          button.innerText = 'Event Added!';
        }
      });
    }
  }).then(function() {
    listElement.appendChild(button);
  });
  $('#open-events').append(listElement);
}

/**
 * Adds an event to calendar with given id
 * @param {Event} eventToAdd Event to be added
 * @param {String} calendarID ID of calendar that is targeted
 */
function addEventToCalendar(eventToAdd, calendarID) {
  getPrimaryIds().then(function(primaryIds) {
    if (primaryIds.has(eventToAdd.id)) {
      const getRequest = gapi.client.calendar.events.get({
        'calendarId': calendarID,
        'eventId': eventToAdd.id,
      });
      getRequest.execute(function(e) {
        console.log(e);
        gapi.client.calendar.events.patch({
          'calendarId': calendarID,
          'eventId': e.id,
          'status': 'confirmed',
        }).execute();
      });
    } else {
      const request = gapi.client.calendar.events.insert({
        'calendarId': calendarID,
        'resource': eventToAdd,
      });
      request.execute(function(event) {
        console.log('Event created: ' + event.htmlLink);
      });
    }
  });
}

/**
 * Gets the IDs of all of the events in the user's primary calendar
 * @return {Promise} Promise which resolves after primary events are read
 */
function getPrimaryIds() {
  return getCalendarEvents('primary', true).then(function(events) {
    const primaryIds = new Set();
    if (events.length > 0) {
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        primaryIds.add(event.id);
      }
    }
    console.log(primaryIds);
    return primaryIds;
  });
}
