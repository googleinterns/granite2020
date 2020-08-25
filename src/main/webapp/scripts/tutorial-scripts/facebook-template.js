import {tutorialTemplate} from './tutorial-template.js';

const facebookData = {
  toolName: 'Facebook',
  toolDescription: 'Social Media Tool',
  toolLink: 'https://www.facebook.com/',
  usefulLinks: [
    {linkTitle: 'Getting started with Facebook',
      links: [
        {url: 'https://www.wikihow.com/Use-Facebook',
          linkName: 'How to Use Facebook',
        },
      ],
    },

    {linkTitle: 'Privacy',
      links: [
        {url: 'https://www.lifewire.com/steps-to-make-facebook-private-2654416',
          linkName: 'How to make your Facebook account private',
        },
      ],
    },

    {linkTitle: 'Posting & Sharing on Facebook',
      links: [
        {url: 'https://www.wikihow.com/Post-to-Facebook',
          linkName: 'How to Post to Facebook',
        },
        {url: 'https://www.facebook.com/help/170116376402147',
          linkName: 'How do I share something on Facebook?',
        },
      ],
    },

    {linkTitle: 'Commenting & Reacting on Facebook',
      links: [
        {url: 'https://www.facebook.com/help/187302991320347',
          linkName: 'How do I comment on something I see on Facebook?',
        },
        {url: 'https://buffer.com/resources/facebook-reactions/#:~:text=To%20add%20a%20Reaction%2C%20hold,%2C%20Wow%2C%20Sad%20or%20Angry.',
          linkName: 'Adding a reaction on Facebook',
        },
      ],
    },

    {linkTitle: 'Adding Friends',
      links: [
        {url: 'https://www.facebook.com/help/246750422356731/?helpref=hc_fnav',
          linkName: 'Questions on adding friends',
        },
        {url: 'https://www.facebook.com/help/273948399619967/?helpref=hc_fnav',
          linkName: 'Control Who Can Friend and Follow You',
        },
        {url: 'https://www.facebook.com/help/1000976436606344/?helpref=hc_fnav',
          linkName: 'Unfriending or Blocking Someone',
        },
      ],
    },
  ],

  usefulVids: [
    {linkTitle: 'How to use Facebook',
      vidLink: 'https://www.youtube.com/embed/fGcHOcj1SQA',
    },
    {linkTitle: 'Facebook basics tutorial for beginners & seniors',
      vidLink: 'https://www.youtube.com/embed/wkVf8BlE8rI',
    },
    {linkTitle: 'How to share Facebook posts',
      vidLink: 'https://www.youtube.com/embed/zvFaJ7aIh1w',
    },
  ],
};

const rendered = Mustache.render(tutorialTemplate, facebookData);
const element = $('#facebook-placeholder');
element.html(rendered);
