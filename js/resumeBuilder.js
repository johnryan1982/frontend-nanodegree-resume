/*
  Considerations / Observations:

  * cannot wrap the entire script inside IIFE (without making significant
    changes to helper.js) as helper.js requires access to the global Resume
    object;

  * prefer `arr.forEach()` as opposed to `for()` loops as more compact,
    provides closures and therefore lends itself easily to functional
    programming;

  * prefer `$(obj).append(_Resume.markup.HTMLString_)` as opposed to
    `$(obj).append($(_Resume.markup.HTMLString_))` as it performs at least 5%
    quicker when tested on JSperf (https://jsperf.com/jquery-append-htmlstring-vs-jquery-element);

  * prefer to use `documentFragment`s and only appending to the DOM when
    required to prevent unnecessary DOM reflows/repaints;

  * use Google's Reverse Geocoding example page to easily generate lat/lng
    combinations when necessary (https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding)
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
const _supplant = function (oldStr, newStr, template) {
  return template.replace(oldStr, newStr);
};

/**
* @description Convenience method for replacing the placeholder `%data%`
with some content for a given template. Makes use of the `supplant` function
* @param {string} content
* @param {string} template
* @returns {string} New string
*/
const _replaceData = function (content, template) {
  return _supplant('%data%', content, template);
};

/**
* @description Convenience method for replacing a uri placeholder `#` with some
content for a given template. Makes use of the `supplant` function
* @param {string} content
* @param {string} template
* @returns {string} New string
*/
const _replaceHash = function (content, template) {
  return _supplant('#', content, template);
};

