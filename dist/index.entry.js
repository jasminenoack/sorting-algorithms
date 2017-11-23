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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var routerLocation_1 = __webpack_require__(11);
/**
 * Router manages locations.
 *
 * Send a string that can be converted into a reg ex.
 *
 * examples:
 *
 * base: ""
 * hard url: "other"
 * url params: "a/(c|.*)/b" || "a/(c|\\d*)/b"
 * query string "?a=1"
 *
 * returns
 * location: "other"
 * url params: {c: "123"}
 * query string: {a: "1"}
 *
 * To construct the router send in the element the router should control.
 *
 * For registering each route pass the string and a function to register.
 * The function should return HTML the router will place the html in the page.
 */
var Router = /** @class */ (function () {
    function Router(element) {
        this.element = element;
        this.locations = [];
        this.listenToChange = this.listenToChange.bind(this);
        this.listenToChange();
        window.onpopstate = this.listenToChange;
    }
    Router.prototype.listenToChange = function (event) {
        var _this = this;
        var location;
        if (event) {
            location = event.target.location;
        }
        else {
            location = window.location;
        }
        // tslint:disable-next-line:prefer-const
        var hash = this.cleanHash(location.hash);
        var rendered = false;
        this.locations.forEach(function (loc) {
            var urlParams = loc.match(hash);
            if (urlParams && !rendered) {
                rendered = true;
                var query = _this.processQuery(location.search);
                var html = loc.fun(hash, urlParams, query);
                _this.element.innerHTML = html;
            }
        });
    };
    Router.prototype.register = function (location, fun) {
        this.locations.push(new routerLocation_1.RouterLocation(location, fun));
    };
    Router.prototype.cleanHash = function (hash) {
        return hash.replace(/^#?\/?/, "").replace(/\/$/, "");
    };
    Router.prototype.processQuery = function (search) {
        search = search.replace(/^\?/, "");
        if (!search) {
            return {};
        }
        var params = search.split("&");
        var query = {};
        params.forEach(function (param) {
            if (param) {
                var _a = param.split("="), key = _a[0], value = _a[1];
                query[key] = value || "";
            }
        });
        return query;
    };
    return Router;
}());
exports.Router = Router;


/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RouterLocation = /** @class */ (function () {
    function RouterLocation(location, fun) {
        this.fun = fun;
        var names = [];
        // if location is a string
        // check for match sections
        if (location.indexOf("(") !== -1) {
            var groups = location.match(/\([^)]*\)/g);
            groups.forEach(function (group) {
                var groupTrimmed = group.replace(/^\(/, "").replace(/\)$/, "");
                if (groupTrimmed.indexOf("|") !== -1) {
                    var _a = groupTrimmed.split("|"), name_1 = _a[0], regex = _a[1];
                    names.push(name_1);
                    location = location.replace(group, "(" + regex + ")");
                }
                else {
                    names.push(groupTrimmed);
                }
            });
        }
        this.names = names;
        this.location = new RegExp(location);
    }
    RouterLocation.prototype.match = function (hash) {
        var match = hash.match(this.location);
        if (!match) {
            return;
        }
        var urlParams = {};
        this.names.forEach(function (name, index) {
            urlParams[name] = match[index + 1];
        });
        return urlParams;
    };
    return RouterLocation;
}());
exports.RouterLocation = RouterLocation;


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(10);
var router = new router_1.Router();
// tslint:disable-next-line:no-var-requires
// const tpl = require("../templates/index.njk");
// const html = tpl.render();
// window.onpopstate = function (event) {
//   console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
// };


/***/ })

/******/ });