/*global google,mapBounds*/
(function() {
  /* Minimise global footprint by creating a global Resume object */
  window.Resume = window.Resume || {};

  /*
    These are HTML strings. As part of the course, you'll be using JavaScript
    functions replace the %data% placeholder text you see in them
  */
  window.Resume.markup = {
    // header, menu, blurb & skills
    HTMLbioPic: '<div class="responsive-img-container biopic"><img src="%data%" class="responsive-img"></div>',
    HTMLheaderName: '<h1 class="h1">%data%</h1>',
    HTMLheaderRole: '<h2 class="h2">%data%</h2>',
    HTMLcontactGeneric: '<li class="contact"><a href="%action%" target="_blank"><span class="fa-stack fa"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-stack-1x fa-inverse %icon%"></i></span>%data%</a></li>',
    HTMLwelcomeMsg: '<blockquote class="quote"><p>%data%</p></blockquote>',
    HTMLskillsStart: '<ul class="skills"></ul>',
    HTMLskills: '<li><div class="skill">%key%</div><div>%val%</div></li>',

    // work experience
    HTMLworkStart: '<article></article>',
    HTMLworkEmployer: '<h1><a href="#" target="_blank">%data%',
    HTMLworkTitle: ' - %data%</a></h1>',
    HTMLworkDates: '<h2 class="meta date">%data%</h2>',
    HTMLworkLocation: '<h2 class="meta location">%data%</h2>',
    HTMLworkTags: '<ul class="meta tags">%data%</ul>',
    HTMLworkTag: '<li class="tag">%data%</li>',
    HTMLworkDescription: '<p>%data%</p>',

    // projects
    HTMLprojectStart: '<article></article>',
    HTMLprojectTitle: '<h1>%data%</h1>',
    HTMLprojectDates: '<h2 class="meta date">%data%</h2>',
    HTMLprojectDescription: '<p>%data%</p>',
    HTMLprojectGallery: '<div class="gallery"></div>',
    HTMLprojectImage: '<div class="responsive-img-container"><img src="%data%" class="responsive-img"></div>',

    // education
    HTMLschoolStart: '<article></article>',
    HTMLschoolName: '<h1><a href="#" target="_blank">%data%',
    HTMLschoolDegree: ' -- %data%</a></h1>',
    HTMLschoolDates: '<h2 class="meta date">%data%</h2>',
    HTMLschoolLocation: '<h2 class="meta location">%data%</h2>',
    HTMLschoolMajor: '<div class="meta">Major: %data%</div>',
    HTMLonlineClasses: '<header class="sub-header--small">Online Classes</header>',
    HTMLonlineTitle: '<h1><a href="#" target="_blank">%data%',
    HTMLonlineSchool: ' - %data%</a></h1>',
    HTMLonlineDates: '<h2 class="meta date">%data%</h2>',
    HTMLonlineURL: '<div class="meta"><a href="#" target="_blank">%data%</a></div>',

    HTMLinternationalizeButton: '<button>Internationalize</button>',
    HTMLgoogleMap: '<div id="map" class="map"></div>'
  };

  /*
    The Internationalize Names challenge found in the lesson Flow Control from
    JavaScript Basics requires you to create a function that will need this
    helper code to run. Don't delete! It hooks up your code to the button you'll
    be appending
  */
  // $(document).ready(function () {
  //   $('button').click(function () {
  //     var $name = $('#name');
  //     var iName = inName($name.text()) || function () {};
  //     $name.html(iName);
  //   });
  // });

  /*
    The next few lines about clicks are for the Collecting Click Locations quiz
    in the lesson Flow Control from JavaScript Basics
  */
  // var clickLocations = [];

  // function logClicks(x, y) {
  //   clickLocations.push({
  //     x: x,
  //     y: y
  //   });
  //   // console.log(`x location: ${x}; y location: ${y}`);
  // }

  // $(document).click(function(loc) {
  //   // your code goes here!
  // });

  /*
    Custom: attach behaviour to toggle the social media contact links menu
    when clicking on the hamburger icon
  */
  function initializeContactsMenu() {
    var $menuBtn = $('#menu-btn'),
      $menu = $('#menu');

    $menuBtn.on('click', function(e) {
      $menuBtn.toggleClass('on fa-bars fa-times');
      $menu.toggleClass('on');
    });
  }

  /*
    This is the fun part. Here's where we generate the custom Google Map for the
    website. See the documentation below for more details.
    https://developers.google.com/maps/documentation/javascript/reference
  */
  var map, // declares a global map variable
    infoWindow; // declares a global inforWindow variable

  /*
    Start here! initializeMap() is called when page is loaded
  */
  function initializeMap() {
    var locations, markerRefs = [];

    var mapOptions = {
      disableDefaultUI: true
    };

    /*
      For the map to be displayed, the googleMap var must be appended to #mapDiv
      in resumeBuilder.js.
    */
    map = new google.maps.Map(document.querySelector('#map'), mapOptions);

    /*
      infoWindows are the little helper windows that open when you click or hover
      over a pin on a map. They usually contain more information about a
      location. Reuse the global infoWindow object to ensure only a single
      instance of infoWindow exists, and therefore only one can ever be displayed
    */
    infoWindow = new google.maps.InfoWindow({
      content: null,
      maxWidth: 200
    });
    // console.log(infoWindow);

    /**
    * @description Returns an array of every location string from the JSONs
    written for bio, education, and work
    */
    function locationFinder() {
      /* Initializes an empty array */
      var locations = [];

      /* Adds the single location property from bio to the locations array */
      // intentionally commented out as don't wish to disclose on a publicly
      // accessible map; instead, I've created a `Resume.bio.contactsMeta`
      // property that augments the `Resume.bio.contacts` object and includes
      // a hard-coded link to a Google Map location that will be displayed
      // within the contacts menu. I find this to be an acceptable compromise
      // as the data held within the `Resume.bio.contacts` object is itself
      // static, therefore it is acceptable to assume that if updating
      // `Resume.bio.contacts`, one would also update `Resume.bio.contactsMeta`
      // locations.push(window.Resume.bio.contacts.location);

      /*
        Iterates through school locations and appends each location to
        the locations array. Note that forEach is used for array iteration
        as described in the Udacity FEND Style Guide:
        https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
      */
      // intentionally commented out as don't see the relevance of plotting a
      // school location on a `work experience` map
      // window.Resume.education.schools.forEach(school => {
      //   locations.push(school.location);
      //   markerRefs.push(school.meta);
      // });

      /*
        Iterates through work locations and appends each location to the
        locations array. Note that forEach is used for array iteration as
        described in the Udacity FEND Style Guide:
        https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
      */
      window.Resume.work.jobs.forEach(function(job) {
        locations.push(job.meta.address);
        markerRefs.push(job.meta);
      });

      return locations;
    }

    /**
     * @description Reads Google Places search results to create map pins
     * @param {object} placeData contains information about a single location
     */
    function createMapMarker(placeData) {
      /* Cache location data */
      var loc = placeData.geometry.location;

      // console.log(placeData);

      /*
        The next lines save location data from the search result object to local
        variables
      */
      var lat = loc.lat(); // latitude from the place service
      var lon = loc.lng(); // longitude from the place service
      var address = placeData.formatted_address; // name of the place from the place service
      var bounds = window.mapBounds; // current boundaries of the map window

      /*
        marker is an object with additional data about the pin for a single
        location
      */
      var marker = new google.maps.Marker({
        map: map,
        position: loc,
        title: address
      });

      /* Point of Interest */
      var poi = markerRefs.filter(function(poi) {
        return poi.address === address;
      })[0];

      if (poi !== undefined) {
        /* Configure InfoWindow content from corresponding employment section */
        var content = document.querySelector('#' + poi.ref).cloneNode(true);
        content.querySelectorAll('p').forEach(function(p) {
          content.removeChild(p);
        });
        content.removeAttribute('id');

        /* Reconfigure marker using custom title and graphic */
        marker.setTitle(content.querySelector('a').innerText);
        marker.setIcon('images/googlemaps/' + poi.ref + '-inkscape-sm.png');

        /*
          infoWindows are the little helper windows that open when you click or
          hover over a pin on a map. They usually contain more information about
          a location
        */

        /* Hmmmm, I wonder what this is about... */
        google.maps.event.addListener(marker, 'click', function(args) {
          // your code goes here!
          // console.log('map clicked', args, infoWindow);

          infoWindow.setContent(content);

          // infoWindow.open(map, marker);
          infoWindow.open(map, marker);
        });
      }

      /*
        This is where the pin actually gets added to the map. bounds.extend()
        takes in a map location object
      */
      bounds.extend(new google.maps.LatLng(lat, lon));
      /* Fit the map to the new marker */
      map.fitBounds(bounds);
      /* Center the map */
      map.setCenter(bounds.getCenter());
    }

    /**
    * @description callback makes sure the search returned results for a
    location. If so, it creates a new map marker for that location
    * @param {array} results
    * @param {string} status
    */
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        createMapMarker(results[0]);
      }
    }

    /**
    * @description Takes in the array of locations created by locationFinder()
    and fires off Google place searches for each location
    * @param {array} locations
    */
    function pinPoster(locations) {
      /*
        Creates a Google place search service object. PlacesService does the
        work of actually searching for location data.
      */
      var service = new google.maps.places.PlacesService(map);

      /*
        Iterates through the array of locations, creates a search object for
        each location
      */
      locations.forEach(function(place) {
        /* The search request object */
        var request = {
          query: place
        };

        /*
          Actually searches the Google Maps API for location data and runs the
          callback function with the search results after each search.
        */
        service.textSearch(request, callback);
      });
    }

    /* Sets the boundaries of the map based on pin locations */
    window.mapBounds = new google.maps.LatLngBounds();

    /* locations is an array of location strings returned from locationFinder() */
    locations = locationFinder();

    /*
      pinPoster(locations) creates pins on the map for each location in
      the locations array
    */
    pinPoster(locations);
  }

  /* Append the relevant markup to the #mapDiv container element */
  $('#mapDiv').append(window.Resume.markup.HTMLgoogleMap);

  /* Calls the initializeMap() function when the page loads */
  window.addEventListener('load', initializeMap);
  window.addEventListener('load', initializeContactsMenu);

  /* Vanilla JS way to listen for resizing of the window and adjust map bounds */
  window.addEventListener('resize', function(e) {
    /* Make sure the map bounds get updated on page resize */
    map.fitBounds(mapBounds);
  });
})();
