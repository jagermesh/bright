(function ($, window, undefined) {

  function BrGoogleMap(selector, options) {

    var _this = this;

    options = options || { };
    options.zoom = options.zoom || 6;
    options.mapCenter = options.mapCenter || new google.maps.LatLng(64.590253,14.184436);
    options.mapType = options.mapType || google.maps.MapTypeId.ROADMAP;
    options.streetViewControl = options.streetViewControl || true;
    options.panControl = options.panControl || true;
    this.mapOptions = { zoom: options.zoom
                      , center: options.mapCenter
                      , mapTypeId: google.maps.MapTypeId.ROADMAP
                      , mapTypeControl: true
                      , mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
                          , position: google.maps.ControlPosition.TOP_CENTER
                        }
                      , panControl: options.panControl
                      , panControlOptions: {
                          position: google.maps.ControlPosition.TOP_RIGHT
                        }
                      , zoomControl: true
                      , zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.LARGE
                          , position: google.maps.ControlPosition.LEFT_CENTER
                        }
                      , scaleControl: true
                      , scaleControlOptions: {
                          position: google.maps.ControlPosition.TOP_LEFT
                        }
                      , streetViewControl: options.streetViewControl
                      , streetViewControlOptions: {
                          position: google.maps.ControlPosition.LEFT_TOP
                        }
                      };

    this.mapSelector = selector;
    this.mapContainer = $(this.mapSelector)[0];
    this.map = new google.maps.Map(this.mapContainer, this.mapOptions);
    this.directionsService = new google.maps.DirectionsService();      
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(this.map);
    this.geocoder = new google.maps.Geocoder();
    this.weatherLayer = null;
    this.travelMode = google.maps.DirectionsTravelMode.DRIVING;
    this.markers = [];

    var map = this;

    this.identifyLocation = function(callback) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.map.setCenter(pos);
          if (typeof callback == 'function') {
            callback.call(_this);
          }
        });
      }
    }
    this.isWeatherVisible = function() {
      return (this.weatherLayer !== null);
    }
    this.showWeather = function(show) {
      if (show && !this.weatherVisible()) {
        this.weatherLayer = new google.maps.weather.WeatherLayer({
          //temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
        });
        this.weatherLayer.setMap(this.map);              
      } else
      if (!show && this.weatherVisible()) {
        this.weatherLayer.setMap(null);
        this.weatherLayer = null;
      }
    }
    this.clearMarkers = function() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];      
    }
    this.addLocation = function(lat, lng, data, onClick) {
      var latLng = new google.maps.LatLng(lat, lng);
      var marker = new google.maps.Marker({ position: latLng
                                          , map: this.map
                                          , data: data
                                          });
      return this.addMarker(marker, onClick);
    }
    this.addMarker = function(marker, onClick) {
      // marker.setMap(this.map);
      this.markers[this.markers.length] = marker;
      if (onClick) {
        google.maps.event.addListener(marker, 'click', function() {
          onClick.call(this);
        });            
      }
      return marker;  
    }
    this.setMapType = function(value) {
      switch(value) {
        case 'r':
          this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
          break;
        case 's':
          this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
          break;
        case 't':
          this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
          break;
        case 'h':
          this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
          break;
      }
    }
    this.setTravelMode = function(value) {
      switch(value) {
        case 'd':
          this.travelMode = google.maps.DirectionsTravelMode.DRIVING;
          break;
        case 'b':
          this.travelMode = google.maps.DirectionsTravelMode.BICYCLING;
          break;
        case 'w':
          this.travelMode = google.maps.DirectionsTravelMode.WALKING;
          break;
      }
    }
    this.setZoom = function(zoom) {
      _this.map.setZoom(zoom);
    }
    this.pan = function() {
      var bounds = { };
      for (var i = 0; i < this.markers.length; i++) {
        var lat = this.markers[i].position.lat();
        var lng = this.markers[i].position.lng();
        if (!bounds.latMin) {
          bounds = { latMin: lat, lngMin: lng, latMax: lat, lngMax: lng };
        } else {
          bounds.latMin = Math.min(bounds.latMin, lat);
          bounds.lngMin = Math.min(bounds.lngMin, lng);
          bounds.latMax = Math.max(bounds.latMax, lat);
          bounds.lngMax = Math.max(bounds.lngMax, lng);
        }
      }
      if (this.markers.length > 0) {  
        var point = { lat: bounds.latMin + (bounds.latMax - bounds.latMin)/2
                    , lng: bounds.lngMin + (bounds.lngMax - bounds.lngMin)/2
                    }
        if (this.markers.length > 1) {  
          var mapBounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.latMin, bounds.lngMin), new google.maps.LatLng(bounds.latMax, bounds.lngMax));
          this.map.panToBounds(mapBounds);
          this.map.fitBounds(mapBounds);
        } else {
          this.map.setZoom(15);
        }
        this.map.setCenter(new google.maps.LatLng(point.lat, point.lng));
      }
    }
    this.gotoAddress = function(address, callback) {
      _this.findAddress(address, function(result, points) {
        if (result) {
          var pos = new google.maps.LatLng(points[0].lat, points[0].lng);
          _this.map.setCenter(pos);
          _this.map.setZoom(17);
          if (typeof callback == 'function') {
            callback.call(_this);
          }
        }
      });
    }
    this.findAddress = function(address, callback) {
      _this.geocoder.geocode({'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var points = [];
          for (var i = 0; i < results.length; i++) {
            points.push({ lat: results[i].geometry.location.lat()
                        , lng: results[i].geometry.location.lng()
                        , name: results[i].formatted_address
                        , raw: results[i]
                        });
          }
          if (typeof callback == 'function') {
            callback.call(_this, points.length > 0, points);
          }
        } else {
          if (typeof callback == 'function') {
            callback.call(_this, false);
          }
        }
      });
    }
    this.drawRoute = function(markers, callback) {
      var origin = null;
      var destination = null;
      var waypoints = []
      markers = markers || this.markers;
      for (var i = 0; i < markers.length; i++) {
        var latLng = new google.maps.LatLng(markers[i].position.lat(), markers[i].position.lng());
        if (origin === null) {
          origin = latLng;
        } else 
        if (destination === null) {
          destination = latLng;
        } else {
          waypoints.push({ location: destination, stopover: true });
          destination = latLng;
        }          
      }
      if ((origin !== null) && (destination !== null)) {
        var request = {
            origin: origin
          , destination: destination
          , waypoints: waypoints
          , travelMode: this.travelMode
          //optimizeWaypoints: document.getElementById('optimize').checked,
          //avoidHighways: document.getElementById('highways').checked,
          //avoidTolls: document.getElementById('tolls').checked
        };
        this.directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            var distance = 0;
            var duration = 0;
            for (var i = 0; i < Math.min(1, response.routes.length); i++) {
              for (var k = 0; k < response.routes[i].legs.length; k++) {
                distance += response.routes[i].legs[k].distance.value;
                duration += response.routes[i].legs[k].duration.value;
              }
            }
            map.directionsDisplay.setDirections(response);
            if (callback) {
              callback.call(this, true, { distance: distance, duration: duration });
            }
          } else {
            if (callback) {
              callback.call(this, false);
            }
          }
        });      
      }
    }

    if (this.weather) {
      this.showWeather();
    }

    return this;

  }

  window.br = window.br || {};

  window.br.googleMap = function (selector, options) {
    return new BrGoogleMap(selector, options);
  }

})(jQuery, window);
