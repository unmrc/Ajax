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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var searchElement = document.getElementById('search');
searchElement.addEventListener('change', Ajax);
var currentPage = 1;
function Ajax() {
    var url = 'http://www.omdbapi.com/?apikey=a5a1b624';
    var s = searchElement.value;
    url += '&s=' + s;
    // url += '&page=' + currentPage;
    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (myJson) {
        OutputElements(myJson);
    });
}
Ajax();
function OutputElements(myJson) {
    var films = document.getElementById('films');
    films.innerHTML = '';
    var movies = myJson.Search;
    console.log(myJson);
    var _loop_1 = function (i) {
        var element = movies[i];
        var divCard = document.createElement('div');
        var divNogutters = document.createElement('div');
        var divCol4 = document.createElement('div');
        var img = document.createElement('img');
        var divCol8 = document.createElement('div');
        var divCardBody = document.createElement('div');
        var h5 = document.createElement('h5');
        var p = document.createElement('p');
        var a = document.createElement('a');
        img.src = element.Poster;
        divCard.appendChild(divNogutters);
        divCard.classList.add('col-6', 'card', 'mb-3');
        divNogutters.classList.add('row', 'no-gutters');
        divNogutters.appendChild(divCol4);
        divCol4.classList.add('col-md-4');
        divCol4.appendChild(img);
        img.classList.add('card-img');
        // img.style.objectFit = 'cover';
        // img.style.height = '100%';
        divNogutters.appendChild(divCol8);
        divCol8.classList.add('col-md-8');
        divCol8.appendChild(divCardBody);
        divCardBody.classList.add('card-body');
        divCardBody.appendChild(h5);
        h5.classList.add('card-title');
        h5.textContent = element.Title;
        divCardBody.appendChild(p);
        p.classList.add('card-text');
        p.textContent = element.Year;
        divCardBody.appendChild(a);
        a.classList.add('btn', 'btn-primary');
        a.textContent = 'More...';
        films.appendChild(divCard);
        a.addEventListener('click', function () { AjaxMovie(element.imdbID); });
    };
    for (var i = 0; i < movies.length; i++) {
        _loop_1(i);
    }
}
function AjaxMovie(id) {
    var url = "http://www.omdbapi.com/?apikey=a5a1b624";
    url += '&i=' + id;
    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (myJson) {
        console.log(myJson);
    });
}
;


/***/ })
/******/ ]);