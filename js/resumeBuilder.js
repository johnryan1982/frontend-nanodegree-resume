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

/// employment at a glance
Resume.work = {
  jobs: [
    {
      employer: "Wulf & Lamb",
      title: "Technical Consultant",
      location: "London, UK",
      dates: "February 2016 - in progress",
      description: "I have been providing ongoing technical guidance and assistance to a London-based eatery, with a primary focus on frontend solutions and email services."
    },
    {
      employer: "Ancoa Software",
      title: "Lead Front-End Developer",
      location: "London, UK",
      dates: "September 2014 - April 2016",
      description: "Ancoa provides contextual surveillance and insightful analytics for exchanges, regulators, buy and sell-side companies. Their main product, AncoaSuite, is a desktop application written in C++. I was employed as their first frontend developer, tasked with building a frontend team and replicating the suite within the browser.<br><br>After successfully developing a JavaScript prototype (MEAN: Angular and D3, backed by Node.js, Express and MongoDB), the company took the initiative to focus development on the WebApp. Given the weighting of C++ developers, a decision was made to use Google Dart, a C-style language that transpiles into JavaScript. I spent 6 months laying the foundations for the new project; mentoring existing developers; and recruiting additional junior developers to form a frontend team. However, due to a change in personnel on the board and a change of direction from the senior management team, frontend resources were reduced and progress slowed. Shortly after this point, I chose to pursue other interests including a return to working in native frontend technologies."
    },
    {
      employer: "North Plains Ltd (formerly VYRE)",
      title: "Technical Consultant",
      location: "London, UK",
      dates: "August 2013 - August 2014",
      description: "On returning from Canada, I resumed my employment with VYRE who had recently been acquired by North Plain Ltd. As a Technical Consultant I lead a team of developers, designers and testers to produce solutions built on the company's bespoke Content Management System. I was responsible for managing development for a number of customers including our flagship client, Diageo Plc. Responsibilities included defining product requirements and specifications alongside key stakeholders; producing detailed estimates and resource schedules; managing project budgets; and managing relationships with principle stakeholders."
    },
    {
      employer: "Sprout At Work",
      title: "Lead Front-End Developer",
      location: "Vancouver, CA",
      dates: "June 2012 - April 2013",
      description: "Whilst on a sabatical from VYRE, I worked as the lead frontend developer for Sprout At Work, a small startup based in downtown Vancouver who gamified living a healthy lifestyle. Organisations would subscribe to a hosted service and be provided with access to a webapp where each employee had the opportunity to log activities and to be rewarded with points. The premise was that leading a healthy lifestyle reduced absenteeism and encouraged a more productive employee. Most organisations chose to incentivise participating employees in ways such as free sports equipment, healthy breakfasts and weekly yoga classes during office hours.<br><br>As their first permanent developer I was tasked with expanding the core functionality of their webapp built using the PHP CodeIgniter framework. My first task was to refactor the existing codebase and restructure the webapp to take advantage of modern browser capabilities through the use of modular components and client-side processing. This in turn resulted more responsive webapp. I was also heavily involved in implementing several new key features including: sandboxed, whitelabelled environments including a CMS; user profiles and personal goal management complete with a badge system for rewarding users; a shared organisation-wide leaderboard; location-based groups within the organisation to encourage inter-office and inter-organisation participation; automated testing and staging environments, and document generation.<br><br>" +
        "Upon completion of the whitelabeling and integrated location-based grouping, Sprout was able to successfully apply for local funding which funded expanding the team. I assisted in recruiting additional developers - both permanent and contract-based - along with a Project Manager.<br><br>" +
        "With these new features, Sprout partnered with organisations including ATB Financial, TD Canada, Scotiabank, McKesson Corporation, City of Hamilton and BC Ferries. The system was able to cope with the influx of over forty thousand new user accounts, culminating in loads of over eight thousand concurrent users during peak times.<br><br>" +
        "In February 2013, we were proudly selected to participate in the inaugural Nike+ Accelerator programme as one of 10 hand-selected companies."
    },
    {
      employer: "VYRE",
      title: "Lead Front-End Developer",
      location: "London, UK",
      dates: "September 2008 - April 2012",
      description: "VYRE was a mid-sized software house who built and maintained a Java framework named Unify. I was a member of their Professional Services team who leveraged Unify to create bespoke Content Management Systems (CMS) and Digital Asset Management (DAM) solutions for large corporations. These solutions ranged from internal, closed systems such as Diageo’s SmartBrand with custom workflows and complex approval processes, to public facing websites such as Inghams (travel website; 10,000’s page views/day) and ESPNStar (now FOXSports Asia; television network website; 100,000’s page views/day peaking at millions of page views/day during the cricket season) both of which had custom external feeds driving their content.<br><br>All of our client solutions were developed using either native JavaScript or the jQuery library (as determined by the client’s internal DevOps/Developers) to complement the standard HTML and CSS. Site content would be polled where appropriate using AJAX and the content returned as XML. The Extensible Stylesheet Language (XSL) was used to transform this content as required into either Resume.HTML or CSS, and on occasion, to generate further custom JavaScript to be injected into the webpage. I would often need to create custom Java classes to extend the otherwise limited XSL transformers."    }
  ],

  display: function () {
    console.log('Resume.work()');
  }
};
