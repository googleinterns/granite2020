import {updateBar} from './nav-bar.js';
import {initPromise} from './account-info.js';


initPromise.then(function(){
  var auth2 = gapi.auth2.getAuthInstance();
  updatePage();
  auth2.isSignedIn.listen(updatePage);
  gapi.client.load('calendar', 'v3', function(){
    getCalendarEvents('c_96sboq7a00dhtc9c24pr7mpi3o@group.calendar.google.com', false).then(function(events){
      if (events.length > 0) {
        for (var i = 0; i < events.length; i++) {
          var event = events[i];
          addEventToPage(event);
        }  
      }
    })
  })
})

function updatePage(isSignedIn) {
  updateBar();
}

function getCalendarEvents(id, deleted){
  return gapi.client.calendar.events.list({
    'calendarId': id,
    'timeMin': (new Date()).toISOString(),
    'showDeleted': deleted,
    'singleEvents': true,
    'maxResults': 30,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    return events;
  })
}

function addEventToPage(event) {
  const summary = event.summary;
  const startTime = event.start.dateTime;
  const endTime = event.end.dateTime;
  const description = event.description;

  const displayedText = summary + " " + description;
  const listElement = document.createElement("LI");
  listElement.appendChild(document.createTextNode(displayedText));
  document.getElementById("open-events").appendChild(listElement)
  listElement.addEventListener("click", function(){
    addEventToCalendar(event, "primary")
    alert("Event Added!")
  })
}

function addEventToCalendar(eventToAdd, calendarID) {
  getCalendarEvents('primary', true).then(function(events){
    let primaryIds = new Set();
    if (events.length > 0) {
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        primaryIds.add(event.id);
      }  
    }
    console.log(primaryIds);
    console.log(eventToAdd.id);
    if (primaryIds.has(eventToAdd.id)){
      var getRequest = gapi.client.calendar.events.get({
        "calendarId": calendarID,
        "eventId": eventToAdd.id  
      });
      getRequest.execute(function(e){
        console.log(e);
        gapi.client.calendar.events.patch({
          "calendarId": calendarID,
          'eventId': e.id,
          'status': 'confirmed'
        }).execute()
      });

    } else {
      var request = gapi.client.calendar.events.insert({
        'calendarId': calendarID,
        'resource': eventToAdd
      });
      
      request.execute(function(event) {
        console.log('Event created: ' + event.htmlLink);
      });
    }
  })





}