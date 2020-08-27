// Template for mustache rendering tutorial pages
// Facebook tutorial template data. Contains help links for Facebook

import {tutorialTemplate} from './tutorial-template.js';

const facebookData = {
  toolName: 'Facebook',
  toolDescription: 'Social Media Tool',
  toolLink: 'https://www.facebook.com/',
  usefulLinks: [
    {linkTitle: 'Getting started with Facebook',
      links: [
        {
          url: 'https://www.wikihow.com/Use-Facebook',
          linkName: 'How to Use Facebook',
        },
      ],
    },

    {linkTitle: 'Privacy',
      links: [
        {
          url: 'https://www.lifewire.com/steps-to-make-facebook-private-2654416',
          linkName: 'How to make your Facebook account private',
        },
      ],
    },

    {linkTitle: 'Posting & Sharing on Facebook',
      links: [
        {
          url: 'https://www.wikihow.com/Post-to-Facebook',
          linkName: 'How to Post to Facebook',
        },
        {
          url: 'https://www.facebook.com/help/170116376402147',
          linkName: 'How do I share something on Facebook?',
        },
      ],
    },

    {linkTitle: 'Commenting & Reacting on Facebook',
      links: [
        {
          url: 'https://www.facebook.com/help/187302991320347',
          linkName: 'How do I comment on something I see on Facebook?',
        },
        {
          url: 'https://buffer.com/resources/facebook-reactions/#:~:text=To%20add%20a%20Reaction%2C%20hold,%2C%20Wow%2C%20Sad%20or%20Angry.',
          linkName: 'Adding a reaction on Facebook',
        },
      ],
    },

    {linkTitle: 'Adding Friends',
      links: [
        {
          url: 'https://www.facebook.com/help/246750422356731/?helpref=hc_fnav',
          linkName: 'Questions on adding friends',
        },
        {
          url: 'https://www.facebook.com/help/273948399619967/?helpref=hc_fnav',
          linkName: 'Control Who Can Friend and Follow You',
        },
        {
          url: 'https://www.facebook.com/help/1000976436606344/?helpref=hc_fnav',
          linkName: 'Unfriending or Blocking Someone',
        },
      ],
    },
  ],

  usefulVids: [
    {
      linkTitle: 'How to use Facebook',
      vidLink: 'https://www.youtube.com/embed/fGcHOcj1SQA',
    },
    {
      linkTitle: 'Facebook basics tutorial for beginners & seniors',
      vidLink: 'https://www.youtube.com/embed/wkVf8BlE8rI',
    },
    {
      linkTitle: 'How to share Facebook posts',
      vidLink: 'https://www.youtube.com/embed/zvFaJ7aIh1w',
    },
  ],
};

const gmeetData = {
  toolName: 'Google Meet',
  toolDescription: 'Video Communication Service',
  toolLink: 'https://meet.google.com/',
  usefulLinks: [
    {linkTitle: 'Google Meet Tools',
      links: [
        {
          url: 'https://support.google.com/meet/?hl=en#topic=7306097',
          linkName: 'Google Meet help center',
        },
        {
          url: 'https://support.google.com/a/users/answer/9300131?hl=en',
          linkName: 'Google Meet cheat sheet',
        },
      ],
    },

    {linkTitle: 'Starting',
      links: [
        {
          url: 'https://support.google.com/meet/answer/9302870?co=GENIE.Platform%3DDesktop&amp;hl=en',
          linkName: 'Start a Google Meet video meeting',
        },
        {
          url: 'https://support.google.com/meet/answer/9303069?hl=en&amp;ref_topic=7192926',
          linkName: 'Join a video meeting',
        },
        {
          url: 'https://support.google.com/meet/answer/9303164?hl=en&amp;ref_topic=7192926',
          linkName: 'Add or remove people from a Google Meet video meeting',
        },
      ],
    },

    {linkTitle: 'Video & Audio Settings',
      links: [
        {
          url: 'https://support.google.com/meet/answer/9302964?hl=en&amp;ref_topic=7294099',
          linkName: 'Change your computer’s video and audio settings',
        },
        {
          url: 'https://support.google.com/meet/answer/9584655?hl=en&amp;ref_topic=7294099',
          linkName: 'Change your mobile camera or audio for Meet',
        },
      ],
    },

    {linkTitle: 'Meeting Settings',
      links: [
        {
          url: 'https://support.google.com/meet/answer/9292748?hl=en&amp;ref_topic=7290350',
          linkName: 'How to view people in the meeting',
        },
        {
          url: 'https://support.google.com/meet/answer/7501121?hl=en&amp;ref_topic=7290350',
          linkName: 'Pin, mute, or remove Google Meet participants',
        },
        {
          url: 'https://support.google.com/meet/answer/9300310?hl=en&amp;ref_topic=7290350',
          linkName: 'Use captions in a video meeting',
        },
        {
          url: 'https://support.google.com/meet/answer/9308856?hl=en&amp;ref_topic=7290350',
          linkName: 'Present during a video meeting',
        },
        {
          url: 'https://support.google.com/meet/answer/7290353?hl=en&amp;ref_topic=7290350',
          linkName: 'View meeting details and attachments',
        },
      ],
    },
  ],

  usefulVids: [
    {
      linkTitle: 'Learn how to use Hangouts Meet',
      vidLink: 'https://www.youtube.com/embed/K6vwkDZC0AY',
    },
    {
      linkTitle: 'Getting started with Google Meet',
      vidLink: 'https://www.youtube.com/embed/Kb1129AsZLI',
    },
    {
      linkTitle: 'How to Use Google Meet - Detailed Tutorial',
      vidLink: 'https://www.youtube.com/embed/wGXI0KpkR50',
    },
  ],
};

