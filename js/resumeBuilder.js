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

/// education at a glance
Resume.education = {
  schools: [
    {
      name: "The University of Liverpool",
      location: "Liverpool, UK",
      degree: "BSc Hons Computer Science (2:i)",
      majors: ["Computer Science"],
      dates: "September 2000 - May 2003",
      url: "//www.liverpool.ac.uk/study/undergraduate/courses/computer-science-bsc-hons/overview/"    }
  ],

  onlineCourses: [
    {
      title: "JavaScript Crash Course",
      school: "Udacity",
      dates: "July 2017 - August 2017",
      url: "//www.udacity.com/course/ud804"
    },
    {
      title: "Front-End Web Developer Nanodegree",
      school: "Udacity",
      dates: "December 2016 - January 2018",
      url: "//www.udacity.com/course/nd001"
    }
  ],

  display: function () {
    console.log('Resume.education()');
  }
};
