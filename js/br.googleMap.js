/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function ($, window, undefined) {

  function BrGoogleMap(selector, options) {

    var _this = this;

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

    options = options || { };
    options.zoom = options.zoom || 3;
    options.mapCenter = options.mapCenter || new google.maps.LatLng(37, 35);
    options.mapType = options.mapType || google.maps.MapTypeId.ROADMAP;
    options.streetViewControl = options.streetViewControl || true;
    options.panControl = options.panControl || true;
    this.mapOptions = { zoom: options.zoom
                      , center: options.mapCenter
                      , mapTypeId: google.maps.MapTypeId.ROADMAP
                      , mapTypeControl: true
                      , mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
                          , position: google.maps.ControlPosition.TOP_RIGHT
                        }
                      , panControl: options.panControl
                      , panControlOptions: {
                          position: google.maps.ControlPosition.RIGHT_BOTTOM
                        }
                      , zoomControl: true
                      , zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.LARGE
                          , position: google.maps.ControlPosition.LEFT_CENTER
                        }
                      , scaleControl: true
                      , scaleControlOptions: {
                          position: google.maps.ControlPosition.LEFT_CENTER
                        }
                      , streetViewControl: options.streetViewControl
                      , streetViewControlOptions: {
                          position: google.maps.ControlPosition.LEFT_BOTTOM
                        }
                      , rotateControl: true
                      , rotateControlOptions: {
                          position: google.maps.ControlPosition.LEFT_CENTER
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
    this.polygons = [];

    google.maps.event.addListener(this.map, 'click', function(event) {
      _this.events.trigger('click', event);
    });
    google.maps.event.addListener(this.map, 'bounds_changed', function(event) {
      _this.events.trigger('bounds_changed', event);
    });
    google.maps.event.addListener(this.map, 'center_changed', function(event) {
      _this.events.trigger('center_changed', event);
    });
    google.maps.event.addListener(this.map, 'place_changed', function(event) {
      _this.events.trigger('place_changed', event);
    });

    var map = this;

    this.identifyLocation = function(callback) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.map.setCenter(pos);
          if (typeof callback == 'function') {
            callback.call(_this, true);
          }
        }, function() {
          if (typeof callback == 'function') {
            callback.call(_this, false);
          }
        });
      } else {
        if (typeof callback == 'function') {
          callback.call(_this, false);
        }
      }
    };

    this.isWeatherVisible = function() {
      return (this.weatherLayer !== null);
    };

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
    };

    this.removeMarkers = function(tag) {
      tag = tag || '';
      for (var i = this.markers.length-1; i >= 0; i--) {
        if (this.markers[i].custom.tag == tag) {
          this.markers[i].setMap(null);
          this.markers.splice(i, 1);
        }
      }
    };

    this.addMarker = function(lat, lng, params) {
      params = params || { };
      params.custom = params.custom || { };
      params.custom.tag = params.custom.tag || '';
      var latLng = new google.maps.LatLng(lat, lng);
      var marker = new google.maps.Marker({ position: latLng
                                          , map: this.map
                                          , icon: params.icon
                                          , draggable: params.draggable
                                          , custom: params.custom
                                          });
      this.markers.push(marker);
      google.maps.event.addListener(marker, 'click', function(event) {
        _this.events.trigger('marker.click', marker, event);
      });
      if (params.draggable) {
        google.maps.event.addListener(marker, 'dragend', function(event) {
          _this.events.trigger('marker.dragend', marker, event);
        });
      }
      return marker;
    };

    function array_map(array, callback) {
      var original_callback_params = Array.prototype.slice.call(arguments, 2),
          array_return = [],
          array_length = array.length,
          i;

      if (Array.prototype.map && array.map === Array.prototype.map) {
        array_return = Array.prototype.map.call(array, function(item) {
          callback_params = original_callback_params;
          callback_params.splice(0, 0, item);

          return callback.apply(this, callback_params);
        });
      }
      else {
        for (i = 0; i < array_length; i++) {
          callback_params = original_callback_params;
          callback_params.splice(0, 0, array[i]);
          array_return.push(callback.apply(this, callback_params));
        }
      }

      return array_return;
    }

    function array_flat(array) {
      var new_array = [],
          i;

      for (i = 0; i < array.length; i++) {
        new_array = new_array.concat(array[i]);
      }

      return new_array;
    }

    function coordsToLatLngs(coords, useGeoJSON) {
      var first_coord = coords[0],
          second_coord = coords[1];

      if (useGeoJSON) {
        first_coord = coords[1];
        second_coord = coords[0];
      }

      return new google.maps.LatLng(first_coord, second_coord);
    }

    function arrayToLatLng(coords, useGeoJSON) {
      var i;

      for (i = 0; i < coords.length; i++) {
        if (coords[i].length > 0 && typeof(coords[i][0]) == "object") {
          coords[i] = arrayToLatLng(coords[i], useGeoJSON);
        }
        else {
          coords[i] = coordsToLatLngs(coords[i], useGeoJSON);
        }
      }

      return coords;
    }

    this.removePolygons = function(tag) {
      tag = tag || '';
      for (var i = this.polygons.length-1; i >= 0; i--) {
        if (this.polygons[i].custom.tag == tag) {
          this.polygons[i].setMap(null);
          this.polygons.splice(i, 1);
        }
      }
    };

    if (!google.maps.Polygon.prototype.getBounds) {
      google.maps.Polygon.prototype.getBounds = function(latLng) {
        var bounds = new google.maps.LatLngBounds();
        var paths = this.getPaths();
        var path;

        for (var p = 0; p < paths.getLength(); p++) {
          path = paths.getAt(p);
          for (var i = 0; i < path.getLength(); i++) {
            bounds.extend(path.getAt(i));
          }
        }

        return bounds;
      };
    }

    this.addGeoJSONPolygon = function(coordinates, params) {
      params = params || { };
      params.custom = params.custom || { };
      params.custom.tag = params.custom.tag || '';
      params.paths = array_flat(array_map(coordinates, arrayToLatLng, true));
      params.map = _this.map;
      params.strokeColor = params.strokeColor || '#999';
      params.strokeOpacity = params.strokeOpacity || 1;
      params.strokeWeight = params.strokeWeight || 0.5;
      params.fillColor = params.fillColor || '';
      params.fillOpacity = params.fillOpacity || 0.3;

      br.log(params);
      // br.log(paths);
      var polygon = new google.maps.Polygon(params);
      this.polygons.push(polygon);
      google.maps.event.addListener(polygon, 'click', function(event) {
        _this.events.trigger('polygon.click', polygon, event);
      });
      // if (params.draggable) {
      //   google.maps.event.addListener(marker, 'dragend', function() {
      //     _this.events.trigger('marker.dragend', marker);
      //   });
      // }
      return polygon;

    };

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
    };

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
    };

    this.setZoom = function(zoom) {
      _this.map.setZoom(zoom);
    };

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
                    };
        if (this.markers.length > 1) {
          var mapBounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.latMin, bounds.lngMin), new google.maps.LatLng(bounds.latMax, bounds.lngMax));
          this.map.panToBounds(mapBounds);
          this.map.fitBounds(mapBounds);
        } else {
          this.map.setZoom(15);
        }
        this.map.setCenter(new google.maps.LatLng(point.lat, point.lng));
      }
    };

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
    };

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
    };

    this.drawRoute = function(markers, callback) {
      var origin = null;
      var destination = null;
      var waypoints = [];
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
    };

    if (this.weather) {
      this.showWeather();
    }

    return this;

  }

  window.br = window.br || {};

  window.br.googleMap = function (selector, options) {
    return new BrGoogleMap(selector, options);
  };

})(jQuery, window);
