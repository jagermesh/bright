/*!
 * Bright 2.0
 *
 * Copyright 2012-2019, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global google */

(function($, window) {
  window.br = window.br || {};

  function BrGoogleMap(selector, options) {
    const _this = this;

    _this.events = br.eventQueue(this);
    _this.before = function(event, callback) {
      this.events.before(event, callback);
    };
    _this.on = function(event, callback) {
      this.events.on(event, callback);
    };
    _this.after = function(event, callback) {
      this.events.after(event, callback);
    };

    if (!google.maps.Polygon.prototype.getBounds) {
      google.maps.Polygon.prototype.getBounds = function() {
        let paths = this.getPaths();
        let bounds = new google.maps.LatLngBounds();
        paths.forEach(function(path) {
          let points = path.getArray();
          for (let i = 0, length = points.length; i < length; i++) {
            bounds.extend(points[i]);
          }
        });
        return bounds;
      };
    }

    let worldCenter = new google.maps.LatLng(42, 18);
    let singleClickTimeout;

    options = options || {};
    options.zoom = options.zoom || 3;
    options.mapCenter = options.mapCenter || worldCenter;
    options.mapType = options.mapType || google.maps.MapTypeId.ROADMAP;

    if (typeof options.streetViewControl == 'undefined') {
      options.streetViewControl = true;
    }
    if (typeof options.panControl == 'undefined') {
      options.panControl = true;
    }
    if (typeof options.mapTypeControl == 'undefined') {
      options.mapTypeControl = true;
    }
    if (typeof options.zoomControl == 'undefined') {
      options.zoomControl = true;
    }
    if (typeof options.scaleControl == 'undefined') {
      options.scaleControl = true;
    }
    if (typeof options.rotateControl == 'undefined') {
      options.rotateControl = true;
    }
    if (typeof options.mapType == 'undefined') {
      options.mapType = google.maps.MapTypeId.ROADMAP;
    }

    _this.mapOptions = {
      zoom: options.zoom,
      maxZoom: options.maxZoom,
      center: options.mapCenter,
      mapTypeId: options.mapType,
      mapTypeControl: options.mapTypeControl,
      panControl: options.panControl,
      zoomControl: options.zoomControl,
      scaleControl: options.scaleControl,
      streetViewControl: options.streetViewControl,
      rotateControl: options.rotateControl
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

    _this.markers = [];
    _this.polygons = [];
    _this.layers = [];

    google.maps.event.addListener(_this.map, 'click', function(event) {
      _this.events.trigger('click', event);
      (function(zoomLevel, event0) {
        singleClickTimeout = window.setTimeout(function() {
          if (zoomLevel == _this.map.getZoom()) {
            _this.events.trigger('singleclick', event0);
          }
        }, 300);
      })(_this.map.getZoom(), event);
    });

    function computeRouteParams(result) {
      let distance = 0;
      let duration = 0;
      let myroute = result.routes[0];
      myroute.legs.forEach(function(item) {
        distance += item.distance.value;
        duration += item.duration.value;
      });
      return {
        distance: distance,
        duration: duration
      };
    }

    google.maps.event.addListener(_this.directionsDisplay, 'directions_changed', function() {
      let routeParams = computeRouteParams(_this.directionsDisplay.directions);
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
          let pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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
        _this.weatherLayer = new google.maps.weather.WeatherLayer();
        _this.weatherLayer.setMap(_this.map);
      } else
      if (!show && _this.weatherVisible()) {
        _this.weatherLayer.setMap(null);
        _this.weatherLayer = null;
      }
    };

    _this.clearPoi = function() {
      _this.removePolygons();
      _this.removeMarkers();
      _this.removeLayers();
    };

    _this.setMapType = function(value) {
      switch (value) {
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
      switch (value) {
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
      let bounds = new google.maps.LatLngBounds();
      _this.markers.forEach(function(marker) {
        processPoints(new google.maps.LatLng(marker.position.lat(), marker.position.lng()), bounds.extend, bounds);
      });
      _this.polygons.forEach(function(polygon) {
        processPoints(polygon.latLngs, bounds.extend, bounds);
      });
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
          let pos = new google.maps.LatLng(points[0].lat, points[0].lng);
          _this.map.setCenter(pos);
          _this.map.setZoom(17);
          if (typeof callback == 'function') {
            callback.call(_this);
          }
        }
      });
    };

    _this.findAddress = function(address, callback) {
      _this.geocoder.geocode({
        'address': address
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          let points = results.map(function(item) {
            return {
              lat: item.geometry.location.lat(),
              lng: item.geometry.location.lng(),
              name: item.formatted_address,
              raw: item
            };
          });
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

    _this.drawRoute = function(coordinates, callback) {
      let origin = null;
      let destination = null;
      let waypoints = [];
      for (let latLng of coordinates) {
        if (origin === null) {
          origin = latLng;
        } else
        if (destination === null) {
          destination = latLng;
        } else {
          waypoints.push({
            location: destination,
            stopover: true
          });
          destination = latLng;
        }
      }
      if ((origin !== null) && (destination !== null)) {
        let request = {
          origin: origin,
          destination: destination,
          waypoints: waypoints,
          travelMode: _this.travelMode
        };
        _this.directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            _this.directionsDisplay.setMap(_this.map);
            _this.directionsDisplay.setDirections(response);
            let routeParams = computeRouteParams(_this.directionsDisplay.directions);
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
      let markers = _this.getMarkersByTag(tag);
      let coord = markers.map(function(item) {
        return new google.maps.LatLng(item.position.lat(), item.position.lng());
      });
      _this.drawRoute(coord, callback);
    };

    _this.pointToFeature = function(lng, lat, properties) {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        properties: Object.assign({
          latitude: lat,
          longitude: lng,
          "marker-size": "medium",
          "marker-symbol": "triangle"
        }, properties)
      };
    };

    // layers

    _this.addLayer = function(geoString, params) {
      params = params || {};

      let geoJson;
      if (typeof geoString == 'string') {
        geoJson = JSON.parse(geoString);
      } else {
        geoJson = geoString;
      }

      let getJsonStyle = Object.assign({
        strokeColor: '#999',
        strokeOpacity: 1,
        strokeWeight: 0.5
      }, params.style);

      let getJsonCustom = {};

      getJsonCustom.id = params.id;
      getJsonCustom.data = params.data;
      getJsonCustom.tag = params.tag;

      let geoJsonLayer = new google.maps.Data();
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

    _this.getLayer = function(id) {
      let result = _this.layers.filter(function(item) {
        return (item.custom && (item.custom.id == id));
      });
      if (result.length > 0) {
        return result[0];
      }
    };

    _this.layerExists = function(id) {
      let result = _this.layers.filter(function(item) {
        return (item.custom && (item.custom.id == id));
      });
      return result.length > 0;
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

    _this.removeLayers = function(tag) {
      _this.layers = _this.layers.filter(function(item) {
        if (!tag || (item.custom && (item.custom.tag == tag))) {
          item.setMap(null);
          return false;
        }
        return true;
      });
    };

    // markers

    _this.addMarker = function(lat, lng, params, tag, custom) {
      let inputParams = params || {};
      let markerParams = {};
      markerParams.icon = inputParams.icon || null;
      markerParams.draggable = inputParams.draggable || false;
      let latLng = new google.maps.LatLng(lat, lng);
      let marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: markerParams.icon,
        draggable: markerParams.draggable
      });
      marker.custom = custom || {};
      marker.tag = tag;
      _this.markers.push(marker);
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
      return _this.markers.filter(function(marker) {
        return marker.tag == tag;
      });
    };

    _this.getMarkersCount = function() {
      return _this.markers.length;
    };

    _this.removeMarker = function(marker) {
      marker.setMap(null);
    };

    _this.removeMarkers = function(tag) {
      _this.markers.forEach(function(marker) {
        if (!tag || (marker.tag == tag)) {
          marker.setMap(null);
        }
      });
      _this.markers = _this.markers.filter(function(marker) {
        return !!marker.getMap();
      });
    };

    // polygons

    _this.addGeoJSONPolygon = function(geoData, params, tag, custom) {
      function arrayMap(array, callback) {
        let original_callback_params = Array.prototype.slice.call(arguments, 2);
        let array_return = [];
        let array_length = array.length;
        if (Array.prototype.map && (array.map === Array.prototype.map)) {
          array_return = Array.prototype.map.call(array, function(item) {
            const callback_params = original_callback_params;
            callback_params.splice(0, 0, item);
            return callback.apply(this, callback_params);
          });
        } else {
          for (let i = 0; i < array_length; i++) {
            const callback_params = original_callback_params;
            callback_params.splice(0, 0, array[i]);
            array_return.push(callback.apply(this, callback_params));
          }
        }
        return array_return;
      }

      function arrayFlat(array) {
        let result = [];
        for (let value of array) {
          result = result.concat(value);
        }
        return result;
      }

      function coordsToLatLngs(coords, useGeoJSON) {
        let first_coord = coords[0];
        let second_coord = coords[1];
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
          } else {
            coords[i] = coordsToLatLngs(coords[i], useGeoJSON);
          }
        }
        return coords;
      }
      params = params || {};
      let polygonParams = {};
      let coordinates = JSON.parse(JSON.stringify(geoData));
      polygonParams.paths = arrayFlat(arrayMap(coordinates, arrayToLatLng, true));
      polygonParams.strokeColor = params.strokeColor || '#999';
      polygonParams.strokeOpacity = params.strokeOpacity || 1;
      polygonParams.strokeWeight = params.strokeWeight || 0.5;
      polygonParams.fillColor = params.fillColor;
      if (polygonParams.fillColor) {
        if (params.fillOpacity == undefined) {
          polygonParams.fillOpacity = 0.3;
        } else {
          polygonParams.fillOpacity = params.fillOpacity;
        }
      } else {
        polygonParams.fillOpacity = 0;
      }
      polygonParams.map = _this.map;
      let polygon = new google.maps.Polygon(polygonParams);
      polygon.custom = custom;
      polygon.tag = tag;
      _this.polygons.push(polygon);
      google.maps.event.addListener(polygon, 'click', function(event) {
        _this.events.trigger('polygon.click', polygon, event);
      });
      return polygon;
    };

    _this.getPolygonsByTag = function(tag) {
      return _this.polygons.filter(function(polygon) {
        return polygon.tag == tag;
      });
    };

    _this.getPolygonsCount = function() {
      return _this.polygons.length;
    };

    _this.removePolygon = function(polygon) {
      polygon.setMap(null);
    };

    _this.removePolygons = function(tag) {
      _this.polygons.forEach(function(polygon) {
        if (!tag || (polygon.tag == tag)) {
          polygon.setMap(null);
        }
      });
      _this.polygons = _this.polygons.filter(function(polygon) {
        return !!polygon.getMap();
      });
    };

    // init

    if (_this.weather) {
      _this.showWeather();
    }

    return _this;
  }

  window.br.googleMap = function(selector, options) {
    return new BrGoogleMap(selector, options);
  };
})(jQuery, window);