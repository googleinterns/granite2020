const gmeetData = {
  toolName: 'Google Meet',
  toolDescription: 'Video Communication Service',
  toolLink: 'https://meet.google.com/',
    usefulLinks: [
    {linkTitle: 'Google Meet Tools',
      links: [
        {url: 'https://support.google.com/meet/?hl=en#topic=7306097',
          linkName: 'Google Meet help center'
        },
        {url: 'https://support.google.com/a/users/answer/9300131?hl=en',
          linkName: 'Google Meet cheat sheet'
        }
      ]
  },

  {   linkTitle: "Starting",
      links: [
        { url: "https://support.google.com/meet/answer/9302870?co=GENIE.Platform%3DDesktop&amp;hl=en",
          linkName: "Start a Google Meet video meeting"
        },
        { url: "https://support.google.com/meet/answer/9303069?hl=en&amp;ref_topic=7192926",
          linkName: "Join a video meeting"
        },
        { url: "https://support.google.com/meet/answer/9303164?hl=en&amp;ref_topic=7192926",
          linkName: "Add or remove people from a Google Meet video meeting"
        }
      ]
  },

  {   linkTitle: "Video &#38; Audio Settings",
      links: [
        { url: "https://support.google.com/meet/answer/9302964?hl=en&amp;ref_topic=7294099",
          linkName: "Change your computer’s video and audio settings"
        },
        { url: "https://support.google.com/meet/answer/9584655?hl=en&amp;ref_topic=7294099",
          linkName: "Change your mobile camera or audio for Meet"
        }
      ]
  },

  {   linkTitle: "Meeting Settings",
      links: [
        { url: "https://support.google.com/meet/answer/9292748?hl=en&amp;ref_topic=7290350",
          linkName: "How to view people in the meeting"
        },
        { url: "https://support.google.com/meet/answer/7501121?hl=en&amp;ref_topic=7290350",
          linkName: "Pin, mute, or remove Google Meet participants"
        },
        { url: "https://support.google.com/meet/answer/9300310?hl=en&amp;ref_topic=7290350",
          linkName: "Use captions in a video meeting"
        },
        { url: "https://support.google.com/meet/answer/9308856?hl=en&amp;ref_topic=7290350",
          linkName: "Present during a video meeting"
        },
        { url: "https://support.google.com/meet/answer/7290353?hl=en&amp;ref_topic=7290350",
          linkName: "View meeting details and attachments"
        }
      ]
  }
],
usefulVids: [
  {   linkTitle: "Learn how to use Hangouts Meet",
      vidLink: "https://www.youtube.com/embed/K6vwkDZC0AY"
  },
  {   linkTitle: "Getting started with Google Meet",
      vidLink: "https://www.youtube.com/embed/Kb1129AsZLI"
  },
  {   linkTitle: "How to Use Google Meet - Detailed Tutorial",
      vidLink: "https://www.youtube.com/embed/wGXI0KpkR50"
  },
]
};

const rendered = Mustache.render(".../tutorials/tutorial-template.html", gmeetData);
const element = $('#gmeet-placeholder');
element.html(rendered);
