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

    const _this = this;

    _this.events = br.eventQueue(this);
    _this.before = function(event, callback) { this.events.before(event, callback); };
    _this.on     = function(event, callback) { this.events.on(event, callback); };
    _this.after  = function(event, callback) { this.events.after(event, callback); };

    let worldCenter = new google.maps.LatLng(42, 18);
    let singleClickTimeout;

    options = options || Object.create({ });
    options.zoom = options.zoom || 3;
    options.mapCenter = options.mapCenter || worldCenter;
    options.mapType = options.mapType || google.maps.MapTypeId.ROADMAP;

    if (typeof options.streetViewControl == 'undefined') { options.streetViewControl = true; }
    if (typeof options.panControl == 'undefined') { options.panControl = true; }
    if (typeof options.mapTypeControl == 'undefined') { options.mapTypeControl = true; }
    if (typeof options.zoomControl == 'undefined') { options.zoomControl = true; }
    if (typeof options.scaleControl == 'undefined') { options.scaleControl = true; }
    if (typeof options.rotateControl == 'undefined') { options.rotateControl = true; }

    _this.mapOptions = { zoom: options.zoom
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
      _this.mapOptions.maxZoom = options.maxZoom;
    }

    _this.mapSelector = selector;
    _this.mapContainer = $(_this.mapSelector)[0];
    _this.map = new google.maps.Map(_this.mapContainer, _this.mapOptions);
    _this.directionsService = new google.maps.DirectionsService();
    _this.directionsDisplay = new google.maps.DirectionsRenderer();
    _this.geocoder = new google.maps.Geocoder();
    _this.weatherLayer = null;
    _this.travelMode = google.maps.DirectionsTravelMode.DRIVING;
    _this.markers = { };
    _this.polygons = { };
    _this.layers = [];

    google.maps.event.addListener(_this.map, 'click', function(event) {
      _this.events.trigger('click', event);
      (function(zoomLevel, event) {
        singleClickTimeout = window.setTimeout(function() {
          if (zoomLevel == _this.map.getZoom()) {
            _this.events.trigger('singleclick', event);
          }
        }, 300);
      })(_this.map.getZoom(), event);
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

    google.maps.event.addListener(_this.directionsDisplay, 'directions_changed', function() {
      var routeParams = computeRouteParams(_this.directionsDisplay.directions);
      routeParams.directions = _this.directionsDisplay.directions;
      _this.events.trigger('directions_changed', routeParams);
    });
    google.maps.event.addListener(_this.map, 'dblclick', function(event) {
      window.clearTimeout(singleClickTimeout);
      _this.events.trigger('dblclick', event);
    });
    google.maps.event.addListener(_this.map, 'rightclick', function(event) {
      _this.events.trigger('rightclick', event);
    });
    google.maps.event.addListener(_this.map, 'bounds_changed', function(event) {
      _this.events.trigger('bounds_changed', event);
    });
    google.maps.event.addListener(_this.map, 'center_changed', function(event) {
      _this.events.trigger('center_changed', event);
    });
    google.maps.event.addListener(_this.map, 'place_changed', function(event) {
      _this.events.trigger('place_changed', event);
    });

    _this.identifyLocation = function(callback) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          _this.map.setCenter(pos);
          _this.map.setZoom(15);
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

    _this.isWeatherVisible = function() {
      return (_this.weatherLayer !== null);
    };

    _this.showWeather = function(show) {
      if (show && !_this.weatherVisible()) {
        _this.weatherLayer = new google.maps.weather.WeatherLayer({
          //temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
        });
        _this.weatherLayer.setMap(_this.map);
      } else
      if (!show && _this.weatherVisible()) {
        _this.weatherLayer.setMap(null);
        _this.weatherLayer = null;
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

    _this.removeMarker = function(marker) {
      marker.setMap(null);
    };

    _this.iterateMarkers = function(callback) {
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

    _this.removeMarkers = function(tag) {
      if (tag) {
        internalRemoveMarkers(tag);
      } else {
        for(tag in _this.markers) {
          internalRemoveMarkers(tag);
        }
      }
    };

    _this.addMarker = function(lat, lng, params, tag, custom) {
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

    _this.getMarkersByTag = function(tag) {
      return _this.markers[tag] || [];
    };

    _this.getMarkersCount = function() {
      var result = 0;
      for(var tag in _this.markers) {
        result += _this.markers[tag].length;
      }
      return result;
    };

    function internalRemovePolygons(tag) {
      if (_this.polygons[tag]) {
        for (var i = _this.polygons[tag].length-1; i >= 0; i--) {
          _this.polygons[tag][i].setMap(null);
          _this.polygons[tag].splice(i, 1);
        }
      }
    }

    _this.removePolygon = function(polygon) {
      polygon.setMap(null);
    };

    _this.iteratePolygons = function(callback) {
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

    _this.removePolygons = function(tag) {
      if (tag) {
        internalRemovePolygons(tag);
      } else {
        for(tag in _this.polygons) {
          internalRemovePolygons(tag);
        }
      }
    };

    _this.clearPoi = function() {
      _this.removePolygons();
      _this.removeMarkers();
      _this.removeLayers();
    };

    _this.addGeoJSONPolygon = function(geoData, params, tag, custom) {

      function arrayMap(array, callback) {
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

      function arrayFlat(array) {
        var result = [];

        for (let i = 0; i < array.length; i++) {
          result = result.concat(array[i]);
        }

        return result;
      }

      function coordsToLatLngs(coords, useGeoJSON) {
        var first_coord = coords[0], second_coord = coords[1];

        if (useGeoJSON) {
          first_coord = coords[1];
          second_coord = coords[0];
        }

        return new google.maps.LatLng(first_coord, second_coord);
      }

      function arrayToLatLng(coords, useGeoJSON) {

        for (let i = 0; i < coords.length; i++) {
          if (coords[i].length > 0 && typeof(coords[i][0]) == "object") {
            coords[i] = arrayToLatLng(coords[i], useGeoJSON);
          }
          else {
            coords[i] = coordsToLatLngs(coords[i], useGeoJSON);
          }
        }

        return coords;
      }
      params = params || Object.create({});
      var polygonParams = Object.create({});
      var coordinates = JSON.parse(JSON.stringify(geoData));
      polygonParams.paths = arrayFlat(arrayMap(coordinates, arrayToLatLng, true));
      polygonParams.strokeColor = params.strokeColor || '#999';
      polygonParams.strokeOpacity = params.strokeOpacity || 1;
      polygonParams.strokeWeight = params.strokeWeight || 0.5;
      polygonParams.fillColor = params.fillColor;
      polygonParams.fillOpacity = polygonParams.fillColor ? (params.fillOpacity == undefined ? 0.3 : params.fillOpacity) : 0;
      polygonParams.map = _this.map;
      var polygon = new google.maps.Polygon(polygonParams);
      polygon.custom = custom;
      tag = tag || '_';
      _this.polygons[tag] = _this.polygons[tag] || [];
      _this.polygons[tag].push(polygon);
      google.maps.event.addListener(polygon, 'click', function(event) {
        _this.events.trigger('polygon.click', polygon, event);
      });
      return polygon;
    };

    _this.getPolygonsByTag = function(tag) {
      return _this.polygons[tag] || [];
    };

    _this.getPolygonsCount = function() {
      let result = 0;
      for(let tag in _this.polygons) {
        result += _this.polygons[tag].length;
      }
      return result;
    };

    _this.setMapType = function(value) {
      switch(value) {
        case 'r':
          _this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
          break;
        case 's':
          _this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
          break;
        case 't':
          _this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
          break;
        case 'h':
          _this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
          break;
      }
    };

    _this.setTravelMode = function(value) {
      switch(value) {
        case 'd':
          _this.travelMode = google.maps.DirectionsTravelMode.DRIVING;
          break;
        case 'b':
          _this.travelMode = google.maps.DirectionsTravelMode.BICYCLING;
          break;
        case 'w':
          _this.travelMode = google.maps.DirectionsTravelMode.WALKING;
          break;
      }
    };

    _this.setZoom = function(zoom) {
      _this.map.setZoom(zoom);
    };

    _this.world = function() {
      _this.map.setCenter(worldCenter);
      _this.map.setZoom(3);
    };

    _this.pan = function(zoom) {
      function processPoints(geometry, callback, thisArg) {
        if (geometry instanceof google.maps.LatLng) {
          callback.call(thisArg, geometry);
        } else
        if (geometry instanceof google.maps.Data.Point) {
          callback.call(thisArg, geometry.get());
        } else {
          geometry.getArray().forEach(function(g) {
            processPoints(g, callback, thisArg);
          });
        }
      }
      var bounds = new google.maps.LatLngBounds();
      _this.map.data.forEach(function(feature) {
        processPoints(feature.getGeometry(), bounds.extend, bounds);
      });
      _this.layers.forEach(function(layer) {
        layer.forEach(function(feature) {
          processPoints(feature.getGeometry(), bounds.extend, bounds);
        });
      });
      _this.map.fitBounds(bounds);
      if (zoom) {
        window.setTimeout(function() {
          _this.setZoom(zoom);
        });
      }
    };

    _this.gotoAddress = function(address, callback) {
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

    _this.findAddress = function(address, callback) {
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

    _this.clearRoute = function() {
      _this.directionsDisplay.setMap(null);
    };

    _this.drawRoute = function(coord, callback) {
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
          , travelMode: _this.travelMode
          //optimizeWaypoints: document.getElementById('optimize').checked,
          //avoidHighways: document.getElementById('highways').checked,
          //avoidTolls: document.getElementById('tolls').checked
        };
        _this.directionsService.route(request, function(response, status) {
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

    _this.drawRouteByTag = function(tag, callback) {
      var coord = [];
      var markers = _this.getMarkersByTag(tag);
      for (var i = 0; i < markers.length; i++) {
        coord.push(new google.maps.LatLng(markers[i].position.lat(), markers[i].position.lng()));
      }
      _this.drawRoute(coord, callback);
    };

    _this.addLayer = function(geoString, params) {
      params = params || Object.create({});

      let geoJson;
      if (typeof geoString == 'string') {
        geoJson = JSON.parse(geoString);
      } else {
        geoJson = geoString;
      }

      let getJsonStyle = Object.assign({ strokeColor: '#999', strokeOpacity: 1, strokeWeight: 0.5 }, params.style);
      let getJsonCustom = Object.create({});

      getJsonCustom.id = params.id;
      getJsonCustom.data = params.data;
      getJsonCustom.tag = params.tag;

      var geoJsonLayer = new google.maps.Data();
      geoJsonLayer.addGeoJson(geoJson);
      geoJsonLayer.setMap(_this.map);
      geoJsonLayer.setStyle(getJsonStyle);
      geoJsonLayer.custom = getJsonCustom;
      geoJsonLayer.addListener('click', function(event) {
        _this.events.trigger('layer.click', geoJsonLayer, event);
      });

      _this.layers.push(geoJsonLayer);
      return geoJsonLayer;
    };

    _this.removeLayer = function(id) {
      _this.layers = _this.layers.filter(function(item) {
        if (item.custom && (item.custom.id == id)) {
          item.setMap(null);
          return false;
        }
        return true;
      });
    };

    _this.layerExists = function(id) {
      let result =  _this.layers.filter(function(item) {
        return (item.custom && (item.custom.id == id));
      });
      return result.length > 0;
    };

    _this.removeLayers = function(tag) {
      _this.layers = _this.layers.filter(function(item) {
        if (!tag || (item.custom && (item.custom.tag == tag))) {
          item.setMap(null);
          return false;
        }
        return true;
      });
    };

    _this.pointToFeature = function(lng, lat, properties) {
      let geoJson = { type: 'Feature'
                    , geometry: { type: 'Point', 'coordinates': [ lng, lat ] }
                    , properties: Object.assign({ latitude: lat, longitude: lng, "marker-size": "medium", "marker-symbol": "triangle" }, properties)
                    };
      return geoJson;
    };

    if (_this.weather) {
      _this.showWeather();
    }

    return _this;

  }

  window.br = window.br || {};

  window.br.googleMap = function (selector, options) {
    return new BrGoogleMap(selector, options);
  };

})(jQuery, window);
