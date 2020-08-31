/* Zoom tutorial template data. Contains help links for Zoom. */

import {tutorialTemplate} from './tutorial-template.js';

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

const rendered = Mustache.render(tutorialTemplate, zoomData);
const element = $('#zoom-placeholder');
element.html(rendered);
