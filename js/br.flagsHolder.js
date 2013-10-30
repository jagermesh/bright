/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function (window) {

  function BrFlagsHolder(permanent, name) {

    var flags = [];

    this.append = function(id) {
      if (permanent) {
        br.storage.appendUnique(name, id);
      } else
      if (this.isFlagged(id)) {
      } else {
        flags.push(id);
      }
    }

    this.isFlagged = function(id) {
      if (permanent) {
        return (br.storage.indexOf(name, id) != -1);
      } else {
        return (flags.indexOf(id) != -1);
      }
    }

    this.remove = function(id) {
      if (permanent) {
        br.storage.remove(name, id);
      } else {
        var idx = flags.indexOf(id);
        if (idx != -1) {
          flags.splice(idx, 1);
        }
      }
    }

    this.clear = function() {
      this.replace([]);
    }

    this.replace = function(values) {
      if (permanent) {
        return br.storage.set(name, values);
      } else {
        flags = values;
        return flags;
      }
    }

    this.get = function() {
      if (permanent) {
        return br.storage.get(name, []);
      } else {
        return flags;
      }
    }

  }

  window.br = window.br || {};

  window.br.flagsHolder = function (permanent, name) {
    return new BrFlagsHolder(permanent, name);
  }

})(window);