const zoomData = {
  toolName: 'Zoom',
  toolDescription: 'Video Communication Tool',
  toolLink: 'https://zoom.us/',
  usefulLinks: [
    {linkTitle: 'Getting started with Zoom',
      links: [
        {
          url: 'https://support.zoom.us/hc/en-us/articles/206618765-Zoom-video-tutorials',
          linkName: 'Zoom Video Tutorials',
        },
        {
          url: 'https://support.zoom.us/hc/en-us/categories/200101697',
          linkName: 'Zoom getting started',
        },
      ],
    },

    {linkTitle: 'Desktop',
      links: [
        {
          url: 'https://support.zoom.us/hc/en-us/articles/201362033-Getting-Started-on-Windows-and-Mac',
          linkName: 'Getting started on Windows and Mac',
        },
      ],
    },

    {linkTitle: 'Mobile',
      links: [
        {
          url: 'https://support.zoom.us/hc/en-us/articles/201362993-Getting-Started-with-iOS',
          linkName: 'Getting started with IOS (Apple)',
        },
        {
          url: 'https://support.zoom.us/hc/en-us/articles/200942759-Getting-Started-with-Android',
          linkName: 'Getting started with Android (Google)',
        },
      ],
    },

    {linkTitle: 'Zoom General Help',
      links: [
        {
          url: 'https://support.zoom.us/hc/en-us/articles/201362193-Joining-a-meeting',
          linkName: 'Joining a meeting',
        },
        {
          url: 'https://support.zoom.us/hc/en-us/articles/201362613-How-Do-I-Host-A-Video-Meeting-',
          linkName: 'Hosting a meeting',
        },
        {
          url: 'https://support.zoom.us/hc/en-us/articles/201362413-Scheduling-meetings',
          linkName: 'Scheduling a meeting',
        },
      ],
    },

    {linkTitle: 'Not working?',
      links: [
        {
          url: 'https://support.zoom.us/hc/en-us/articles/202952568-My-Video-Camera-Isn-t-Working',
          linkName: 'My Video/Camera is not working',
        },
        {
          url: 'https://support.zoom.us/hc/en-us/articles/204484835-My-Audio-is-Not-Working-on-iOS-or-Android',
          linkName: 'My Audio is not working on iOS or Android',
        },
      ],
    },
  ],

  usefulVids: [
    {
      linkTitle: 'How to Use Zoom - Beginners Guide',
      vidLink: 'https://www.youtube.com/embed/fMUxzrgZvZQ',
    },
    {
      linkTitle: 'Downloading Zoom',
      vidLink: 'https://www.youtube.com/embed/qsy2Ph6kSf8',
    },
    {
      linkTitle: 'Meeting Controls',
      vidLink: 'https://www.youtube.com/embed/ygZ96J_z4AY',
    },
  ],
};

let rendered;

$("#zoom").click(function() {
  //var promise = new Promise(function(resolve,reject){
  rendered = Mustache.render(tutorialTemplate, zoomData);
  console.log(rendered);
  

  // resolve();
  // });

  
  //promise.then(function(){
  
  //})

  //console.log(rendered);
});
export{rendered};



/*
var zoomLink = document.getElementById('zoom');

zoomLink.onclick = function() {
  const renderedZoom = Mustache.render(tutorialTemplate, zoomData);
  const elementZoom = $('#tutorial-placeholder');
  elementZoom.html(renderedZoom);
  console.log("zoom");
}
*/

/*
function myZoom() {
  const renderedZoom = Mustache.render(tutorialTemplate, zoomData);
  const elementZoom = $('#tutorial-placeholder');
  elementZoom.html(renderedZoom);
  console.log("zoom");
}
*/

const renderedGmeet = Mustache.render(tutorialTemplate, gmeetData);
const elementGmeet = $('#gmeet-placeholder');
elementGmeet.html(renderedGmeet);

const renderedFacebook = Mustache.render(tutorialTemplate, facebookData);
const elementFacebook = $('#facebook-placeholder');
elementFacebook.html(renderedFacebook);
