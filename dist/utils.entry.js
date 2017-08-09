/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ 24:
/***/ (function(module, exports) {

Array.prototype.shuffle = function () {
    // fisher yates shuffling algorithm
    if (Object.keys(this.distribution()).length === 1) {
        return this;
    }
    var newArr = this.slice();
    var old = newArr.slice();
    for (var i = 0; i < this.length; i++) {
        var randomInt = Math.floor(Math.random() * newArr.length);
        this[i] = newArr.splice(randomInt, 1)[0];
    }
    if (this.isEqual(old)) {
        this.shuffle();
    }
    return this;
};
Array.prototype.isEqual = function (array) {
    if (this.length !== array.length) {
        return false;
    }
    return !this.any(function (num, i) {
        return num !== array[i];
    });
};
Array.prototype.range = function (length) {
    var arr = [];
    for (var i = 0; i < length; i++) {
        arr.push(i);
    }
    return arr;
};
Array.prototype.sortNumbers = function () {
    this.sort(function (x, y) {
        if (x < y) {
            return -1;
        }
        else if (y < x) {
            return 1;
        }
        else {
            return 0;
        }
    });
    return this;
};
Array.prototype.differenceFromOrdered = function () {
    var values = this;
    var ordered = Array.prototype.range(values.length);
    var difference = 0;
    for (var i = 0; i < values.length; i++) {
        difference += Math.abs(values[i] - i);
    }
    return difference;
};
Array.prototype.kShuffle = function (k) {
    var startingArray = this.slice();
    var numberToShuffle = this.length / 5;
    while (numberToShuffle) {
        var indexToInsert = Math.floor(Math.random() * this.length);
        var add = Math.floor(Math.random() * 2);
        var movement = Math.ceil(Math.random() * k);
        var insertPoint = void 0;
        if (add) {
            insertPoint = Math.min(this.length - 1, indexToInsert + movement);
        }
        else {
            insertPoint = Math.max(0, indexToInsert - movement);
        }
        if (insertPoint !== indexToInsert &&
            startingArray[indexToInsert] === this[indexToInsert]) {
            var valueToInsert = this[indexToInsert];
            this.splice(indexToInsert, 1);
            this.splice(insertPoint, 0, valueToInsert);
            numberToShuffle--;
        }
    }
    return this;
};
Array.prototype.distribution = function () {
    var dist = {};
    var values = this;
    values.forEach(function (value) {
        dist[value] = (dist[value] || 0) + 1;
    });
    return dist;
};
Array.prototype.sorted = function () {
    var values = this;
    var ordered = true;
    for (var i = 0; i < values.length - 1; i++) {
        if (values[i] > values[i + 1]) {
            return false;
        }
    }
    return true;
};
Array.prototype.any = function (fun) {
    for (var i = 0; i < this.length; i++) {
        if (fun(this[i], i)) {
            return true;
        }
    }
    return false;
};


/***/ })

/******/ });