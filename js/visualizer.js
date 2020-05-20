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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/visualizers/visualizer.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/litscript/lib/visualizer.js":
/*!**************************************************!*\
  !*** ./node_modules/litscript/lib/visualizer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const visualizers = {};
/**
 * ## Registering Visualizers
 *
 * Before you can use a visualizer you need to register it using the function
 * below. Another step that is required is to specify the file where the
 * visualizer resides in the `codeFile` setting of the front matter. The code
 * file can import other modules and it might be written in JavaScript or
 * TypeScript. The bundler transpiles TS modules to JS and packs them to a
 * single file.
 */
function registerVisualizer(name, visual) {
    if (name.match(/\s/))
        throw SyntaxError(`Visualizer name "${name}" contains whitespace.`);
    visualizers[name] = visual;
}
exports.registerVisualizer = registerVisualizer;
/**
 * ## Creating Visualizers
 *
 * It is possible to create your visualizers from scratch by defining a
 * function that implements the signature defined above. However, usually
 * it is easier to use some of the helper functions defined below.
 *
 * The first helper creates a new HTML elemenent and places it under the
 * parent element. You can specify the type of the element, its attributes,
 * and a function that returns the content inside the element. The content
 * is assumed to contain a valid HTML string.
 */
function html(render, tag, attrs) {
    return (input, parent) => {
        let res = document.createElement(tag);
        for (let attr in attrs)
            if (attrs.hasOwnProperty(attr))
                res.setAttribute(attr, attrs[attr]);
        res.innerHTML = render(input);
        parent.appendChild(res);
    };
}
exports.html = html;
/**
 * Armed with the `html` function we can define more helpers that output
 * the result of a function in a specific element with a specific style.
 * The first one shows the result inside a `<pre>` tag which is styled
 * as console ouput.
 */
function console(output) {
    return html(output, 'pre', { class: "console" });
}
exports.console = console;
/**
 * The second function shows a styled error message. The style used here
 * is defined in the default template. It is possible also to import your
 * own style sheets (Less or CSS) in the code files you include. They are
 * separated, compiled and packed by the bundler.
 */
function error(message) {
    return html(_ => message, 'div', { class: "error" });
}
exports.error = error;
/**
 * ## Running Visualizers
 *
 * The `runVisualizer` function is exported as a property of the `window`
 * object. It runs the named visualizer with the given parameters. LiTScript
 * generates code that calls this function from a HTML page.
 */
function runVisualizer(name, params, parentId) {
    return __awaiter(this, void 0, void 0, function* () {
        let parent = document.getElementById(parentId);
        if (!parent)
            throw Error(`Visualizer parent id "${parentId}" not found.`);
        let visualize = visualizers[name] ||
            error(`Visualizer "${name}" is not registered.`);
        try {
            yield visualize(params, parent);
        }
        catch (e) {
            error(`Exception thrown by visualizer "${name}".<BR/>
        ${e.toString()}`)("", parent);
        }
    });
}
if (typeof window !== 'undefined')
    window["runVisualizer"] = runVisualizer;
//# sourceMappingURL=visualizer.js.map

/***/ }),

/***/ "./src/visualizers/custom-image.ts":
/*!*****************************************!*\
  !*** ./src/visualizers/custom-image.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CustomImage(params, parent) {
    // console.log(params.split(" "));
    const [name, link] = params.split(" ");
    const image = document.createElement("image");
    //
    image.innerHTML = `
        <a ${link ? `href=${link}` : ""}>
          <img src="../../../images/${name}" style="float:none;display:block;margin-left:auto;margin-right:auto;box-shadow:none"/>
        </a>
      `;
    parent.append(image);
}
exports.CustomImage = CustomImage;


/***/ }),

/***/ "./src/visualizers/fix-text.ts":
/*!*************************************!*\
  !*** ./src/visualizers/fix-text.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// sometimes comment doesn't work, fix it using this visualizer
Object.defineProperty(exports, "__esModule", { value: true });
function FixText(params, parent) {
    const p = document.createElement("p");
    p.innerHTML = `
        <p>
          ${params}
        </p>
      `;
    parent.append(p);
}
exports.FixText = FixText;


/***/ }),

