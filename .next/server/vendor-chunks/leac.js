"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/leac";
exports.ids = ["vendor-chunks/leac"];
exports.modules = {

/***/ "(rsc)/./node_modules/leac/lib/leac.mjs":
/*!****************************************!*\
  !*** ./node_modules/leac/lib/leac.mjs ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createLexer: () => (/* binding */ o)\n/* harmony export */ });\nconst e=/\\n/g;function n(n){const o=[...n.matchAll(e)].map((e=>e.index||0));o.unshift(-1);const s=t(o,0,o.length);return e=>r(s,e)}function t(e,n,r){if(r-n==1)return{offset:e[n],index:n+1};const o=Math.ceil((n+r)/2),s=t(e,n,o),l=t(e,o,r);return{offset:s.offset,low:s,high:l}}function r(e,n){return function(e){return Object.prototype.hasOwnProperty.call(e,\"index\")}(e)?{line:e.index,column:n-e.offset}:r(e.high.offset<n?e.high:e.low,n)}function o(e,t=\"\",r={}){const o=\"string\"!=typeof t?t:r,l=\"string\"==typeof t?t:\"\",c=e.map(s),f=!!o.lineNumbers;return function(e,t=0){const r=f?n(e):()=>({line:0,column:0});let o=t;const s=[];e:for(;o<e.length;){let n=!1;for(const t of c){t.regex.lastIndex=o;const c=t.regex.exec(e);if(c&&c[0].length>0){if(!t.discard){const e=r(o),n=\"string\"==typeof t.replace?c[0].replace(new RegExp(t.regex.source,t.regex.flags),t.replace):c[0];s.push({state:l,name:t.name,text:n,offset:o,len:c[0].length,line:e.line,column:e.column})}if(o=t.regex.lastIndex,n=!0,t.push){const n=t.push(e,o);s.push(...n.tokens),o=n.offset}if(t.pop)break e;break}}if(!n)break}return{tokens:s,offset:o,complete:e.length<=o}}}function s(e,n){return{...e,regex:l(e,n)}}function l(e,n){if(0===e.name.length)throw new Error(`Rule #${n} has empty name, which is not allowed.`);if(function(e){return Object.prototype.hasOwnProperty.call(e,\"regex\")}(e))return function(e){if(e.global)throw new Error(`Regular expression /${e.source}/${e.flags} contains the global flag, which is not allowed.`);return e.sticky?e:new RegExp(e.source,e.flags+\"y\")}(e.regex);if(function(e){return Object.prototype.hasOwnProperty.call(e,\"str\")}(e)){if(0===e.str.length)throw new Error(`Rule #${n} (\"${e.name}\") has empty \"str\" property, which is not allowed.`);return new RegExp(c(e.str),\"y\")}return new RegExp(c(e.name),\"y\")}function c(e){return e.replace(/[-[\\]{}()*+!<=:?./\\\\^$|#\\s,]/g,\"\\\\$&\")}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbGVhYy9saWIvbGVhYy5tanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBLGNBQWMsY0FBYyxnREFBZ0QsY0FBYyx3QkFBd0IsaUJBQWlCLGtCQUFrQixpQkFBaUIsdUJBQXVCLGlEQUFpRCxPQUFPLDhCQUE4QixnQkFBZ0IsbUJBQW1CLHVEQUF1RCxLQUFLLCtCQUErQixtQ0FBbUMsc0JBQXNCLEVBQUUsc0ZBQXNGLHVCQUF1QixxQkFBcUIsZ0JBQWdCLEVBQUUsUUFBUSxXQUFXLE9BQU8sV0FBVyxFQUFFLFNBQVMsa0JBQWtCLG9CQUFvQix3QkFBd0IscUJBQXFCLGVBQWUsZ0hBQWdILFFBQVEsZ0ZBQWdGLEVBQUUsb0NBQW9DLG9CQUFvQiwrQkFBK0IsaUJBQWlCLE9BQU8sWUFBWSxPQUFPLHlDQUF5QyxnQkFBZ0IsT0FBTyxtQkFBbUIsZ0JBQWdCLDhDQUE4QyxHQUFHLHdDQUF3QyxlQUFlLHVEQUF1RCx1QkFBdUIsbURBQW1ELFNBQVMsR0FBRyxTQUFTLGtEQUFrRCxtREFBbUQsVUFBVSxlQUFlLHFEQUFxRCxLQUFLLDZDQUE2QyxHQUFHLElBQUksT0FBTyxxREFBcUQsZ0NBQWdDLGlDQUFpQyxjQUFjLHlCQUF5QixnQ0FBeUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZWN0LW5leHQxMy8uL25vZGVfbW9kdWxlcy9sZWFjL2xpYi9sZWFjLm1qcz9mZWFhIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGU9L1xcbi9nO2Z1bmN0aW9uIG4obil7Y29uc3Qgbz1bLi4ubi5tYXRjaEFsbChlKV0ubWFwKChlPT5lLmluZGV4fHwwKSk7by51bnNoaWZ0KC0xKTtjb25zdCBzPXQobywwLG8ubGVuZ3RoKTtyZXR1cm4gZT0+cihzLGUpfWZ1bmN0aW9uIHQoZSxuLHIpe2lmKHItbj09MSlyZXR1cm57b2Zmc2V0OmVbbl0saW5kZXg6bisxfTtjb25zdCBvPU1hdGguY2VpbCgobityKS8yKSxzPXQoZSxuLG8pLGw9dChlLG8scik7cmV0dXJue29mZnNldDpzLm9mZnNldCxsb3c6cyxoaWdoOmx9fWZ1bmN0aW9uIHIoZSxuKXtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLFwiaW5kZXhcIil9KGUpP3tsaW5lOmUuaW5kZXgsY29sdW1uOm4tZS5vZmZzZXR9OnIoZS5oaWdoLm9mZnNldDxuP2UuaGlnaDplLmxvdyxuKX1mdW5jdGlvbiBvKGUsdD1cIlwiLHI9e30pe2NvbnN0IG89XCJzdHJpbmdcIiE9dHlwZW9mIHQ/dDpyLGw9XCJzdHJpbmdcIj09dHlwZW9mIHQ/dDpcIlwiLGM9ZS5tYXAocyksZj0hIW8ubGluZU51bWJlcnM7cmV0dXJuIGZ1bmN0aW9uKGUsdD0wKXtjb25zdCByPWY/bihlKTooKT0+KHtsaW5lOjAsY29sdW1uOjB9KTtsZXQgbz10O2NvbnN0IHM9W107ZTpmb3IoO288ZS5sZW5ndGg7KXtsZXQgbj0hMTtmb3IoY29uc3QgdCBvZiBjKXt0LnJlZ2V4Lmxhc3RJbmRleD1vO2NvbnN0IGM9dC5yZWdleC5leGVjKGUpO2lmKGMmJmNbMF0ubGVuZ3RoPjApe2lmKCF0LmRpc2NhcmQpe2NvbnN0IGU9cihvKSxuPVwic3RyaW5nXCI9PXR5cGVvZiB0LnJlcGxhY2U/Y1swXS5yZXBsYWNlKG5ldyBSZWdFeHAodC5yZWdleC5zb3VyY2UsdC5yZWdleC5mbGFncyksdC5yZXBsYWNlKTpjWzBdO3MucHVzaCh7c3RhdGU6bCxuYW1lOnQubmFtZSx0ZXh0Om4sb2Zmc2V0Om8sbGVuOmNbMF0ubGVuZ3RoLGxpbmU6ZS5saW5lLGNvbHVtbjplLmNvbHVtbn0pfWlmKG89dC5yZWdleC5sYXN0SW5kZXgsbj0hMCx0LnB1c2gpe2NvbnN0IG49dC5wdXNoKGUsbyk7cy5wdXNoKC4uLm4udG9rZW5zKSxvPW4ub2Zmc2V0fWlmKHQucG9wKWJyZWFrIGU7YnJlYWt9fWlmKCFuKWJyZWFrfXJldHVybnt0b2tlbnM6cyxvZmZzZXQ6byxjb21wbGV0ZTplLmxlbmd0aDw9b319fWZ1bmN0aW9uIHMoZSxuKXtyZXR1cm57Li4uZSxyZWdleDpsKGUsbil9fWZ1bmN0aW9uIGwoZSxuKXtpZigwPT09ZS5uYW1lLmxlbmd0aCl0aHJvdyBuZXcgRXJyb3IoYFJ1bGUgIyR7bn0gaGFzIGVtcHR5IG5hbWUsIHdoaWNoIGlzIG5vdCBhbGxvd2VkLmApO2lmKGZ1bmN0aW9uKGUpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxcInJlZ2V4XCIpfShlKSlyZXR1cm4gZnVuY3Rpb24oZSl7aWYoZS5nbG9iYWwpdGhyb3cgbmV3IEVycm9yKGBSZWd1bGFyIGV4cHJlc3Npb24gLyR7ZS5zb3VyY2V9LyR7ZS5mbGFnc30gY29udGFpbnMgdGhlIGdsb2JhbCBmbGFnLCB3aGljaCBpcyBub3QgYWxsb3dlZC5gKTtyZXR1cm4gZS5zdGlja3k/ZTpuZXcgUmVnRXhwKGUuc291cmNlLGUuZmxhZ3MrXCJ5XCIpfShlLnJlZ2V4KTtpZihmdW5jdGlvbihlKXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsXCJzdHJcIil9KGUpKXtpZigwPT09ZS5zdHIubGVuZ3RoKXRocm93IG5ldyBFcnJvcihgUnVsZSAjJHtufSAoXCIke2UubmFtZX1cIikgaGFzIGVtcHR5IFwic3RyXCIgcHJvcGVydHksIHdoaWNoIGlzIG5vdCBhbGxvd2VkLmApO3JldHVybiBuZXcgUmVnRXhwKGMoZS5zdHIpLFwieVwiKX1yZXR1cm4gbmV3IFJlZ0V4cChjKGUubmFtZSksXCJ5XCIpfWZ1bmN0aW9uIGMoZSl7cmV0dXJuIGUucmVwbGFjZSgvWy1bXFxde30oKSorITw9Oj8uL1xcXFxeJHwjXFxzLF0vZyxcIlxcXFwkJlwiKX1leHBvcnR7byBhcyBjcmVhdGVMZXhlcn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/leac/lib/leac.mjs\n");

/***/ })

};
;