/**
* @description Check the page protocol in use for a given url
* @param {string} url
* @returns {string} 'http' or 'https'
*/
const _getPageProtocol = function (url) {
  return ['http:', 'https:'][+(/^https:\/\//.test(url))];
};

const protocol = _getPageProtocol(window.location.href);

/* Biography at a glance */
Resume.bio = {
  name: "John Ryan",
  role: "Web Developer",
  contacts: {
    location: "SW London, UK",
    email: "wave@john-ryan.info",
    mobile: "+44712345678",
    github: "johnryan1982"
  },

  welcomeMessage: "A web developer with over 10 years of professional"
    + " experience. Clients"
    + " include small startups through to established multi-nationals."
    + " Solutions incorporate simple websites to large web applications."
    + " Specialties include JavaScript, CSS, HTML, Node.js, Dart, PHP,"
    + " open-source and web performance.",

  skills: [
    "JavaScript - vanilla JS, ECMAScript 6, Node.js & jQuery, along with"
      + " many popular JS frameworks, libraries and task-runners",
    "CSS3 - vanilla CSS and pre-processors including SCSS, SASS and LESS",
    "HTML5 - semantic markup",
    "Version control - predominantly Git, with some experience of using SVN"
  ],

  biopic: "//gravatar.com/avatar/186b65f0404c63825b28710da670b293?s=220",

  /**
  * @description Generate HTML content and inject into DOM
  */
  display: function () {
    var bio = this,
      /* Placeholder to prevent unnecessary DOM reflows/repaints */
      docFrag = $(document.createDocumentFragment()),
      headerContainer = $('#header'),
      headlineContainer = headerContainer.find('.headline'),
      blurbContainer = $('#blurb'),
      topContacts = $('#menu'),
      skillsContainer = $('#skills'),
      skills,
      markup = Resume.markup;

    /*
      First round of content injection into DOM.
      Biopic is an independent content block (no nested/adjacent sibling nodes)
    */
    docFrag.append(_replaceData(bio.biopic, markup.HTMLbioPic));
    docFrag.insertBefore(headlineContainer);

    /*
      Second round of content injection into DOM.
      Name and Role are adjacent siblings of the $headlineContainer placeholder
      Note that we re-use the (now empty) documentFragment so as to
      prevent a new object invocation
    */
    docFrag.append(_replaceData(bio.name, markup.HTMLheaderName));
    docFrag.append(_replaceData(bio.role, markup.HTMLheaderRole));
    headlineContainer.append(docFrag);

    /*
      Third round of content injection into DOM.
      Contact channels.
    */
    topContacts.append(Resume.printContactInfo());

    /*
      Fourth round of content injection into DOM.
      Welcome message
    */
    blurbContainer.append(_replaceData(bio.welcomeMessage, markup.HTMLwelcomeMsg));

    /*
      Fifth round of content injection into DOM.
      Skills
      Note that we re-use the (now empty) documentFragment so as to
      prevent a new object invocation
    */
    skills = bio.skills;
    if (skills.length > 0) {
      /* Inject header and containing `<div>` */
      skillsContainer.append(markup.HTMLskillsStart);

      /* Generate new content, then add to injected `<div>` */
      skills.forEach(function (skill) {
        var key_val_pairings = skill.split(' - '),
          key = key_val_pairings[0],
          val = key_val_pairings[1];
        docFrag.append(_supplant('%val%', val, _supplant('%key%', key, markup.HTMLskills)));
      });
      skillsContainer.find('.skills').append(docFrag);
    }
  }
};

/*
  Additional content that extends the Resume.bio.contacts object.
  Intentionally defined in a separate content block for DRY purposes.
*/
Resume.bio.contactsMeta = {
  location: {
    icon: "fa-map-marker",
    link: "//www.google.co.uk/maps/place/London+Borough+of+Wandsworth,+London/@51.4557593,-0.1996067,12z/data=!4m5!3m4!1s0x48760589ff8fea83:0x37252c9ca56f68d2!8m2!3d51.4570716!4d-0.1817824"
  },
  email: {
    icon: "fa-envelope",
    link: "mailto:" + Resume.bio.contacts.email,
    target: false
  },
  mobile: {
    icon: "fa-phone",
    link: "tel:" + Resume.bio.contacts.mobile,
    target: false
  },
  github: {
    icon: "fa-github",
    link: "//github.com/" + Resume.bio.contacts.github
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
      url: "//www.liverpool.ac.uk/study/undergraduate/courses/computer-science-bsc-hons/overview/",
      meta: {
        ref: "uol",
        url: "//www.liverpool.ac.uk",
        address: "University of Liverpool, Bedford St N, Liverpool L69 7ZN, UK"
      }
    }
  ],

  onlineCourses: [
    {
      title: "Multiple Frontend Web Developer, framework and tooling courses",
      school: "CodeSchool",
      dates: "May 2016 - October 2016",
      url: "//www.codeschool.com/users/johnryan1982"
    },
    {
      title: "Frontend Web Developer Nanodegree",
      school: "Udacity",
      dates: "December 2016 - January 2018",
      url: "//www.udacity.com/course/nd001"
    }
  ],

  /**
  * @description Generate HTML content and inject into DOM
  */
  display: function () {
    var education = this,
      /* Placeholder to prevent unnecessary DOM reflows/repaints */
      docFrag = $(document.createDocumentFragment()),
      container = $('#education'),
      courses,
      markup = Resume.markup;

    /* Schools */
    education.schools.forEach(function (school) {
      var schoolContainer = $(markup.HTMLschoolStart),
        title = _replaceData(school.name, markup.HTMLschoolName) + _replaceData(school.degree, markup.HTMLschoolDegree);

      schoolContainer.attr('id', school.meta.ref);
      schoolContainer.addClass('education');
      schoolContainer.append(_replaceHash(school.url, title));
      schoolContainer.append(_replaceData(school.dates, markup.HTMLschoolDates));
      schoolContainer.append(_replaceData(school.location, markup.HTMLschoolLocation));
      schoolContainer.append(_replaceData(school.majors, markup.HTMLschoolMajor));
      docFrag.append(schoolContainer);
    });

    /* Online courses */
    courses = education.onlineCourses;
    if (courses.length > 0) {
      docFrag.append($(markup.HTMLonlineClasses));

      courses.forEach(function (course) {
        var coursesContainer = $(markup.HTMLschoolStart),
          title = _replaceData(course.title, markup.HTMLonlineTitle) + _replaceData(course.school, markup.HTMLonlineSchool);

        coursesContainer.append(_replaceHash(course.url, title));
        coursesContainer.append(_replaceData(course.dates, markup.HTMLonlineDates));
        coursesContainer.append(_replaceHash(course.url, _replaceData(course.url.replace(/\/\//, ''), markup.HTMLonlineURL)));
        docFrag.append(coursesContainer);
      });

      /* First and only content injection into DOM */
      container.append(docFrag);
    }
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
      description: "Wulf & Lamb are an award-winning vegan restaurant in the"
        + " London borough of Chelsea. I provide ongoing technical guidance"
        + " and assistance with a primary focus on frontend solutions, IT"
        + " infrastructure and systens maintenance.",
      meta: {
        ref: "wulf",
        url: "//www.wulfandlamb.com",
        address: "243 Pavilion Rd, Chelsea, London SW1X 0BP, UK",
        tags: ["JavaScript", "Git", "Node.js", "HTML", "CSS", "Agile", "System administrator", "Frontend consultancy"]
      }
    },
    {
      employer: "Ancoa Software",
      title: "Lead Frontend Developer",
      location: "London, UK",
      dates: "September 2014 - April 2016",
      description: "Ancoa provides contextual surveillance and insightful"
        + " analytics for trading exchanges, regulators, and both buy- and"
        + " sell-side companies. Ancoa's main product, AncoaSuite, is a desktop"
        + " application written in C++. I was employed as their first frontend"
        + " developer, tasked with building a frontend team and replicating the"
        + " suite within the browser.<br><br>After successfully developing a"
        + " JavaScript prototype (MEAN: Angular and D3, backed by Node.js,"
        + " Express and MongoDB), the company took the initiative to focus"
        + " development on the WebApp. Given the weighting of C++ developers, a"
        + " decision was made to use Google Dart, a C-style language that"
        + " transpiles into JavaScript. I spent 6 months laying the foundations"
        + " for the new project; mentoring existing developers; and recruiting"
        + " additional junior developers to form a frontend team. However, due"
        + " to a change in personnel on the board and the subsequent change of"
        + " direction from the senior management team, frontend resources were"
        + " reduced and progress slowed. Shortly after this point, I chose to"
        + " pursue other interests including a return to working in native frontend"
        + " technologies.",
      meta: {
        ref: "ancoa",
        url: "//www.ancoa.com",
        address: "95 Miles Rd, Mitcham CR4 3FH, UK",
        tags: ["JavaScript", "Dart", "AngularDart", "Git", "Node.js", "D3.js", "HTML", "CSS", "Agile", "Project Management", "jQuery"]
      }
    },
    {
      employer: "North Plains Ltd (formerly VYRE)",
      title: "Technical Consultant",
      location: "London, UK",
      dates: "August 2013 - August 2014",
      description: "Having previously worked for VYRE prior to my sabbatical to Canada (see below), I resumed my employment with the company who had been acquired by North Plains Ltd. As a Technical"
        + " Consultant I lead a team of developers, designers and testers to"
        + " produce solutions built on the company's bespoke Content Management"
        + " System. I was responsible for managing development for a number of"
        + " customers including our flagship client, Diageo Plc."
        + " Responsibilities included defining product requirements and"
        + " specifications alongside key stakeholders; producing detailed"
        + " estimates and resource schedules; managing project budgets; and"
        + " managing relationships with principle stakeholders.",
      meta: {
        ref: "northplains",
        url: "//www.northplains.com",
        address: "41 Corsham St, Hoxton, London N1 6DR, UK",
        tags: ["Project Management", "Agile", "JavaScript", "HTML", "CSS", "XML", "XSL", "jQuery"]
      }
    },
    {
      employer: "Sprout At Work",
      title: "Lead Frontend Developer",
      location: "Vancouver, CA",
      dates: "June 2012 - April 2013",
      description: "Sprout At Work is a small startup based in downtown Vancouver"
        + " who gamify living a healthy lifestyle. Whilst on a sabatical from VYRE,"
        + " I was employed as their lead frontend developer. Organisations would"
        + " subscribe to a hosted service and be provided with access to a webapp"
        + " where each employee had the opportunity to log activities and to be"
        + " rewarded with points. The premise was that leading a healthy lifestyle"
        + " reduced absenteeism and encouraged a more productive employee. Most"
        + " organisations chose to incentivise participating employees in ways"
        + " such as free sports equipment, healthy breakfasts and weekly yoga"
        + " classes during office hours.<br><br>As their first permanent developer"
        + " I was tasked with expanding the core functionality of their webapp built"
        + " using the PHP CodeIgniter framework. My first task was to refactor the"
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
        + " <br><br>In February 2013, we were proudly selected to participate in"
        + " the inaugural Nike+ Accelerator programme as one of 10"
        + " hand-selected companies.",
      meta: {
        ref: "sprout",
        url: "//www.sproutatwork.com",
        address: "1 Alexander St, Vancouver, BC V6A 1B2, Canada",
        tags: ["JavaScript", "HTML", "CSS", "PHP", "AWS", "Git", "Unix", "CodeIgniter", "Agile", "Project Management", "jQuery", "Grunt", "LESS", "Vagrant", "Ansible", "SQL"]
      }
    },
    {
      employer: "VYRE",
      title: "Lead Frontend Developer",
      location: "London, UK",
      dates: "September 2008 - April 2012",
      description: "VYRE was a mid-sized software house who built and"
        + " maintained a Java framework named Unify. I was a member of their"
        + " Professional Services team who leveraged Unify to create bespoke"
        + " Content Management Systems (CMS) and Digital Asset Management (DAM)"
        + " solutions for large corporations. These solutions ranged from"
        + " internal, closed systems such as Diageo’s SmartBrand (asset management"
        + " portal; 30,000 registered users) with custom workflows and complex"
        + " approval processes, to public facing websites such as Inghams (travel"
        + " website; 10,000’s page views/day) and ESPNStar (now FOXSports Asia;"
        + " television network website; 100,000’s page views/day peaking at millions"
        + " of page views/day during the IPL cricket season) both of which had"
        + " custom external feeds driving their content.<br><br>Each of our client"
        + " solutions was developed using either native JavaScript or the jQuery"
        + " library (as determined by the client’s internal DevOps/Developers)."
        + " Site content would be polled where appropriate using AJAX. The Extensible"
        + " Stylesheet Language (XSL) was used to transform the XML response as"
        + " required into either HTML or CSS, and to generate further custom"
        + " JavaScript to be injected into the webpage. I would often need to"
        + " create custom Java classes to extend the standard XSL transformers.",
      meta: {
        ref: "vyre",
        url: "//twitter.com/vyreonbrand/status/276691034182926338",
        address: "5-25 Scrutton St, London EC2A 4HJ, UK",
        tags: ["JavaScript", "jQuery", "HTML", "CSS", "XML", "XSL", "Java", "SQL", "Unix", "Agile", "SVN", "Agile"]
      }
    }
  ],

  /**
  * @description Generate HTML content and inject into DOM
  */
  display: function () {
    var work = this,
      /* Placeholder to prevent unnecessary DOM reflows/repaints */
      docFrag = $(document.createDocumentFragment()),
      container = $('#experience'),
      markup = Resume.markup;

    /* Jobs */
    work.jobs.forEach(function (job) {
      var jobContainer = $(markup.HTMLworkStart),
        meta = job.meta,
        employer = _replaceHash(meta.url, _replaceData(job.employer, markup.HTMLworkEmployer)),
        title = _replaceData(job.title, markup.HTMLworkTitle),
        tags = [];

      jobContainer.attr('id', job.meta.ref);
      jobContainer.append($(employer + title));
      jobContainer.append($(_replaceData(job.dates, markup.HTMLworkDates)));
      jobContainer.append($(_replaceData(job.location, markup.HTMLworkLocation)));

      meta.tags.forEach(function (tag) {
        tags.push(_replaceData(tag, markup.HTMLworkTag));
      });
      jobContainer.append($(_replaceData(tags.join(''), markup.HTMLworkTags)));

      jobContainer.append($(_replaceData(job.description, markup.HTMLworkDescription)));

      docFrag.append(jobContainer);
    });

    /* First and only content injection into DOM */
    container.append(docFrag);
  }
};

/* Projects at a glance */
Resume.projects = {
  projects: [
    {
      title: "WeArePlantNation.com",
      dates: "September 2015 - July 2016",
      description: "Website design, development and maintenance services for a"
        + " plant-based delicatessen in Chelsea, London",
      images: ["images/weareplantnation@1x.jpg"]
    },
    {
      title: "RPS London Limited",
      dates: "April 2016 - in progress",
      description: "Technical assistance for a property management firm",
      images: ["images/rps@1x.jpg"]
    }
  ],

  /**
  * @description Generate HTML content and inject into DOM
  */
  display: function () {
    var projects = this,
      /* Placeholder to prevent unnecessary DOM reflows/repaints */
      docFrag = $(document.createDocumentFragment()),
      container = $('#projects'),
      markup = Resume.markup;

    /* Projects */
    projects.projects.forEach(function (project) {
      var projectContainer = $(markup.HTMLprojectStart), galleryContainer;

      projectContainer.append($(_replaceData(project.title, markup.HTMLprojectTitle)));
      projectContainer.append($(_replaceData(project.dates, markup.HTMLprojectDates)));
      projectContainer.append($(_replaceData(project.description, markup.HTMLprojectDescription)));

      /* Images */
      if (project.images && project.images.length > 0) {
        galleryContainer = $(markup.HTMLprojectGallery);

        project.images.forEach(function (image) {
          galleryContainer.append($(_replaceData(image, markup.HTMLprojectImage)));
        });
        projectContainer.append(galleryContainer);
      }

      docFrag.append(projectContainer);
    });

    /* First and only content injection into DOM */
    container.append(docFrag);
  }
};

Resume.footer =  {
  display: function () {
    $('.footer .menu').append(Resume.printContactInfo());
  }
};

Resume.printContactInfo = (function _generateContactInfo(channels) {
  /* Generate a single instance of the "common" HTML and cache */
  var docFrag = $(document.createDocumentFragment()),
    markup = Resume.markup;

  Object.keys(channels).forEach(function (channel) {
    var template, meta, replaced_data, replaced_icon, replaced_action, replaced_target;
    if (typeof channels[channel] === 'object') return;
    template = markup.HTMLcontactGeneric;
    meta = Resume.bio.contactsMeta[channel];
    replaced_data = _replaceData(channels[channel], template);
    replaced_icon = _supplant('%icon%', meta.icon, replaced_data);
    replaced_action = _supplant('%action%', meta.link, replaced_icon);
    if (meta.hasOwnProperty('target') && !meta.target) {
      replaced_target = _supplant(' target="_blank"', '', replaced_action);
    }
    docFrag.append(replaced_target ? replaced_target : replaced_action);
  });

  /*
    Thanks to this closure, each Resume.printContactInfo() invocation will now
    receive a unique cloned instance of the original DOMFragment; not using
    a closure would result in a single DOMFragment, which would be moved to a
    new parent DOMElement with *each* function invocation (ie. the header
    contact information would simply be _moved_ to the footer and not
    duplicated as is desired)
  */
  return function () { return docFrag.clone(); };
})(Resume.bio.contacts);

Resume.bio.display();
Resume.work.display();
Resume.projects.display();
Resume.education.display();
Resume.footer.display();
