/*!
 * Bright 2.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

/* global Int32Array */

(function(window) {
  window.br = window.br || {};

  function BrProfiler() {
    function stopwatch() {
      this.start_time = 0;
      this.stop_time = 0;
      this.run_time = 0;
      this.running = false;

      this.start = function() {
        this.start_time = new Date().getTime();
        this.running = true;
      };

      this.stop = function() {
        this.stop_time = new Date().getTime();
        this.run_time = (this.stop_time - this.start_time);
        this.running = false;
      };

      this.get_runtime = function() {
        return this.run_time;
      };

      this.reset = function() {
        this.run_time = 0;
      };

      return this;
    }

    function buffer(size) {
      this.arr = new Int32Array(size);
      this.begin = 0;
      this.end = -1;
      this.num_el = 0;
      this.arr_size = size;

      this.push_back = function(elem) {
        if (this.num_el < this.arr_size) {
          this.end++;
          this.arr[this.end] = elem;
          this.num_el++;
        } else {
          this.end = (this.end + 1) % this.arr_size;
          this.begin = (this.begin + 1) % this.arr_size;
          this.arr[this.end] = elem;
        }
      };

      this.get = function(i) {
        return this.arr[(this.begin + i) % this.arr_size];
      };

      this.size = function() {
        return this.num_el;
      };

      return this;
    }

    let count_frames = 0;
    let ringbuff = new buffer(20);

    this.fps = 0.0;
    this.timers = [];
    this.frame_timer = new stopwatch();

    this.add = function(subj) {
      this.timers.push([subj, new stopwatch()]);
    };

    this.new_frame = function() {
      ++count_frames;
      let n = this.timers.length | 0;
      for (let i = 0; i < n; ++i) {
        let sw = this.timers[i][1];
        sw.reset();
      }

      if (count_frames >= 1) {
        this.frame_timer.stop();
        ringbuff.push_back(this.frame_timer.get_runtime());
        let size = ringbuff.size();
        let sum = 0;
        for (let i = 0; i < size; ++i) {
          sum += ringbuff.get(i);
        }
        this.fps = size / sum * 1000;
        this.frame_timer.start();
      }
    };

    this.find_task = function(subj) {
      let n = this.timers.length | 0;
      for (let i = 0; i < n; ++i) {
        let pair = this.timers[i];
        if (pair[0] === subj) {
          return pair;
        }
      }
      this.add(subj);
      return this.find_task(subj);
    };

    this.start = function(subj) {
      let task = this.find_task(subj);
      task[1].start();
    };

    this.stop = function(subj, printToConsole) {
      let task = this.find_task(subj);
      task[1].stop();
      if (printToConsole) {
        br.log(task[0] + ": " + task[1].get_runtime() + "ms");
      }
    };

    this.log = function(printToConsole) {
      let n = this.timers.length | 0;
      let str = "<strong>FPS: " + this.fps.toFixed(2) + "</strong>";
      let str2 = "FPS: " + this.fps.toFixed(2);
      for (let i = 0; i < n; ++i) {
        let pair = this.timers[i];
        str += "<br/>" + pair[0] + ": " + pair[1].get_runtime() + "ms";
        str2 += ", " + pair[0] + ": " + pair[1].get_runtime() + "ms";
      }
      if (printToConsole) {
        br.log(str2);
      }
      return str;
    };

    return this;
  }

  let profiler;

  window.br.profiler = function(create) {
    if (create) {
      return new BrProfiler();
    } else
    if (!profiler) {
      profiler = new BrProfiler();
    }
    return profiler;
  };
})(window);