/*!
 * Bright 1.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global google */

;(function ($, window, undefined) {

  function BrGoogleMap(selector, options) {

    var _this = this;
    var worldCenter = new google.maps.LatLng(42, 18);

    this.events = br.eventQueue(this);
    this.before = function(event, callback) { this.events.before(event, callback); };
    this.on     = function(event, callback) { this.events.on(event, callback); };
    this.after  = function(event, callback) { this.events.after(event, callback); };

    options = options || { };
    options.zoom = options.zoom || 3;
    options.mapCenter = options.mapCenter || worldCenter;
    options.mapType = options.mapType || google.maps.MapTypeId.ROADMAP;

    if (typeof options.streetViewControl == 'undefined') { options.streetViewControl = true; }
    if (typeof options.panControl == 'undefined') { options.panControl = true; }
    if (typeof options.mapTypeControl == 'undefined') { options.mapTypeControl = true; }
    if (typeof options.zoomControl == 'undefined') { options.zoomControl = true; }
    if (typeof options.scaleControl == 'undefined') { options.scaleControl = true; }
    if (typeof options.rotateControl == 'undefined') { options.rotateControl = true; }

    this.mapOptions = { zoom: options.zoom
                      , maxZoom: options.maxZoom
                      , center: options.mapCenter
                      , mapTypeId: google.maps.MapTypeId.ROADMAP
                      , mapTypeControl: options.mapTypeControl
                      , mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
                          , position: google.maps.ControlPosition.BOTTOM_LEFT
                        }
                      , panControl: options.panControl
                      , panControlOptions: {
                          position: google.maps.ControlPosition.RIGHT_BOTTOM
                        }
                      , zoomControl: options.zoomControl
                      , zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.LARGE
                          , position: google.maps.ControlPosition.LEFT_CENTER
                        }
                      , scaleControl: options.scaleControl
                      , scaleControlOptions: {
                          position: google.maps.ControlPosition.LEFT_CENTER
                        }
                      , streetViewControl: options.streetViewControl
                      , streetViewControlOptions: {
                          position: google.maps.ControlPosition.LEFT_BOTTOM
                        }
                      , rotateControl: options.rotateControl
                      , rotateControlOptions: {
                          position: google.maps.ControlPosition.LEFT_CENTER
                        }
                      };

    if (options.maxZoom) {
      this.mapOptions.maxZoom = options.maxZoom;
    }

    this.mapSelector = selector;
    this.mapContainer = $(this.mapSelector)[0];
    this.map = new google.maps.Map(this.mapContainer, this.mapOptions);
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.geocoder = new google.maps.Geocoder();
    this.weatherLayer = null;
    this.travelMode = google.maps.DirectionsTravelMode.DRIVING;
    this.markers = { };
    this.polygons = { };

    var singleClickTimeout;

    google.maps.event.addListener(this.map, 'click', function(event) {
      _this.events.trigger('click', event);
      (function(zoomLevel, event) {
        singleClickTimeout = window.setTimeout(function() {
          if (zoomLevel == map.map.getZoom()) {
            _this.events.trigger('singleclick', event);
          }
        }, 300);
      })(map.map.getZoom(), event);
    });

    function computeRouteParams(result) {
      var distance = 0, duration = 0;
      var myroute = result.routes[0];
      for (var i = 0; i < myroute.legs.length; i++) {
        distance += myroute.legs[i].distance.value;
        duration += myroute.legs[i].duration.value;
      }
      return { distance: distance, duration: duration };
    }

    google.maps.event.addListener(this.directionsDisplay, 'directions_changed', function() {
      var routeParams = computeRouteParams(_this.directionsDisplay.directions);
      routeParams.directions = _this.directionsDisplay.directions;
      _this.events.trigger('directions_changed', routeParams);
    });
    google.maps.event.addListener(this.map, 'dblclick', function(event) {
      window.clearTimeout(singleClickTimeout);
      _this.events.trigger('dblclick', event);
    });
    google.maps.event.addListener(this.map, 'rightclick', function(event) {
      _this.events.trigger('rightclick', event);
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
          map.map.setZoom(15);
          if (typeof callback == 'function') {
            callback.call(_this, true, pos);
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

    function internalRemoveMarkers(tag) {
      if (_this.markers[tag]) {
        for (var i = _this.markers[tag].length-1; i >= 0; i--) {
          _this.markers[tag][i].setMap(null);
          _this.markers[tag].splice(i, 1);
        }
      }
    }

    this.removeMarker = function(marker) {
      marker.setMap(null);
    };

    this.iterateMarkers = function(callback) {
      var stop = false;
      for(var tag in _this.markers) {
        for (var i = _this.markers[tag].length-1; i >= 0; i--) {
          stop = callback(_this.markers[tag][i]);
          if (stop) {
            break;
          }
        }
        if (stop) {
          break;
        }
      }
    };

    this.removeMarkers = function(tag) {
      if (tag) {
        internalRemoveMarkers(tag);
      } else {
        for(tag in _this.markers) {
          internalRemoveMarkers(tag);
        }
      }
    };

    this.addMarker = function(lat, lng, params, tag, custom) {
      var markerParams = Object.create({});
      markerParams.icon = params.icon || null;
      markerParams.draggable = params.draggable || false;
      var latLng = new google.maps.LatLng(lat, lng);
      var marker = new google.maps.Marker({ position: latLng
                                          , map: this.map
                                          , icon: markerParams.icon
                                          , draggable: markerParams.draggable
                                          });
      marker.custom = custom || { };
      tag = tag || '_';
      this.markers[tag] = this.markers[tag] || [];
      this.markers[tag].push(marker);
      google.maps.event.addListener(marker, 'click', function(event) {
        _this.events.trigger('marker.click', marker, event);
      });
      if (markerParams.draggable) {
        google.maps.event.addListener(marker, 'dragend', function(event) {
          _this.events.trigger('marker.dragend', marker, event);
        });
      }
      return marker;
    };

    this.getMarkersByTag = function(tag) {
      return _this.markers[tag] || [];
    };

    this.getMarkersCount = function() {
      var result = 0;
      for(var tag in _this.markers) {
        result += _this.markers[tag].length;
      }
      return result;
    };

    function array_map(array, callback) {
      var original_callback_params = Array.prototype.slice.call(arguments, 2),
        array_return = [],
        array_length = array.length,
        i;

      if (Array.prototype.map && array.map === Array.prototype.map) {
        array_return = Array.prototype.map.call(array, function(item) {
          var callback_params = original_callback_params;
          callback_params.splice(0, 0, item);

          return callback.apply(this, callback_params);
        });
      } else {
        for (i = 0; i < array_length; i++) {
          var callback_params = original_callback_params;
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

    function internalRemovePlygons(tag) {
      if (_this.polygons[tag]) {
        for (var i = _this.polygons[tag].length-1; i >= 0; i--) {
          _this.polygons[tag][i].setMap(null);
          _this.polygons[tag].splice(i, 1);
        }
      }
    }

    this.removePolygon = function(polygon) {
      polygon.setMap(null);
    };

    this.iteratePolygons = function(callback) {
      var stop = false;
      for(var tag in _this.polygons) {
        for (var i = _this.polygons[tag].length-1; i >= 0; i--) {
          stop = callback(_this.polygons[tag][i]);
          if (stop) {
            break;
          }
        }
        if (stop) {
          break;
        }
      }
    };

    this.removePolygons = function(tag) {
      if (tag) {
        internalRemovePlygons(tag);
      } else {
        for(tag in _this.polygons) {
          internalRemovePlygons(tag);
        }
      }
    };

    this.clearPoi = function() {
      this.removePolygons();
      this.removeMarkers();
    };

    this.addGeoJSONPolygon = function(geoData, params, tag, custom) {
      params = params || Object.create({});
      var polygonParams = Object.create({});
      var coordinates = JSON.parse(JSON.stringify(geoData));
      polygonParams.paths = array_flat(array_map(coordinates, arrayToLatLng, true));
      polygonParams.strokeColor = params.strokeColor || '#999';
      polygonParams.strokeOpacity = params.strokeOpacity || 1;
      polygonParams.strokeWeight = params.strokeWeight || 0.5;
      polygonParams.fillColor = params.fillColor;
      polygonParams.fillOpacity = polygonParams.fillColor ? (params.fillOpacity == undefined ? 0.3 : params.fillOpacity) : 0;
      polygonParams.map = _this.map;
      var polygon = new google.maps.Polygon(polygonParams);
      polygon.custom = custom;
      tag = tag || '_';
      this.polygons[tag] = this.polygons[tag] || [];
      this.polygons[tag].push(polygon);
      google.maps.event.addListener(polygon, 'click', function(event) {
        _this.events.trigger('polygon.click', polygon, event);
      });
      return polygon;
    };

    this.getPolygonsByTag = function(tag) {
      return _this.polygons[tag] || [];
    };

    this.getPolygonsCount = function() {
      var result = 0;
      for(var tag in _this.polygons) {
        result += _this.polygons[tag].length;
      }
      return result;
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

    this.world = function() {
      _this.map.setCenter(worldCenter);
      _this.map.setZoom(3);
    };

    this.pan = function() {
      var bounds = { }, lat, lng, tag, points = [], i;
      for (tag in this.markers) {
        for (i = 0; i < this.markers[tag].length; i++) {
          points.push( { lat: this.markers[tag][i].position.lat(), lng: this.markers[tag][i].position.lng() });
          points.push( { lat: this.markers[tag][i].position.lat()-1, lng: this.markers[tag][i].position.lng() });
          points.push( { lat: this.markers[tag][i].position.lat()+1, lng: this.markers[tag][i].position.lng() });
          points.push( { lat: this.markers[tag][i].position.lat(), lng: this.markers[tag][i].position.lng()-1 });
          points.push( { lat: this.markers[tag][i].position.lat(), lng: this.markers[tag][i].position.lng()+1 });
        }
      }
      for (tag in this.polygons) {
        for (i = 0; i < this.polygons[tag].length; i++) {
          points.push( { lat: this.polygons[tag][i].getBounds().getNorthEast().lat(), lng: this.polygons[tag][i].getBounds().getNorthEast().lng() });
          points.push( { lat: this.polygons[tag][i].getBounds().getSouthWest().lat(), lng: this.polygons[tag][i].getBounds().getSouthWest().lng() });
          points.push( { lat: this.polygons[tag][i].getBounds().getNorthEast().lat(), lng: this.polygons[tag][i].getBounds().getSouthWest().lng() });
          points.push( { lat: this.polygons[tag][i].getBounds().getSouthWest().lat(), lng: this.polygons[tag][i].getBounds().getNorthEast().lng() });
        }
      }
      for (i = 0; i < points.length; i++) {
        lat = points[i].lat;
        lng = points[i].lng;
        if (!bounds.latMin) {
          bounds = { latMin: lat, lngMin: lng, latMax: lat, lngMax: lng };
        } else {
          bounds.latMin = Math.max(-54,  Math.min(bounds.latMin, lat));
          bounds.lngMin = Math.max(-160, Math.min(bounds.lngMin, lng));
          bounds.latMax = Math.min(83,   Math.max(bounds.latMax, lat));
          bounds.lngMax = Math.min(160,  Math.max(bounds.lngMax, lng));
        }
      }
      if (points.length > 0) {
        var point = { lat: bounds.latMin + (bounds.latMax - bounds.latMin)/2
                    , lng: bounds.lngMin + (bounds.lngMax - bounds.lngMin)/2
                    };
        var mapBounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.latMin, bounds.lngMin), new google.maps.LatLng(bounds.latMax, bounds.lngMax));
        this.map.panToBounds(mapBounds);
        this.map.fitBounds(mapBounds);
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

    this.clearRoute = function() {
      map.directionsDisplay.setMap(null);
    };

    this.drawRoute = function(coord, callback) {
      var origin = null;
      var destination = null;
      var waypoints = [];
      for (var i = 0; i < coord.length; i++) {
        var latLng = coord[i];
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
            _this.directionsDisplay.setMap(_this.map);
            _this.directionsDisplay.setDirections(response);
            var routeParams = computeRouteParams(_this.directionsDisplay.directions);
            routeParams.directions = _this.directionsDisplay.directions;
            if (callback) {
              callback.call(this, true, routeParams);
            }
          } else {
            if (callback) {
              callback.call(this, false);
            }
          }
        });
      } else {
        if (callback) {
          callback.call(this, false);
        }
      }
    };

    this.drawRouteByTag = function(tag, callback) {
      var coord = [];
      var markers = this.getMarkersByTag(tag);
      for (var i = 0; i < markers.length; i++) {
        coord.push(new google.maps.LatLng(markers[i].position.lat(), markers[i].position.lng()));
      }
      this.drawRoute(coord, callback);
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
