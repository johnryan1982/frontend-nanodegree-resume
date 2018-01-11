/*
  Considerations / Observations:

  * cannot wrap the entire script inside IIFE (without making significant
    changes to helper.js) as helper.js requires access to the global Resume
    object;

  * prefer `arr.forEach()` as opposed to `for()` loops as more compact,
    provides closures and therefore lends itself easily to functional
    programming;

  * prefer `$(obj).append(_Resume.HTMLString_)` as opposed to
    `$(obj).append($(_Resume.HTMLString_))` as it performs at least 5% quicker
    when tested on JSperf (https://jsperf.com/jquery-append-htmlstring-vs-jquery-element);

  * prefer to use `documentFragment`s and only appending to the DOM when
    required to prevent unnecessary DOM reflows/repaints
*/

/* Minimise globals footprint by creating a Resume object */
Resume = window.Resume || {};

/**
* @description Replace oldStr with newStr for a given template
* @param {string} oldStr
* @param {string} newStr
* @param {string} template
* @returns {string} New string
*/
const _supplant = (oldStr, newStr, template) =>
  template.replace(oldStr, newStr);

/**
* @description Convenience method for replacing the string `%data%` with some
content for a given template. Makes use of the `supplant` function
* @param {string} content
* @param {string} template
* @returns {string} New string
*/
const _replaceData = (content, template) =>
  _supplant('%data%', content, template);

/* Biography at a glance */
Resume.bio = {
  name: "John Ryan",
  role: "Front-End Developer",
  contacts: {
    mobile: "+44712345678",
    email: "hello@john-ryan.info",
    github: "johnryan1982",
    location: "SW London, UK"
  },

  welcomeMessage: "A software engineer with over 10 years worth of professional"
    + " experience in developing a variety of front-end solutions for clients"
    + " ranging from small startups through to established multi-nationals."
    + " These solutions have included simple websites through to large web"
    + " applications. Specialties include JavaScript, CSS, HTML, Node.js, Dart,"
    + " PHP, open-source and web performance.",

  skills: [
    "JavaScript - vanilla JS, ECMAScript 6, Node.js along with popular JS "
      + "frameworks & libraries"
  ],

  biopic: "//gravatar.com/avatar/186b65f0404c63825b28710da670b293?s=220",

  /**
  * @description Generate HTML content and inject into DOM
  */
  display: function () {
    var bio = this,
      docFrag = $(document.createDocumentFragment()),
      container = $('#header'),
      topContacts = container.find('#topContacts'),
      skills,
      markup = Resume.markup;

    /*
      First round of content injection into DOM.
      Name & role both appear *before* the existing contacts placeholder
    */
    docFrag.append(_replaceData(bio.name, markup.HTMLheaderName));
    docFrag.append(_replaceData(bio.role, markup.HTMLheaderRole));
    docFrag.insertBefore(topContacts);

    /*
      Second round of content injection into DOM.
      Contact channels.
      Note that we re-use the (now empty) documentFragment so as to
      prevent a new object invocation
    */
    topContacts.append(Resume.printContactInfo());

    /*
      Third round of content injection into DOM.
      Bio picture and welcome message
    */
    docFrag.append(_replaceData(bio.biopic, markup.HTMLbioPic));
    docFrag.append(_replaceData(bio.welcomeMessage, markup.HTMLwelcomeMsg));
    container.append(docFrag);

    /*
      Fourth round of content injection into DOM.
      Skills
    */
    skills = bio.skills;
    if (skills.length > 0) {
      /* Inject header and containing `<div>` */
      container.append(markup.HTMLskillsStart);

      /* Generate new content, then add to injected `<div>` */
      skills.forEach((skill) => {
        docFrag.append(_replaceData(skill, markup.HTMLskills));
      });
      $('#skills', container).append(docFrag);
    }
  }
};

