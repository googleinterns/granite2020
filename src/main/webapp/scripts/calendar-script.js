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
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    return events;
  })
}

function addEventToPage(event) {
  const summary = event.summary;
  const startDateTime = event.start.dateTime;
  const endDateTime = event.end.dateTime;
  const description = event.description;

  const listElement = document.createElement("LI");

  //summary
  const heading = document.createElement("h3");
  heading.appendChild(document.createTextNode(summary));
  listElement.appendChild(heading);

  //Time
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const timeNode = document.createElement("h4");
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);
  const startDate = monthNames[start.getMonth()]+" "+start.getDate()+", "+start.getFullYear();
  const endDate = monthNames[end.getMonth()]+" "+end.getDate()+", "+end.getFullYear();

  
  function getTime(dateTime){
    let time = "";
    if((dateTime.getHours()%12)==0){
      time+="12"
    } else {
      time+=dateTime.getHours()%12
    }  
    time+=":";
    if(start.getMinutes()<10){
      time+="0"+dateTime.getMinutes();
    } else {
      time+=dateTime.getMinutes();
    }
    return time
  }

  const startTime = getTime(start);
  const endTime = getTime(end);

  if (startDate == endDate){
    timeNode.appendChild(document.createTextNode(startDate+ " " + startTime + " - " + endTime))
  }
  listElement.appendChild(timeNode);  


  //description
  const descriptionNode = document.createElement("p");
  if(description){
    descriptionNode.appendChild(document.createTextNode(description));
  } else {
    descriptionNode.appendChild(document.createTextNode("No Description Available"));

  }
  listElement.appendChild(descriptionNode)

  //button
  const button = document.createElement('button');
  button.appendChild(document.createTextNode("Add to Calendar"))
  button.addEventListener("click", function(){
    addEventToCalendar(event, "primary")
    this.disabled = true;
    this.innerText="Event Added!"
    alert("Event Added!")
  })

  getPrimaryIds().then(function(primaryIds){
    if(primaryIds.has(event.id)){
      gapi.client.calendar.events.get({
        "calendarId": "primary",
        "eventId": event.id
      }).execute(function(e){
        if(e.status == "confirmed"){
          button.disabled = true;
          button.innerText = "Event Added!";
        }
      })
    }
  }).then(function(){
    listElement.appendChild(button);

  })


  $("#open-events").append(listElement) 

}

function addEventToCalendar(eventToAdd, calendarID) {
  getPrimaryIds().then(function(primaryIds){
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

function getPrimaryIds(){
  return getCalendarEvents('primary', true).then(function(events){
    let primaryIds = new Set();
    if (events.length > 0) {
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        primaryIds.add(event.id);
      }  
    }
    console.log(primaryIds);
    return primaryIds;
  })  
}