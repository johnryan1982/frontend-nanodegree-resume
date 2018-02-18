/* Minimise globals footprint by creating a Resume object */
Resume = window.Resume || {};

/*
  These are HTML strings. As part of the course, you'll be using JavaScript
  functions replace the %data% placeholder text you see in them
*/
Resume.markup = {
  HTMLheaderName: '<h1 id="name">%data%</h1>',
  HTMLheaderRole: '<span>%data%</span><hr>',

  HTMLcontactGeneric: '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>',
  HTMLmobile: '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>',
  HTMLemail: '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>',
  HTMLtwitter: '<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>',
  HTMLgithub: '<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>',
  HTMLblog: '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>',
  HTMLlocation: '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>',

  HTMLbioPic: '<img src="%data%" class="biopic">',
  HTMLwelcomeMsg: '<span class="welcome-message">%data%</span>',

  HTMLskillsStart: '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-column"></ul>',
  HTMLskills: '<li class="flex-item"><span class="white-text">%data%</span></li>',

  HTMLworkStart: '<div class="work-entry"></div>',
  HTMLworkEmployer: '<a href="#" target="_blank">%data%',
  HTMLworkTitle: ' - %data%</a>',
  HTMLworkDates: '<div class="date-text">%data%</div>',
  HTMLworkLocation: '<div class="location-text">%data%</div>',
  HTMLworkTags: '<ul class="tags">%data%</ul>',
  HTMLworkTag: '<li class="tag">%data%</li>',
  HTMLworkDescription: '<p><br>%data%</p>',

  HTMLprojectStart: '<div class="project-entry"></div>',
  HTMLprojectTitle: '<a>%data%</a>',
  HTMLprojectDates: '<div class="date-text">%data%</div>',
  HTMLprojectDescription: '<p><br>%data%</p>',
  HTMLprojectImage: '<img src="%data%">',

  HTMLschoolStart: '<div class="education-entry"></div>',
  HTMLschoolName: '<a href="#" target="_blank">%data%',
  HTMLschoolDegree: ' -- %data%</a>',
  HTMLschoolDates: '<div class="date-text">%data%</div>',
  HTMLschoolLocation: '<div class="location-text">%data%</div>',
  HTMLschoolMajor: '<em><br>Major: %data%</em>',

  HTMLonlineClasses: '<h3>Online Classes</h3>',
  HTMLonlineTitle: '<a href="#" target="_blank">%data%',
  HTMLonlineSchool: ' - %data%</a>',
  HTMLonlineDates: '<div class="date-text">%data%</div>',
  HTMLonlineURL: '<br><a href="#" target="_blank">%data%</a>',

  HTMLinternationalizeButton: '<button>Internationalize</button>',
  HTMLgoogleMap: '<div id="map"></div>'
};

/*
  The Internationalize Names challenge found in the lesson Flow Control from
  JavaScript Basics requires you to create a function that will need this
  helper code to run. Don't delete! It hooks up your code to the button you'll
  be appending
*/
$(document).ready(() => {
  $('button').click(() => {
    var $name = $('#name');
    var iName = inName($name.text()) || function () {};
    $name.html(iName);
  });
});

/*
  The next few lines about clicks are for the Collecting Click Locations quiz
  in the lesson Flow Control from JavaScript Basics
*/
var clickLocations = [];


function logClicks(x, y) {
  clickLocations.push({
    x: x,
    y: y
  });
  console.log(`x location: ${x}; y location: ${y}`);
}

$(document).click((loc) => {
  // your code goes here!
});


/*
  This is the fun part. Here's where we generate the custom Google Map for the
  website. See the documentation below for more details.
  https://developers.google.com/maps/documentation/javascript/reference
*/
var map,      // declares a global map variable
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
  console.log(infoWindow);

  /**
  * @description Returns an array of every location string from the JSONs
  written for bio, education, and work
  */
  function locationFinder() {
    /* Initializes an empty array */
    var locations = [];

    /* Adds the single location property from bio to the locations array */
    // intentionally commented out as don't wish to disclose on a publicly accessible map
    // locations.push(Resume.bio.contacts.location);

    /*
      Iterates through school locations and appends each location to
      the locations array. Note that forEach is used for array iteration
      as described in the Udacity FEND Style Guide:
      https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    */
    // intentionally commented out as don't see the relevance of plotting on a work experience map
    // Resume.education.schools.forEach(school => {
    //   locations.push(school.location);
    //   markerRefs.push(school.meta);
    // });

    /*
      Iterates through work locations and appends each location to the
      locations array. Note that forEach is used for array iteration as
      described in the Udacity FEND Style Guide:
      https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    */
    // Resume.work.jobs.forEach((job) => locations.push(job.location));
    Resume.work.jobs
    .filter(job => !/Vancouver, CA/.test(job.location))
    .forEach(job => {
      console.log(job.location);
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

    console.log(placeData);

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
    var poi = markerRefs.filter(poi => poi.address === address)[0];

    if (poi !== undefined) {
      /* Configure InfoWindow content from corresponding employment section */
      var content = document.querySelector(`#${poi.ref}`).cloneNode(true);
      content.querySelectorAll('p').forEach(p => content.removeChild(p));
      content.removeAttribute('id');

      /* Reconfigure marker using custom title and graphic */
      marker.setTitle(content.querySelector('a').innerText);
      marker.setIcon(`images/googlemaps/${poi.ref}-inkscape-sm.png`);

      /*
        infoWindows are the little helper windows that open when you click or
        hover over a pin on a map. They usually contain more information about
        a location
      */

      /* Hmmmm, I wonder what this is about... */
      google.maps.event.addListener(marker, 'click', function (args) {
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
    locations.forEach((place) => {
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
$('#mapDiv').append(Resume.markup.HTMLgoogleMap);


/* Calls the initializeMap() function when the page loads */
window.addEventListener('load', initializeMap);

/* Vanilla JS way to listen for resizing of the window and adjust map bounds */
window.addEventListener('resize', function (e) {
  /* Make sure the map bounds get updated on page resize */
  map.fitBounds(mapBounds);
});
