/// namespace
const Resume = window.Resume || {};

/// biography at a glance
Resume.bio = {
  name: "John Ryan",
  role: "Front-End Developer",
  contacts: {
    mobile: "+44712345678",
    email: "hello@john-ryan.info",
    github: "johnryan1982",
    location: "SW London, UK"
  },

  welcomeMessage: "A software engineer with over 10 years worth of professional experience in developing a variety of front-end solutions for clients ranging from small startups through to established multi-nationals. These solutions have included simple websites through to large web applications. Specialties include JavaScript, CSS, HTML, Node.js, Dart, PHP, open-source and web performance.",

  skills: [
    "JavaScript - vanilla JS, ECMAScript 6, Node.js along with popular JS frameworks & libraries"
  ],

  biopic: "http://gravatar.com/avatar/186b65f0404c63825b28710da670b293?s=220",

  display: function () {
    console.log('Resume.bio()');
};