/* Education at a glance */
Resume.education = {
  schools: [
    {
      name: "The University of Liverpool",
      location: "Liverpool, UK",
      degree: "BSc Hons Computer Science (2:i)",
      majors: ["Computer Science"],
      dates: "September 2000 - May 2003",
      url: "//www.liverpool.ac.uk/study/undergraduate/courses/computer-science-bsc-hons/overview/"
    }
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

/* Employment at a glance */
Resume.work = {
  jobs: [
    {
      employer: "Wulf & Lamb",
      title: "Technical Consultant",
      location: "London, UK",
      dates: "February 2016 - in progress",
      description: "I have been providing ongoing technical guidance and"
        + " assistance to a London-based eatery, with a primary focus on"
        + " frontend solutions and email services."
    },
    {
      employer: "Ancoa Software",
      title: "Lead Front-End Developer",
      location: "London, UK",
      dates: "September 2014 - April 2016",
      description: "Ancoa provides contextual surveillance and insightful"
        + " analytics for exchanges, regulators, buy and sell-side companies."
        + " Their main product, AncoaSuite, is a desktop application written in"
        + " C++. I was employed as their first frontend developer, tasked with"
        + " building a frontend team and replicating the suite within the"
        + " browser.<br><br>After successfully developing a JavaScript"
        + " prototype (MEAN: Angular and D3, backed by Node.js, Express and"
        + " MongoDB), the company took the initiative to focus development on"
        + " the WebApp. Given the weighting of C++ developers, a decision was"
        + " made to use Google Dart, a C-style language that transpiles into"
        + " JavaScript. I spent 6 months laying the foundations for the new"
        + " project; mentoring existing developers; and recruiting additional"
        + " junior developers to form a frontend team. However, due to a change"
        + " in personnel on the board and a change of direction from the senior"
        + " management team, frontend resources were reduced and progress"
        + " slowed. Shortly after this point, I chose to pursue other interests"
        + " including a return to working in native frontend technologies."
    },
    {
      employer: "North Plains Ltd (formerly VYRE)",
      title: "Technical Consultant",
      location: "London, UK",
      dates: "August 2013 - August 2014",
      description: "On returning from Canada, I resumed my employment with VYRE"
        + " who had recently been acquired by North Plain Ltd. As a Technical"
        + " Consultant I lead a team of developers, designers and testers to"
        + " produce solutions built on the company's bespoke Content Management"
        + " System. I was responsible for managing development for a number of"
        + " customers including our flagship client, Diageo Plc."
        + " Responsibilities included defining product requirements and"
        + " specifications alongside key stakeholders; producing detailed"
        + " estimates and resource schedules; managing project budgets; and"
        + " managing relationships with principle stakeholders."
    },
    {
      employer: "Sprout At Work",
      title: "Lead Front-End Developer",
      location: "Vancouver, CA",
      dates: "June 2012 - April 2013",
      description: "Whilst on a sabatical from VYRE, I worked as the lead"
        + " frontend developer for Sprout At Work, a small startup based in"
        + " downtown Vancouver who gamified living a healthy lifestyle."
        + " Organisations would subscribe to a hosted service and be provided"
        + " with access to a webapp where each employee had the opportunity to"
        + " log activities and to be rewarded with points. The premise was that"
        + " leading a healthy lifestyle reduced absenteeism and encouraged a"
        + " more productive employee. Most organisations chose to incentivise"
        + " participating employees in ways such as free sports equipment,"
        + " healthy breakfasts and weekly yoga classes during office hours."
        + "<br><br>As their first permanent developer I was tasked with"
        + " expanding the core functionality of their webapp built using the"
        + " PHP CodeIgniter framework. My first task was to refactor the"
        + " existing codebase and restructure the webapp to take advantage of"
        + " modern browser capabilities through the use of modular components"
        + " and client-side processing. This in turn resulted more responsive"
        + " webapp. I was also heavily involved in implementing several new key"
        + " features including: sandboxed, whitelabelled environments including"
        + " a CMS; user profiles and personal goal management complete with a"
        + " badge system for rewarding users; a shared organisation-wide"
        + " leaderboard; location-based groups within the organisation to"
        + " encourage inter-office and inter-organisation participation;"
        + " automated testing and staging environments, and document"
        + " generation.<br><br>Upon completion of the whitelabeling and"
        + " integrated location-based grouping, Sprout was able to successfully"
        + " apply for local funding which funded expanding the team. I assisted"
        + " in recruiting additional developers - both permanent and"
        + " contract-based - along with a Project Manager.<br><br>With these"
        + " new features, Sprout partnered with organisations including ATB"
        + " Financial, TD Canada, Scotiabank, McKesson Corporation, City of"
        + " Hamilton and BC Ferries. The system was able to cope with the"
        + " influx of over forty thousand new user accounts, culminating in"
        + " loads of over eight thousand concurrent users during peak times."
        + "<br><br>In February 2013, we were proudly selected to participate in"
        + " the inaugural Nike+ Accelerator programme as one of 10"
        + " hand-selected companies."
    },
    {
      employer: "VYRE",
      title: "Lead Front-End Developer",
      location: "London, UK",
      dates: "September 2008 - April 2012",
      description: "VYRE was a mid-sized software house who built and"
        + " maintained a Java framework named Unify. I was a member of their"
        + " Professional Services team who leveraged Unify to create bespoke"
        + " Content Management Systems (CMS) and Digital Asset Management (DAM)"
        + " solutions for large corporations. These solutions ranged from"
        + " internal, closed systems such as Diageo’s SmartBrand with custom"
        + " workflows and complex approval processes, to public facing websites"
        + " such as Inghams (travel website; 10,000’s page views/day) and"
        + " ESPNStar (now FOXSports Asia; television network website; 100,000’s"
        + " page views/day peaking at millions of page views/day during the"
        + " cricket season) both of which had custom external feeds driving"
        + " their content.<br><br>All of our client solutions were developed"
        + " using either native JavaScript or the jQuery library (as determined"
        + " by the client’s internal DevOps/Developers) to complement the"
        + " standard HTML and CSS. Site content would be polled where"
        + " appropriate using AJAX and the content returned as XML. The"
        + " Extensible Stylesheet Language (XSL) was used to transform this"
        + " content as required into either Resume.HTML or CSS, and on"
        + " occasion, to generate further custom JavaScript to be injected into"
        + " the webpage. I would often need to create custom Java classes to"
        + " extend the otherwise limited XSL transformers."
      }
  ],

  display: function () {
    console.log('Resume.work()');
  }
};

/* Projects at a glance */
Resume.projects = {
  projects: [
    {
      title: "PlantNation",
      dates: "September 2015 - September 2016",
      description: "Website design, development and maintenance services for a"
        + " plant-based delicatessen",
      images: ["images/197x148.gif", "images/197x148.gif"]
    },
    {
      title: "RPS London Limited",
      dates: "April 2016 - in progress",
      description: "Website design, development and maintenance services",
      images: ["images/197x148.gif", "images/197x148.gif"]
    }
  ],

  display: function () {
    console.log('Resume.projects()');
  }
};

Resume.footer =  {
  display: function () {
    $('#footerContacts').append(Resume.printContactInfo());
  }
};

Resume.printContactInfo = (function _generateContactInfo(channels) {
  /* Generate a single instance of the "common" HTML and cache */
  var docFrag = $(document.createDocumentFragment()),
    markup = Resume.markup;

  Object.keys(channels).forEach((channel) => {
    if (typeof channels[channel] === 'object') return;
    var template = markup['HTML' + channel] || markup.HTMLcontactGeneric;
    docFrag.append(_replaceData(channels[channel], template));
  });

  /*
    Thanks to the closure, each Resume.printContactInfo() invocation will now
    receive a unique cloned instance of the original DOMFragment; not using
    a closure would result in a single DOMFragment, which would be moved to a
    new parent DOMElement with *each* function invocation
  */
  return () => docFrag.clone();
})(Resume.bio.contacts);

Resume.bio.display();
Resume.footer.display();
