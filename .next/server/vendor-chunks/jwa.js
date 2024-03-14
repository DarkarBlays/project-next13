/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/jwa";
exports.ids = ["vendor-chunks/jwa"];
exports.modules = {

/***/ "(rsc)/./node_modules/jwa/index.js":
/*!***********************************!*\
  !*** ./node_modules/jwa/index.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var bufferEqual = __webpack_require__(/*! buffer-equal-constant-time */ \"(rsc)/./node_modules/buffer-equal-constant-time/index.js\");\nvar Buffer = (__webpack_require__(/*! safe-buffer */ \"(rsc)/./node_modules/safe-buffer/index.js\").Buffer);\nvar crypto = __webpack_require__(/*! crypto */ \"crypto\");\nvar formatEcdsa = __webpack_require__(/*! ecdsa-sig-formatter */ \"(rsc)/./node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js\");\nvar util = __webpack_require__(/*! util */ \"util\");\n\nvar MSG_INVALID_ALGORITHM = '\"%s\" is not a valid algorithm.\\n  Supported algorithms are:\\n  \"HS256\", \"HS384\", \"HS512\", \"RS256\", \"RS384\", \"RS512\", \"PS256\", \"PS384\", \"PS512\", \"ES256\", \"ES384\", \"ES512\" and \"none\".'\nvar MSG_INVALID_SECRET = 'secret must be a string or buffer';\nvar MSG_INVALID_VERIFIER_KEY = 'key must be a string or a buffer';\nvar MSG_INVALID_SIGNER_KEY = 'key must be a string, a buffer or an object';\n\nvar supportsKeyObjects = typeof crypto.createPublicKey === 'function';\nif (supportsKeyObjects) {\n  MSG_INVALID_VERIFIER_KEY += ' or a KeyObject';\n  MSG_INVALID_SECRET += 'or a KeyObject';\n}\n\nfunction checkIsPublicKey(key) {\n  if (Buffer.isBuffer(key)) {\n    return;\n  }\n\n  if (typeof key === 'string') {\n    return;\n  }\n\n  if (!supportsKeyObjects) {\n    throw typeError(MSG_INVALID_VERIFIER_KEY);\n  }\n\n  if (typeof key !== 'object') {\n    throw typeError(MSG_INVALID_VERIFIER_KEY);\n  }\n\n  if (typeof key.type !== 'string') {\n    throw typeError(MSG_INVALID_VERIFIER_KEY);\n  }\n\n  if (typeof key.asymmetricKeyType !== 'string') {\n    throw typeError(MSG_INVALID_VERIFIER_KEY);\n  }\n\n  if (typeof key.export !== 'function') {\n    throw typeError(MSG_INVALID_VERIFIER_KEY);\n  }\n};\n\nfunction checkIsPrivateKey(key) {\n  if (Buffer.isBuffer(key)) {\n    return;\n  }\n\n  if (typeof key === 'string') {\n    return;\n  }\n\n  if (typeof key === 'object') {\n    return;\n  }\n\n  throw typeError(MSG_INVALID_SIGNER_KEY);\n};\n\nfunction checkIsSecretKey(key) {\n  if (Buffer.isBuffer(key)) {\n    return;\n  }\n\n  if (typeof key === 'string') {\n    return key;\n  }\n\n  if (!supportsKeyObjects) {\n    throw typeError(MSG_INVALID_SECRET);\n  }\n\n  if (typeof key !== 'object') {\n    throw typeError(MSG_INVALID_SECRET);\n  }\n\n  if (key.type !== 'secret') {\n    throw typeError(MSG_INVALID_SECRET);\n  }\n\n  if (typeof key.export !== 'function') {\n    throw typeError(MSG_INVALID_SECRET);\n  }\n}\n\nfunction fromBase64(base64) {\n  return base64\n    .replace(/=/g, '')\n    .replace(/\\+/g, '-')\n    .replace(/\\//g, '_');\n}\n\nfunction toBase64(base64url) {\n  base64url = base64url.toString();\n\n  var padding = 4 - base64url.length % 4;\n  if (padding !== 4) {\n    for (var i = 0; i < padding; ++i) {\n      base64url += '=';\n    }\n  }\n\n  return base64url\n    .replace(/\\-/g, '+')\n    .replace(/_/g, '/');\n}\n\nfunction typeError(template) {\n  var args = [].slice.call(arguments, 1);\n  var errMsg = util.format.bind(util, template).apply(null, args);\n  return new TypeError(errMsg);\n}\n\nfunction bufferOrString(obj) {\n  return Buffer.isBuffer(obj) || typeof obj === 'string';\n}\n\nfunction normalizeInput(thing) {\n  if (!bufferOrString(thing))\n    thing = JSON.stringify(thing);\n  return thing;\n}\n\nfunction createHmacSigner(bits) {\n  return function sign(thing, secret) {\n    checkIsSecretKey(secret);\n    thing = normalizeInput(thing);\n    var hmac = crypto.createHmac('sha' + bits, secret);\n    var sig = (hmac.update(thing), hmac.digest('base64'))\n    return fromBase64(sig);\n  }\n}\n\nfunction createHmacVerifier(bits) {\n  return function verify(thing, signature, secret) {\n    var computedSig = createHmacSigner(bits)(thing, secret);\n    return bufferEqual(Buffer.from(signature), Buffer.from(computedSig));\n  }\n}\n\nfunction createKeySigner(bits) {\n return function sign(thing, privateKey) {\n    checkIsPrivateKey(privateKey);\n    thing = normalizeInput(thing);\n    // Even though we are specifying \"RSA\" here, this works with ECDSA\n    // keys as well.\n    var signer = crypto.createSign('RSA-SHA' + bits);\n    var sig = (signer.update(thing), signer.sign(privateKey, 'base64'));\n    return fromBase64(sig);\n  }\n}\n\nfunction createKeyVerifier(bits) {\n  return function verify(thing, signature, publicKey) {\n    checkIsPublicKey(publicKey);\n    thing = normalizeInput(thing);\n    signature = toBase64(signature);\n    var verifier = crypto.createVerify('RSA-SHA' + bits);\n    verifier.update(thing);\n    return verifier.verify(publicKey, signature, 'base64');\n  }\n}\n\nfunction createPSSKeySigner(bits) {\n  return function sign(thing, privateKey) {\n    checkIsPrivateKey(privateKey);\n    thing = normalizeInput(thing);\n    var signer = crypto.createSign('RSA-SHA' + bits);\n    var sig = (signer.update(thing), signer.sign({\n      key: privateKey,\n      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,\n      saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST\n    }, 'base64'));\n    return fromBase64(sig);\n  }\n}\n\nfunction createPSSKeyVerifier(bits) {\n  return function verify(thing, signature, publicKey) {\n    checkIsPublicKey(publicKey);\n    thing = normalizeInput(thing);\n    signature = toBase64(signature);\n    var verifier = crypto.createVerify('RSA-SHA' + bits);\n    verifier.update(thing);\n    return verifier.verify({\n      key: publicKey,\n      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,\n      saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST\n    }, signature, 'base64');\n  }\n}\n\nfunction createECDSASigner(bits) {\n  var inner = createKeySigner(bits);\n  return function sign() {\n    var signature = inner.apply(null, arguments);\n    signature = formatEcdsa.derToJose(signature, 'ES' + bits);\n    return signature;\n  };\n}\n\nfunction createECDSAVerifer(bits) {\n  var inner = createKeyVerifier(bits);\n  return function verify(thing, signature, publicKey) {\n    signature = formatEcdsa.joseToDer(signature, 'ES' + bits).toString('base64');\n    var result = inner(thing, signature, publicKey);\n    return result;\n  };\n}\n\nfunction createNoneSigner() {\n  return function sign() {\n    return '';\n  }\n}\n\nfunction createNoneVerifier() {\n  return function verify(thing, signature) {\n    return signature === '';\n  }\n}\n\nmodule.exports = function jwa(algorithm) {\n  var signerFactories = {\n    hs: createHmacSigner,\n    rs: createKeySigner,\n    ps: createPSSKeySigner,\n    es: createECDSASigner,\n    none: createNoneSigner,\n  }\n  var verifierFactories = {\n    hs: createHmacVerifier,\n    rs: createKeyVerifier,\n    ps: createPSSKeyVerifier,\n    es: createECDSAVerifer,\n    none: createNoneVerifier,\n  }\n  var match = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);\n  if (!match)\n    throw typeError(MSG_INVALID_ALGORITHM, algorithm);\n  var algo = (match[1] || match[3]).toLowerCase();\n  var bits = match[2];\n\n  return {\n    sign: signerFactories[algo](bits),\n    verify: verifierFactories[algo](bits),\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvandhL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBLGtCQUFrQixtQkFBTyxDQUFDLDRGQUE0QjtBQUN0RCxhQUFhLDRGQUE2QjtBQUMxQyxhQUFhLG1CQUFPLENBQUMsc0JBQVE7QUFDN0Isa0JBQWtCLG1CQUFPLENBQUMsZ0dBQXFCO0FBQy9DLFdBQVcsbUJBQU8sQ0FBQyxrQkFBTTs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QtbmV4dDEzLy4vbm9kZV9tb2R1bGVzL2p3YS9pbmRleC5qcz83ZDZmIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBidWZmZXJFcXVhbCA9IHJlcXVpcmUoJ2J1ZmZlci1lcXVhbC1jb25zdGFudC10aW1lJyk7XG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXI7XG52YXIgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG52YXIgZm9ybWF0RWNkc2EgPSByZXF1aXJlKCdlY2RzYS1zaWctZm9ybWF0dGVyJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxudmFyIE1TR19JTlZBTElEX0FMR09SSVRITSA9ICdcIiVzXCIgaXMgbm90IGEgdmFsaWQgYWxnb3JpdGhtLlxcbiAgU3VwcG9ydGVkIGFsZ29yaXRobXMgYXJlOlxcbiAgXCJIUzI1NlwiLCBcIkhTMzg0XCIsIFwiSFM1MTJcIiwgXCJSUzI1NlwiLCBcIlJTMzg0XCIsIFwiUlM1MTJcIiwgXCJQUzI1NlwiLCBcIlBTMzg0XCIsIFwiUFM1MTJcIiwgXCJFUzI1NlwiLCBcIkVTMzg0XCIsIFwiRVM1MTJcIiBhbmQgXCJub25lXCIuJ1xudmFyIE1TR19JTlZBTElEX1NFQ1JFVCA9ICdzZWNyZXQgbXVzdCBiZSBhIHN0cmluZyBvciBidWZmZXInO1xudmFyIE1TR19JTlZBTElEX1ZFUklGSUVSX0tFWSA9ICdrZXkgbXVzdCBiZSBhIHN0cmluZyBvciBhIGJ1ZmZlcic7XG52YXIgTVNHX0lOVkFMSURfU0lHTkVSX0tFWSA9ICdrZXkgbXVzdCBiZSBhIHN0cmluZywgYSBidWZmZXIgb3IgYW4gb2JqZWN0JztcblxudmFyIHN1cHBvcnRzS2V5T2JqZWN0cyA9IHR5cGVvZiBjcnlwdG8uY3JlYXRlUHVibGljS2V5ID09PSAnZnVuY3Rpb24nO1xuaWYgKHN1cHBvcnRzS2V5T2JqZWN0cykge1xuICBNU0dfSU5WQUxJRF9WRVJJRklFUl9LRVkgKz0gJyBvciBhIEtleU9iamVjdCc7XG4gIE1TR19JTlZBTElEX1NFQ1JFVCArPSAnb3IgYSBLZXlPYmplY3QnO1xufVxuXG5mdW5jdGlvbiBjaGVja0lzUHVibGljS2V5KGtleSkge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKGtleSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIXN1cHBvcnRzS2V5T2JqZWN0cykge1xuICAgIHRocm93IHR5cGVFcnJvcihNU0dfSU5WQUxJRF9WRVJJRklFUl9LRVkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBrZXkgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgdHlwZUVycm9yKE1TR19JTlZBTElEX1ZFUklGSUVSX0tFWSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGtleS50eXBlICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IHR5cGVFcnJvcihNU0dfSU5WQUxJRF9WRVJJRklFUl9LRVkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBrZXkuYXN5bW1ldHJpY0tleVR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgdHlwZUVycm9yKE1TR19JTlZBTElEX1ZFUklGSUVSX0tFWSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGtleS5leHBvcnQgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyB0eXBlRXJyb3IoTVNHX0lOVkFMSURfVkVSSUZJRVJfS0VZKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gY2hlY2tJc1ByaXZhdGVLZXkoa2V5KSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoa2V5KSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRocm93IHR5cGVFcnJvcihNU0dfSU5WQUxJRF9TSUdORVJfS0VZKTtcbn07XG5cbmZ1bmN0aW9uIGNoZWNrSXNTZWNyZXRLZXkoa2V5KSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoa2V5KSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBrZXk7XG4gIH1cblxuICBpZiAoIXN1cHBvcnRzS2V5T2JqZWN0cykge1xuICAgIHRocm93IHR5cGVFcnJvcihNU0dfSU5WQUxJRF9TRUNSRVQpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBrZXkgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgdHlwZUVycm9yKE1TR19JTlZBTElEX1NFQ1JFVCk7XG4gIH1cblxuICBpZiAoa2V5LnR5cGUgIT09ICdzZWNyZXQnKSB7XG4gICAgdGhyb3cgdHlwZUVycm9yKE1TR19JTlZBTElEX1NFQ1JFVCk7XG4gIH1cblxuICBpZiAodHlwZW9mIGtleS5leHBvcnQgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyB0eXBlRXJyb3IoTVNHX0lOVkFMSURfU0VDUkVUKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmcm9tQmFzZTY0KGJhc2U2NCkge1xuICByZXR1cm4gYmFzZTY0XG4gICAgLnJlcGxhY2UoLz0vZywgJycpXG4gICAgLnJlcGxhY2UoL1xcKy9nLCAnLScpXG4gICAgLnJlcGxhY2UoL1xcLy9nLCAnXycpO1xufVxuXG5mdW5jdGlvbiB0b0Jhc2U2NChiYXNlNjR1cmwpIHtcbiAgYmFzZTY0dXJsID0gYmFzZTY0dXJsLnRvU3RyaW5nKCk7XG5cbiAgdmFyIHBhZGRpbmcgPSA0IC0gYmFzZTY0dXJsLmxlbmd0aCAlIDQ7XG4gIGlmIChwYWRkaW5nICE9PSA0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWRkaW5nOyArK2kpIHtcbiAgICAgIGJhc2U2NHVybCArPSAnPSc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJhc2U2NHVybFxuICAgIC5yZXBsYWNlKC9cXC0vZywgJysnKVxuICAgIC5yZXBsYWNlKC9fL2csICcvJyk7XG59XG5cbmZ1bmN0aW9uIHR5cGVFcnJvcih0ZW1wbGF0ZSkge1xuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgdmFyIGVyck1zZyA9IHV0aWwuZm9ybWF0LmJpbmQodXRpbCwgdGVtcGxhdGUpLmFwcGx5KG51bGwsIGFyZ3MpO1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcihlcnJNc2cpO1xufVxuXG5mdW5jdGlvbiBidWZmZXJPclN0cmluZyhvYmopIHtcbiAgcmV0dXJuIEJ1ZmZlci5pc0J1ZmZlcihvYmopIHx8IHR5cGVvZiBvYmogPT09ICdzdHJpbmcnO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVJbnB1dCh0aGluZykge1xuICBpZiAoIWJ1ZmZlck9yU3RyaW5nKHRoaW5nKSlcbiAgICB0aGluZyA9IEpTT04uc3RyaW5naWZ5KHRoaW5nKTtcbiAgcmV0dXJuIHRoaW5nO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIbWFjU2lnbmVyKGJpdHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNpZ24odGhpbmcsIHNlY3JldCkge1xuICAgIGNoZWNrSXNTZWNyZXRLZXkoc2VjcmV0KTtcbiAgICB0aGluZyA9IG5vcm1hbGl6ZUlucHV0KHRoaW5nKTtcbiAgICB2YXIgaG1hYyA9IGNyeXB0by5jcmVhdGVIbWFjKCdzaGEnICsgYml0cywgc2VjcmV0KTtcbiAgICB2YXIgc2lnID0gKGhtYWMudXBkYXRlKHRoaW5nKSwgaG1hYy5kaWdlc3QoJ2Jhc2U2NCcpKVxuICAgIHJldHVybiBmcm9tQmFzZTY0KHNpZyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlSG1hY1ZlcmlmaWVyKGJpdHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHZlcmlmeSh0aGluZywgc2lnbmF0dXJlLCBzZWNyZXQpIHtcbiAgICB2YXIgY29tcHV0ZWRTaWcgPSBjcmVhdGVIbWFjU2lnbmVyKGJpdHMpKHRoaW5nLCBzZWNyZXQpO1xuICAgIHJldHVybiBidWZmZXJFcXVhbChCdWZmZXIuZnJvbShzaWduYXR1cmUpLCBCdWZmZXIuZnJvbShjb21wdXRlZFNpZykpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUtleVNpZ25lcihiaXRzKSB7XG4gcmV0dXJuIGZ1bmN0aW9uIHNpZ24odGhpbmcsIHByaXZhdGVLZXkpIHtcbiAgICBjaGVja0lzUHJpdmF0ZUtleShwcml2YXRlS2V5KTtcbiAgICB0aGluZyA9IG5vcm1hbGl6ZUlucHV0KHRoaW5nKTtcbiAgICAvLyBFdmVuIHRob3VnaCB3ZSBhcmUgc3BlY2lmeWluZyBcIlJTQVwiIGhlcmUsIHRoaXMgd29ya3Mgd2l0aCBFQ0RTQVxuICAgIC8vIGtleXMgYXMgd2VsbC5cbiAgICB2YXIgc2lnbmVyID0gY3J5cHRvLmNyZWF0ZVNpZ24oJ1JTQS1TSEEnICsgYml0cyk7XG4gICAgdmFyIHNpZyA9IChzaWduZXIudXBkYXRlKHRoaW5nKSwgc2lnbmVyLnNpZ24ocHJpdmF0ZUtleSwgJ2Jhc2U2NCcpKTtcbiAgICByZXR1cm4gZnJvbUJhc2U2NChzaWcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUtleVZlcmlmaWVyKGJpdHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHZlcmlmeSh0aGluZywgc2lnbmF0dXJlLCBwdWJsaWNLZXkpIHtcbiAgICBjaGVja0lzUHVibGljS2V5KHB1YmxpY0tleSk7XG4gICAgdGhpbmcgPSBub3JtYWxpemVJbnB1dCh0aGluZyk7XG4gICAgc2lnbmF0dXJlID0gdG9CYXNlNjQoc2lnbmF0dXJlKTtcbiAgICB2YXIgdmVyaWZpZXIgPSBjcnlwdG8uY3JlYXRlVmVyaWZ5KCdSU0EtU0hBJyArIGJpdHMpO1xuICAgIHZlcmlmaWVyLnVwZGF0ZSh0aGluZyk7XG4gICAgcmV0dXJuIHZlcmlmaWVyLnZlcmlmeShwdWJsaWNLZXksIHNpZ25hdHVyZSwgJ2Jhc2U2NCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBTU0tleVNpZ25lcihiaXRzKSB7XG4gIHJldHVybiBmdW5jdGlvbiBzaWduKHRoaW5nLCBwcml2YXRlS2V5KSB7XG4gICAgY2hlY2tJc1ByaXZhdGVLZXkocHJpdmF0ZUtleSk7XG4gICAgdGhpbmcgPSBub3JtYWxpemVJbnB1dCh0aGluZyk7XG4gICAgdmFyIHNpZ25lciA9IGNyeXB0by5jcmVhdGVTaWduKCdSU0EtU0hBJyArIGJpdHMpO1xuICAgIHZhciBzaWcgPSAoc2lnbmVyLnVwZGF0ZSh0aGluZyksIHNpZ25lci5zaWduKHtcbiAgICAgIGtleTogcHJpdmF0ZUtleSxcbiAgICAgIHBhZGRpbmc6IGNyeXB0by5jb25zdGFudHMuUlNBX1BLQ1MxX1BTU19QQURESU5HLFxuICAgICAgc2FsdExlbmd0aDogY3J5cHRvLmNvbnN0YW50cy5SU0FfUFNTX1NBTFRMRU5fRElHRVNUXG4gICAgfSwgJ2Jhc2U2NCcpKTtcbiAgICByZXR1cm4gZnJvbUJhc2U2NChzaWcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBTU0tleVZlcmlmaWVyKGJpdHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHZlcmlmeSh0aGluZywgc2lnbmF0dXJlLCBwdWJsaWNLZXkpIHtcbiAgICBjaGVja0lzUHVibGljS2V5KHB1YmxpY0tleSk7XG4gICAgdGhpbmcgPSBub3JtYWxpemVJbnB1dCh0aGluZyk7XG4gICAgc2lnbmF0dXJlID0gdG9CYXNlNjQoc2lnbmF0dXJlKTtcbiAgICB2YXIgdmVyaWZpZXIgPSBjcnlwdG8uY3JlYXRlVmVyaWZ5KCdSU0EtU0hBJyArIGJpdHMpO1xuICAgIHZlcmlmaWVyLnVwZGF0ZSh0aGluZyk7XG4gICAgcmV0dXJuIHZlcmlmaWVyLnZlcmlmeSh7XG4gICAgICBrZXk6IHB1YmxpY0tleSxcbiAgICAgIHBhZGRpbmc6IGNyeXB0by5jb25zdGFudHMuUlNBX1BLQ1MxX1BTU19QQURESU5HLFxuICAgICAgc2FsdExlbmd0aDogY3J5cHRvLmNvbnN0YW50cy5SU0FfUFNTX1NBTFRMRU5fRElHRVNUXG4gICAgfSwgc2lnbmF0dXJlLCAnYmFzZTY0Jyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRUNEU0FTaWduZXIoYml0cykge1xuICB2YXIgaW5uZXIgPSBjcmVhdGVLZXlTaWduZXIoYml0cyk7XG4gIHJldHVybiBmdW5jdGlvbiBzaWduKCkge1xuICAgIHZhciBzaWduYXR1cmUgPSBpbm5lci5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIHNpZ25hdHVyZSA9IGZvcm1hdEVjZHNhLmRlclRvSm9zZShzaWduYXR1cmUsICdFUycgKyBiaXRzKTtcbiAgICByZXR1cm4gc2lnbmF0dXJlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFQ0RTQVZlcmlmZXIoYml0cykge1xuICB2YXIgaW5uZXIgPSBjcmVhdGVLZXlWZXJpZmllcihiaXRzKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHZlcmlmeSh0aGluZywgc2lnbmF0dXJlLCBwdWJsaWNLZXkpIHtcbiAgICBzaWduYXR1cmUgPSBmb3JtYXRFY2RzYS5qb3NlVG9EZXIoc2lnbmF0dXJlLCAnRVMnICsgYml0cykudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICAgIHZhciByZXN1bHQgPSBpbm5lcih0aGluZywgc2lnbmF0dXJlLCBwdWJsaWNLZXkpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vbmVTaWduZXIoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBzaWduKCkge1xuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVOb25lVmVyaWZpZXIoKSB7XG4gIHJldHVybiBmdW5jdGlvbiB2ZXJpZnkodGhpbmcsIHNpZ25hdHVyZSkge1xuICAgIHJldHVybiBzaWduYXR1cmUgPT09ICcnO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gandhKGFsZ29yaXRobSkge1xuICB2YXIgc2lnbmVyRmFjdG9yaWVzID0ge1xuICAgIGhzOiBjcmVhdGVIbWFjU2lnbmVyLFxuICAgIHJzOiBjcmVhdGVLZXlTaWduZXIsXG4gICAgcHM6IGNyZWF0ZVBTU0tleVNpZ25lcixcbiAgICBlczogY3JlYXRlRUNEU0FTaWduZXIsXG4gICAgbm9uZTogY3JlYXRlTm9uZVNpZ25lcixcbiAgfVxuICB2YXIgdmVyaWZpZXJGYWN0b3JpZXMgPSB7XG4gICAgaHM6IGNyZWF0ZUhtYWNWZXJpZmllcixcbiAgICByczogY3JlYXRlS2V5VmVyaWZpZXIsXG4gICAgcHM6IGNyZWF0ZVBTU0tleVZlcmlmaWVyLFxuICAgIGVzOiBjcmVhdGVFQ0RTQVZlcmlmZXIsXG4gICAgbm9uZTogY3JlYXRlTm9uZVZlcmlmaWVyLFxuICB9XG4gIHZhciBtYXRjaCA9IGFsZ29yaXRobS5tYXRjaCgvXihSU3xQU3xFU3xIUykoMjU2fDM4NHw1MTIpJHxeKG5vbmUpJC9pKTtcbiAgaWYgKCFtYXRjaClcbiAgICB0aHJvdyB0eXBlRXJyb3IoTVNHX0lOVkFMSURfQUxHT1JJVEhNLCBhbGdvcml0aG0pO1xuICB2YXIgYWxnbyA9IChtYXRjaFsxXSB8fCBtYXRjaFszXSkudG9Mb3dlckNhc2UoKTtcbiAgdmFyIGJpdHMgPSBtYXRjaFsyXTtcblxuICByZXR1cm4ge1xuICAgIHNpZ246IHNpZ25lckZhY3Rvcmllc1thbGdvXShiaXRzKSxcbiAgICB2ZXJpZnk6IHZlcmlmaWVyRmFjdG9yaWVzW2FsZ29dKGJpdHMpLFxuICB9XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/jwa/index.js\n");

/***/ })

};
;