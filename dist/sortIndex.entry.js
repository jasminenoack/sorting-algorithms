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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ({

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SortIndex;
(function (SortIndex) {
    var ReverseElement = document.getElementById('reverse-sorts');
    var boxHeight = 500;
    var boxWidth = 500;
    // const delay = 100
    // const delayOnComplete = 2000
    // const size = Sizes._25
    // const valueType = new ValueTypes.Integer()
    // const shuffle = new Shuffles.RandomShuffle()
    // const board1 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    // const sort1 = new Bubble(board1)
    // const board2 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    // const sort2 = new BubbleShortCircuit(board2)
    // const board3 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    // const sort3 = new BubbleSkipLast(board3)
    // const board4 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    // const sort4 = new BubbleFullyOptimized(board4)
    // const boardList: any[] = [
    //     {
    //         board: board1,
    //         sort: sort1
    //     },
    //     {
    //         board: board2,
    //         sort: sort2
    //     },
    //     {
    //         board: board3,
    //         sort: sort3
    //     },
    //     {
    //         board: board4,
    //         sort: sort4
    //     }
    // ]
    // boardList.forEach((board, index) => {
    //     Index.createBoard(
    //         index, (board.sort.constructor as any), boardList,
    //         boxHeight, boxWidth, OptimizationsElement
    //     )
    // })
    // Index.autoRunBoards(boardList, boxHeight, boxWidth, OptimizationsElement, delay, delayOnComplete)
    // Index.manageAutoRunCharts(boardList, 1000, 'optimize-chart')
})(SortIndex || (SortIndex = {}));


/***/ })

/******/ });