(self["webpackChunkimpossible_chessboard"] = self["webpackChunkimpossible_chessboard"] || []).push([[179],{

/***/ 889:
/***/ (() => {

var isWindows = function isWindows() {
  return navigator.platform.indexOf('Win') > -1;
};

if (isWindows) {
  document.body.classList.add('isWindows');
}

/***/ }),

/***/ 530:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// CONCATENATED MODULE: ./src/fittext.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***

Scalable fonts for the coin (H,T,🔑,🔍)
Adapted from https://github.com/adactio/FitText.js

***/
var addEvent = function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false);
  } else {
    el.attachEvent('on' + type, fn);
  }
};

var fitText = function fitText(el, kompressor, options) {
  var settings = _objectSpread({
    minFontSize: -1 / 0,
    maxFontSize: 1 / 0
  }, options);

  var fit = function fit(el) {
    var compressor = kompressor || 1;
    var debounceTimer;

    var resizer = function resizer() {
      clearTimeout(debounceTimer);
      setTimeout(function () {
        el.style.fontSize = Math.max(Math.min(el.clientWidth / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + 'px';
      }, 50);
    }; // Call once to set.


    resizer(); // Bind events
    // If you have any js library which support Events, replace this part
    // and remove addEvent function (or use original jQuery version)

    addEvent(window, 'resize', resizer);
    addEvent(window, 'orientationchange', resizer);
  };

  if (el.length) {
    for (var i = 0; i < el.length; i++) {
      fit(el[i]);
    }
  } else {
    fit(el);
  } // return set of elements


  return el;
};
// CONCATENATED MODULE: ./src/board.js
/***

All the GUI stuff

***/

var longPressMs = 300;
var isTouchDevice = false; // Create chessboard in HTML

var createBoard = function createBoard(_ref) {
  var board = _ref.board,
      rowSize = _ref.rowSize,
      update = _ref.update,
      updateKey = _ref.updateKey,
      cells = _ref.cells,
      flipCell = _ref.flipCell;
  board.innerHTML = '';
  var longPressTimer;
  var didJustLongPress = false;
  var numCells = cells.length;

  var updateStyle = function updateStyle() {
    var cellWidth;
    var v;

    if (window.innerWidth > 1224) {
      cellWidth = 70 / rowSize;
      v = 'vh';
    } else if (window.innerWidth > 1023) {
      cellWidth = 50 / rowSize;
      v = 'vh';
    } else if (window.innerWidth > 600) {
      cellWidth = 70 / rowSize;
      v = 'vw';
    } else {
      cellWidth = 90 / rowSize;
      v = 'vw';
    }

    board.style.gridTemplateRows = "repeat(".concat(rowSize, ", [row] ").concat(cellWidth).concat(v, ")");
    board.style.gridTemplateColumns = "repeat(".concat(rowSize, ", [col] ").concat(cellWidth).concat(v, ")");
  };

  window.addEventListener('resize', updateStyle);
  window.addEventListener('orientationchange', updateStyle);
  updateStyle();

  var _loop = function _loop(i) {
    var cell = document.createElement('div');
    var coin = document.createElement('div');
    cell.classList.add('cell');
    coin.classList.add('coin'); // Colour the cells like a chessboard
    // This is not as simple as doing a mod 2, that results in stripes

    var rowNum = Math.floor(i / rowSize);

    if (i % 2 !== rowNum % 2) {
      cell.classList.add('dark');
    }

    cell.append(coin);
    board.append(cell);

    var onDown = function onDown() {
      clearTimeout(longPressTimer);
      longPressTimer = setTimeout(function () {
        updateKey(i);
        update();
        didJustLongPress = true;
      }, longPressMs);
    };

    var onUp = function onUp() {
      if (!didJustLongPress) {
        clearTimeout(longPressTimer);
        flipCell(i);
        update();
      }

      didJustLongPress = false;
    };

    cell.addEventListener('touchstart', function () {
      isTouchDevice = true;
      onDown();
    });
    cell.addEventListener('touchend', onUp);
    cell.addEventListener('mousedown', function () {
      if (!isTouchDevice) {
        onDown();
      }
    });
    cell.addEventListener('mouseup', function () {
      if (!isTouchDevice) {
        onUp();
      }
    });
  };

  for (var i = 0; i < numCells; i++) {
    _loop(i);
  }
};
var updateBoard = function updateBoard() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      board = _ref2.board,
      decodedIndex = _ref2.decodedIndex,
      secretIndex = _ref2.secretIndex,
      solutionIndex = _ref2.solutionIndex,
      cells = _ref2.cells;

  board.querySelectorAll('.cell').forEach(function (cell, i) {
    // Give cells heads/tails label
    var coin = cell.querySelector('.coin');
    coin.classList.toggle('isHead', cells[i] === true); // Style cells accordingly

    cell.classList.toggle('hasDecoded', i === decodedIndex);
    cell.classList.toggle('hasKey', i === secretIndex);
    cell.classList.toggle('selected', i === solutionIndex); // Hacky way to get fonts (including emojis) to resize for different screen sizes

    fitText(cell, 0.3);
    fitText(coin, 0.2);
  });
};
// CONCATENATED MODULE: ./src/state.js
var state = {
  cells: [],
  keyIndex: 0,
  rowSize: 8
};
var getNumCells = function getNumCells() {
  return Math.pow(state.rowSize, 2);
};
var randomizeCells = function randomizeCells() {
  state.cells = [];

  for (var i = 0; i < getNumCells(); i++) {
    state.cells[i] = Math.random() > 0.5;
  }
};
var randomizeKey = function randomizeKey() {
  state.keyIndex = Math.floor(Math.random() * getNumCells());
};
var updateKey = function updateKey(i) {
  state.keyIndex = i;
};
var updateRowSize = function updateRowSize(r) {
  state.rowSize = r;
};
var flipCell = function flipCell(i) {
  state.cells[i] = !state.cells[i];
}; // Find secret index of warden's key by doing XOR on all indexes with true cells (heads)
// How this works: https://www.youtube.com/watch?v=b3NxrZOu_CE&t=352s

var decodeCells = function decodeCells() {
  return state.cells.reduce(function (prev, curr, i) {
    return state.cells[i] === true ? prev ^ i // ✨
    : prev;
  }, 0);
};
var getSolution = function getSolution(currDecode, targetDecode) {
  return currDecode ^ targetDecode;
};
// EXTERNAL MODULE: ./src/browserTweaks.js
var browserTweaks = __webpack_require__(889);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[4].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/index.scss
var styles = __webpack_require__(922);
// CONCATENATED MODULE: ./src/styles/index.scss

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(styles/* default */.Z, options);



/* harmony default export */ const src_styles = (styles/* default.locals */.Z.locals || {});
// CONCATENATED MODULE: ./src/fitText.js
function fitText_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function fitText_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { fitText_ownKeys(Object(source), true).forEach(function (key) { fitText_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { fitText_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function fitText_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***

Scalable fonts for the coin (H,T,🔑,🔍)
Adapted from https://github.com/adactio/FitText.js

***/
var fitText_addEvent = function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false);
  } else {
    el.attachEvent('on' + type, fn);
  }
};

var fitText_fitText = function fitText(el, kompressor, options) {
  var settings = fitText_objectSpread({
    minFontSize: -1 / 0,
    maxFontSize: 1 / 0
  }, options);

  var fit = function fit(el) {
    var compressor = kompressor || 1;
    var debounceTimer;

    var resizer = function resizer() {
      clearTimeout(debounceTimer);
      setTimeout(function () {
        el.style.fontSize = Math.max(Math.min(el.clientWidth / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + 'px';
      }, 50);
    }; // Call once to set.


    resizer(); // Bind events
    // If you have any js library which support Events, replace this part
    // and remove addEvent function (or use original jQuery version)

    fitText_addEvent(window, 'resize', resizer);
    fitText_addEvent(window, 'orientationchange', resizer);
  };

  if (el.length) {
    for (var i = 0; i < el.length; i++) {
      fit(el[i]);
    }
  } else {
    fit(el);
  } // return set of elements


  return el;
};
// CONCATENATED MODULE: ./src/index.js





var board = document.querySelector('.board');

var src_update = function update() {
  var decodedIndex = decodeCells();
  updateBoard({
    board: board,
    cells: state.cells,
    decodedIndex: decodedIndex,
    secretIndex: state.keyIndex,
    solutionIndex: getSolution(decodedIndex, state.keyIndex)
  });
};

var init = function init() {
  randomizeKey();
  randomizeCells();
  createBoard({
    board: board,
    rowSize: state.rowSize,
    cells: state.cells,
    update: src_update,
    flipCell: flipCell,
    updateKey: updateKey
  });
  src_update();
};

document.querySelector('#randomize').addEventListener('click', function () {
  randomizeKey();
  randomizeCells();
  src_update();
});
document.querySelector('#auto-solve').addEventListener('click', function () {
  randomizeKey();
  randomizeCells();
  flipCell(getSolution(decodeCells(), state.keyIndex));
  src_update();
}); // Populate grid select

var gridSizeSelect = document.querySelector('#grid-size');
var numGridOptions = 4;
var rowSize = 2;

for (var i = 0; i < numGridOptions; i++) {
  var src_option = document.createElement('option');
  src_option.value = rowSize;
  src_option.selected = rowSize === state.rowSize;
  src_option.textContent = Math.pow(rowSize, 2);
  gridSizeSelect.append(src_option);
  rowSize *= 2;
}

gridSizeSelect.addEventListener('change', function () {
  updateRowSize(gridSizeSelect.value);
  init();
}); // Filter functionality

var filters = ['key', 'decoded', 'selected'];
filters.forEach(function (filter) {
  var checkbox = document.querySelector("#show-".concat(filter));

  var toggle = function toggle() {
    return board.classList.toggle("show-".concat(filter), checkbox.checked);
  };

  checkbox.addEventListener('change', toggle);
  toggle();
}); // Style header

fitText_fitText(document.querySelector('.main-title'), 2);
init();

/***/ }),

/***/ 922:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 15:
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === 'function') {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
};

/***/ }),

/***/ 379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

},
0,[[530,666]]]);