/***/ "./src/visualizers/illustrator.ts":
/*!****************************************!*\
  !*** ./src/visualizers/illustrator.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function Illustrate(params, parent) {
    // console.log(params.split(" "));
    const [name, width, height, isSection = "true"] = params.split(" ");
    const div = document.createElement("div");
    const url = name === "sphere-ocean" ? `./illustrations/${name}/index.html` : `${isSection === "true" ? "../../../" : "../../"}illustrations/${name}/index.html`;
    const style = `"
        border-style: none;
        width: ${width};
        height: ${height};
        overflow: auto;
    "`;
    //
    div.innerHTML = `
        <iframe src=${url} style=${style}></iframe>
    `;
    parent.append(div);
}
exports.Illustrate = Illustrate;


/***/ }),

/***/ "./src/visualizers/visualizer.ts":
/*!***************************************!*\
  !*** ./src/visualizers/visualizer.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const visualizer_1 = __webpack_require__(/*! litscript/lib/visualizer */ "./node_modules/litscript/lib/visualizer.js");
const illustrator_1 = __webpack_require__(/*! ./illustrator */ "./src/visualizers/illustrator.ts");
const custom_image_1 = __webpack_require__(/*! ./custom-image */ "./src/visualizers/custom-image.ts");
const fix_text_1 = __webpack_require__(/*! ./fix-text */ "./src/visualizers/fix-text.ts");
visualizer_1.registerVisualizer("illustrator", illustrator_1.Illustrate);
visualizer_1.registerVisualizer("custom-image", custom_image_1.CustomImage);
visualizer_1.registerVisualizer("fix-text", fix_text_1.FixText);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdHNjcmlwdC9saWIvdmlzdWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlzdWFsaXplcnMvY3VzdG9tLWltYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy92aXN1YWxpemVycy9maXgtdGV4dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlzdWFsaXplcnMvaWxsdXN0cmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Zpc3VhbGl6ZXJzL3Zpc3VhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLEtBQUs7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLG1CQUFtQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsaUJBQWlCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELFNBQVM7QUFDMUQ7QUFDQSxpQ0FBaUMsS0FBSztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxLQUFLO0FBQzFELFVBQVUsYUFBYTtBQUN2QjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7Ozs7O0FDaEdhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlLEtBQUssT0FBTztBQUN4QyxzQ0FBc0MsS0FBSyxvQkFBb0IsY0FBYyxpQkFBaUIsa0JBQWtCO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNkYTtBQUNiO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1phO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsS0FBSyxrQkFBa0IsOENBQThDLGdCQUFnQixLQUFLO0FBQ3ZKO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLElBQUksU0FBUyxNQUFNO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkJhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQscUJBQXFCLG1CQUFPLENBQUMsNEVBQTBCO0FBQ3ZELHNCQUFzQixtQkFBTyxDQUFDLHVEQUFlO0FBQzdDLHVCQUF1QixtQkFBTyxDQUFDLHlEQUFnQjtBQUMvQyxtQkFBbUIsbUJBQU8sQ0FBQyxpREFBWTtBQUN2QztBQUNBO0FBQ0EiLCJmaWxlIjoianMvdmlzdWFsaXplci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3Zpc3VhbGl6ZXJzL3Zpc3VhbGl6ZXIudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IHZpc3VhbGl6ZXJzID0ge307XHJcbi8qKlxyXG4gKiAjIyBSZWdpc3RlcmluZyBWaXN1YWxpemVyc1xyXG4gKlxyXG4gKiBCZWZvcmUgeW91IGNhbiB1c2UgYSB2aXN1YWxpemVyIHlvdSBuZWVkIHRvIHJlZ2lzdGVyIGl0IHVzaW5nIHRoZSBmdW5jdGlvblxyXG4gKiBiZWxvdy4gQW5vdGhlciBzdGVwIHRoYXQgaXMgcmVxdWlyZWQgaXMgdG8gc3BlY2lmeSB0aGUgZmlsZSB3aGVyZSB0aGVcclxuICogdmlzdWFsaXplciByZXNpZGVzIGluIHRoZSBgY29kZUZpbGVgIHNldHRpbmcgb2YgdGhlIGZyb250IG1hdHRlci4gVGhlIGNvZGVcclxuICogZmlsZSBjYW4gaW1wb3J0IG90aGVyIG1vZHVsZXMgYW5kIGl0IG1pZ2h0IGJlIHdyaXR0ZW4gaW4gSmF2YVNjcmlwdCBvclxyXG4gKiBUeXBlU2NyaXB0LiBUaGUgYnVuZGxlciB0cmFuc3BpbGVzIFRTIG1vZHVsZXMgdG8gSlMgYW5kIHBhY2tzIHRoZW0gdG8gYVxyXG4gKiBzaW5nbGUgZmlsZS5cclxuICovXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyVmlzdWFsaXplcihuYW1lLCB2aXN1YWwpIHtcclxuICAgIGlmIChuYW1lLm1hdGNoKC9cXHMvKSlcclxuICAgICAgICB0aHJvdyBTeW50YXhFcnJvcihgVmlzdWFsaXplciBuYW1lIFwiJHtuYW1lfVwiIGNvbnRhaW5zIHdoaXRlc3BhY2UuYCk7XHJcbiAgICB2aXN1YWxpemVyc1tuYW1lXSA9IHZpc3VhbDtcclxufVxyXG5leHBvcnRzLnJlZ2lzdGVyVmlzdWFsaXplciA9IHJlZ2lzdGVyVmlzdWFsaXplcjtcclxuLyoqXHJcbiAqICMjIENyZWF0aW5nIFZpc3VhbGl6ZXJzXHJcbiAqXHJcbiAqIEl0IGlzIHBvc3NpYmxlIHRvIGNyZWF0ZSB5b3VyIHZpc3VhbGl6ZXJzIGZyb20gc2NyYXRjaCBieSBkZWZpbmluZyBhXHJcbiAqIGZ1bmN0aW9uIHRoYXQgaW1wbGVtZW50cyB0aGUgc2lnbmF0dXJlIGRlZmluZWQgYWJvdmUuIEhvd2V2ZXIsIHVzdWFsbHlcclxuICogaXQgaXMgZWFzaWVyIHRvIHVzZSBzb21lIG9mIHRoZSBoZWxwZXIgZnVuY3Rpb25zIGRlZmluZWQgYmVsb3cuXHJcbiAqXHJcbiAqIFRoZSBmaXJzdCBoZWxwZXIgY3JlYXRlcyBhIG5ldyBIVE1MIGVsZW1lbmVudCBhbmQgcGxhY2VzIGl0IHVuZGVyIHRoZVxyXG4gKiBwYXJlbnQgZWxlbWVudC4gWW91IGNhbiBzcGVjaWZ5IHRoZSB0eXBlIG9mIHRoZSBlbGVtZW50LCBpdHMgYXR0cmlidXRlcyxcclxuICogYW5kIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBjb250ZW50IGluc2lkZSB0aGUgZWxlbWVudC4gVGhlIGNvbnRlbnRcclxuICogaXMgYXNzdW1lZCB0byBjb250YWluIGEgdmFsaWQgSFRNTCBzdHJpbmcuXHJcbiAqL1xyXG5mdW5jdGlvbiBodG1sKHJlbmRlciwgdGFnLCBhdHRycykge1xyXG4gICAgcmV0dXJuIChpbnB1dCwgcGFyZW50KSA9PiB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuICAgICAgICBmb3IgKGxldCBhdHRyIGluIGF0dHJzKVxyXG4gICAgICAgICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoYXR0cikpXHJcbiAgICAgICAgICAgICAgICByZXMuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJzW2F0dHJdKTtcclxuICAgICAgICByZXMuaW5uZXJIVE1MID0gcmVuZGVyKGlucHV0KTtcclxuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQocmVzKTtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5odG1sID0gaHRtbDtcclxuLyoqXHJcbiAqIEFybWVkIHdpdGggdGhlIGBodG1sYCBmdW5jdGlvbiB3ZSBjYW4gZGVmaW5lIG1vcmUgaGVscGVycyB0aGF0IG91dHB1dFxyXG4gKiB0aGUgcmVzdWx0IG9mIGEgZnVuY3Rpb24gaW4gYSBzcGVjaWZpYyBlbGVtZW50IHdpdGggYSBzcGVjaWZpYyBzdHlsZS5cclxuICogVGhlIGZpcnN0IG9uZSBzaG93cyB0aGUgcmVzdWx0IGluc2lkZSBhIGA8cHJlPmAgdGFnIHdoaWNoIGlzIHN0eWxlZFxyXG4gKiBhcyBjb25zb2xlIG91cHV0LlxyXG4gKi9cclxuZnVuY3Rpb24gY29uc29sZShvdXRwdXQpIHtcclxuICAgIHJldHVybiBodG1sKG91dHB1dCwgJ3ByZScsIHsgY2xhc3M6IFwiY29uc29sZVwiIH0pO1xyXG59XHJcbmV4cG9ydHMuY29uc29sZSA9IGNvbnNvbGU7XHJcbi8qKlxyXG4gKiBUaGUgc2Vjb25kIGZ1bmN0aW9uIHNob3dzIGEgc3R5bGVkIGVycm9yIG1lc3NhZ2UuIFRoZSBzdHlsZSB1c2VkIGhlcmVcclxuICogaXMgZGVmaW5lZCBpbiB0aGUgZGVmYXVsdCB0ZW1wbGF0ZS4gSXQgaXMgcG9zc2libGUgYWxzbyB0byBpbXBvcnQgeW91clxyXG4gKiBvd24gc3R5bGUgc2hlZXRzIChMZXNzIG9yIENTUykgaW4gdGhlIGNvZGUgZmlsZXMgeW91IGluY2x1ZGUuIFRoZXkgYXJlXHJcbiAqIHNlcGFyYXRlZCwgY29tcGlsZWQgYW5kIHBhY2tlZCBieSB0aGUgYnVuZGxlci5cclxuICovXHJcbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UpIHtcclxuICAgIHJldHVybiBodG1sKF8gPT4gbWVzc2FnZSwgJ2RpdicsIHsgY2xhc3M6IFwiZXJyb3JcIiB9KTtcclxufVxyXG5leHBvcnRzLmVycm9yID0gZXJyb3I7XHJcbi8qKlxyXG4gKiAjIyBSdW5uaW5nIFZpc3VhbGl6ZXJzXHJcbiAqXHJcbiAqIFRoZSBgcnVuVmlzdWFsaXplcmAgZnVuY3Rpb24gaXMgZXhwb3J0ZWQgYXMgYSBwcm9wZXJ0eSBvZiB0aGUgYHdpbmRvd2BcclxuICogb2JqZWN0LiBJdCBydW5zIHRoZSBuYW1lZCB2aXN1YWxpemVyIHdpdGggdGhlIGdpdmVuIHBhcmFtZXRlcnMuIExpVFNjcmlwdFxyXG4gKiBnZW5lcmF0ZXMgY29kZSB0aGF0IGNhbGxzIHRoaXMgZnVuY3Rpb24gZnJvbSBhIEhUTUwgcGFnZS5cclxuICovXHJcbmZ1bmN0aW9uIHJ1blZpc3VhbGl6ZXIobmFtZSwgcGFyYW1zLCBwYXJlbnRJZCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBsZXQgcGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyZW50SWQpO1xyXG4gICAgICAgIGlmICghcGFyZW50KVxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgVmlzdWFsaXplciBwYXJlbnQgaWQgXCIke3BhcmVudElkfVwiIG5vdCBmb3VuZC5gKTtcclxuICAgICAgICBsZXQgdmlzdWFsaXplID0gdmlzdWFsaXplcnNbbmFtZV0gfHxcclxuICAgICAgICAgICAgZXJyb3IoYFZpc3VhbGl6ZXIgXCIke25hbWV9XCIgaXMgbm90IHJlZ2lzdGVyZWQuYCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgeWllbGQgdmlzdWFsaXplKHBhcmFtcywgcGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgZXJyb3IoYEV4Y2VwdGlvbiB0aHJvd24gYnkgdmlzdWFsaXplciBcIiR7bmFtZX1cIi48QlIvPlxyXG4gICAgICAgICR7ZS50b1N0cmluZygpfWApKFwiXCIsIHBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxyXG4gICAgd2luZG93W1wicnVuVmlzdWFsaXplclwiXSA9IHJ1blZpc3VhbGl6ZXI7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZpc3VhbGl6ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBDdXN0b21JbWFnZShwYXJhbXMsIHBhcmVudCkge1xuICAgIC8vIGNvbnNvbGUubG9nKHBhcmFtcy5zcGxpdChcIiBcIikpO1xuICAgIGNvbnN0IFtuYW1lLCBsaW5rXSA9IHBhcmFtcy5zcGxpdChcIiBcIik7XG4gICAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIik7XG4gICAgLy9cbiAgICBpbWFnZS5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxhICR7bGluayA/IGBocmVmPSR7bGlua31gIDogXCJcIn0+XG4gICAgICAgICAgPGltZyBzcmM9XCIuLi8uLi8uLi9pbWFnZXMvJHtuYW1lfVwiIHN0eWxlPVwiZmxvYXQ6bm9uZTtkaXNwbGF5OmJsb2NrO21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG87Ym94LXNoYWRvdzpub25lXCIvPlxuICAgICAgICA8L2E+XG4gICAgICBgO1xuICAgIHBhcmVudC5hcHBlbmQoaW1hZ2UpO1xufVxuZXhwb3J0cy5DdXN0b21JbWFnZSA9IEN1c3RvbUltYWdlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBzb21ldGltZXMgY29tbWVudCBkb2Vzbid0IHdvcmssIGZpeCBpdCB1c2luZyB0aGlzIHZpc3VhbGl6ZXJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIEZpeFRleHQocGFyYW1zLCBwYXJlbnQpIHtcbiAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgcC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxwPlxuICAgICAgICAgICR7cGFyYW1zfVxuICAgICAgICA8L3A+XG4gICAgICBgO1xuICAgIHBhcmVudC5hcHBlbmQocCk7XG59XG5leHBvcnRzLkZpeFRleHQgPSBGaXhUZXh0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBJbGx1c3RyYXRlKHBhcmFtcywgcGFyZW50KSB7XG4gICAgLy8gY29uc29sZS5sb2cocGFyYW1zLnNwbGl0KFwiIFwiKSk7XG4gICAgY29uc3QgW25hbWUsIHdpZHRoLCBoZWlnaHQsIGlzU2VjdGlvbiA9IFwidHJ1ZVwiXSA9IHBhcmFtcy5zcGxpdChcIiBcIik7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCB1cmwgPSBuYW1lID09PSBcInNwaGVyZS1vY2VhblwiID8gYC4vaWxsdXN0cmF0aW9ucy8ke25hbWV9L2luZGV4Lmh0bWxgIDogYCR7aXNTZWN0aW9uID09PSBcInRydWVcIiA/IFwiLi4vLi4vLi4vXCIgOiBcIi4uLy4uL1wifWlsbHVzdHJhdGlvbnMvJHtuYW1lfS9pbmRleC5odG1sYDtcbiAgICBjb25zdCBzdHlsZSA9IGBcIlxuICAgICAgICBib3JkZXItc3R5bGU6IG5vbmU7XG4gICAgICAgIHdpZHRoOiAke3dpZHRofTtcbiAgICAgICAgaGVpZ2h0OiAke2hlaWdodH07XG4gICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIFwiYDtcbiAgICAvL1xuICAgIGRpdi5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxpZnJhbWUgc3JjPSR7dXJsfSBzdHlsZT0ke3N0eWxlfT48L2lmcmFtZT5cbiAgICBgO1xuICAgIHBhcmVudC5hcHBlbmQoZGl2KTtcbn1cbmV4cG9ydHMuSWxsdXN0cmF0ZSA9IElsbHVzdHJhdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHZpc3VhbGl6ZXJfMSA9IHJlcXVpcmUoXCJsaXRzY3JpcHQvbGliL3Zpc3VhbGl6ZXJcIik7XG5jb25zdCBpbGx1c3RyYXRvcl8xID0gcmVxdWlyZShcIi4vaWxsdXN0cmF0b3JcIik7XG5jb25zdCBjdXN0b21faW1hZ2VfMSA9IHJlcXVpcmUoXCIuL2N1c3RvbS1pbWFnZVwiKTtcbmNvbnN0IGZpeF90ZXh0XzEgPSByZXF1aXJlKFwiLi9maXgtdGV4dFwiKTtcbnZpc3VhbGl6ZXJfMS5yZWdpc3RlclZpc3VhbGl6ZXIoXCJpbGx1c3RyYXRvclwiLCBpbGx1c3RyYXRvcl8xLklsbHVzdHJhdGUpO1xudmlzdWFsaXplcl8xLnJlZ2lzdGVyVmlzdWFsaXplcihcImN1c3RvbS1pbWFnZVwiLCBjdXN0b21faW1hZ2VfMS5DdXN0b21JbWFnZSk7XG52aXN1YWxpemVyXzEucmVnaXN0ZXJWaXN1YWxpemVyKFwiZml4LXRleHRcIiwgZml4X3RleHRfMS5GaXhUZXh0KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=